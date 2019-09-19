ObjC.import('CoreGraphics')
ObjC.import('stdlib')

const NIL = $()

class Browser {
  constructor (name, key = {}) {
    this.app = Application(name)
    this.key = Object.assign({
      title: 'title',
      url: 'url'
    }, key)
  }

  static isChromium (name) {
    return name.match(/^(?:Brave|Google Chrome|Microsoft Edge|Opera|Vivaldi)\b/)
  }

  static isWebKit (name) {
    return name.match(/^(?:Safari)\b/)
  }

  static getInstanceWithNames (names) {
    for (const name of names) {
      if (this.isChromium(name)) {
        return new Chromium(name)
      } else if (this.isWebKit(name)) {
        return new WebKit(name)
      }
    }
    return {}
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
    const options = $.kCGWindowListOptionOnScreenOnly | $.kCGWindowListExcludeDesktopElements
    const windows = ObjC.deepUnwrap($.CGWindowListCopyWindowInfo(options, $.kCGNullWindowID))
    const names = Array.from(new Set(windows.map(window => window.kCGWindowOwnerName)))

    return Browser.getInstanceWithNames(names).currentTabInfo
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
