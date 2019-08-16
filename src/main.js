ObjC.import('stdlib')

const NIL = $()
const browsers = [
  'Google Chrome',
  'Safari'
]

class Browser {
  constructor (name, key = {}) {
    this.app = Application(name)
    this.name = name
    this.key = Object.assign({
      title: 'title',
      url: 'url'
    }, key)
  }

  hasWindow () {
    return this.app.running() && this.app.windows.length
  }

  get currentTab () {
    if (this.hasWindow()) {
      return this.app.windows.at(0)[this.key.currentTab]()
    }
  }

  get currentTabInfo () {
    const tab = this.currentTab

    if (tab) {
      return {
        selection: this.selection || '',
        title: tab[this.key.title](),
        url: tab[this.key.url]()
      }
    } else {
      return {}
    }
  }
}

class Chromium extends Browser {
  constructor (name) {
    super(name, {
      currentTab: 'activeTab'
    })
  }

  get selection () {
    this.app.includeStandardAdditions = true
    this.app.windows.at(0).activeTab().copySelection()
    delay(0.1)
    return this.app.theClipboard()
  }
}

class WebKit extends Browser {
  constructor (name) {
    super(name, {
      currentTab: 'currentTab',
      title: 'name'
    })
  }
}

function getInstance (name) {
  if (name.match(/^brave|google chrome|microsoft edge|opera|vivaldi/i)) {
    return new Chromium(name)
  } else if (name.match(/^safari/i)) {
    return new WebKit(name)
  } else {
    return {}
  }
}

class Alfred {
  static get dataPath () {
    return $.getenv('alfred_workflow_data')
  }

  static generateOutput (data, templates) {
    const regExp = /\$\{([^}]+)\}/
    let match

    const items = templates.map(template => {
      let text = template.format

      if (text.match(/^function/)) {
        text = eval(`(${text})`)(data)
      } else {
        while ((match = regExp.exec(text))) {
          text = text.replace(match[0], data[match[1]])
        }
      }

      return {
        arg: text,
        subtitle: text,
        text,
        title: template.title
      }
    })

    return JSON.stringify({
      items
    })
  }
}

class App {
  constructor () {
    this.dataPath = Alfred.dataPath
    this.configPath = `${this.dataPath}/config.json`

    if (!this.hasConfig()) {
      this.initConfig()
    }
  }

  hasConfig () {
    return $.NSFileManager.defaultManager.fileExistsAtPath(this.configPath)
  }

  initConfig () {
    const fileManager = $.NSFileManager.defaultManager
    const config = JSON.stringify([{'format': '${url}', 'title': 'URL'}, {'format': '${title}', 'title': 'Title'}, {'format': '<a href="${url}">${title}</a>', 'title': 'Anchor'}, {'format': '[${title}](${url})', 'title': 'Markdown'}])
    let error = $()

    fileManager.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(this.dataPath, true, NIL, error)
    fileManager.createFileAtPathContentsAttributes(this.configPath, config, NIL)
  }

  get data () {
    const processes = Application('System Events').processes
    const frontmost = processes.whose({ frontmost: true }).name().toString()

    if (browsers.includes(frontmost)) {
      return getInstance(frontmost).currentTabInfo
    } else {
      const browser = browsers.find(browser => processes.byName(browser).exists())

      if (browser) {
        return getInstance(browser).currentTabInfo
      }
    }
  }

  get templates () {
    return JSON.parse($.NSString.stringWithContentsOfFile(this.configPath).js) || []
  }

  run () {
    const data = this.data
    const templates = this.templates

    if (!data || !templates) {
      return
    }

    return Alfred.generateOutput(data, templates)
  }
}

function run () {
  return new App().run()
}
