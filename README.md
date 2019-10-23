# Copy URL for Alfred

You can copy browser's URL and title with various formats like markdown, anchor tag and your own.

![screenshot](https://github.com/fallroot/copy-url-for-alfred/raw/master/misc/screenshot.png)

## Installation

[Powerpack](https://www.alfredapp.com/powerpack/) is required.

1. Download [copyurl-catalina.alfredworkflow](https://github.com/fallroot/copy-url-for-alfred/raw/master/build/copyurl-catalina.alfredworkflow) on macOS Catalina. Download [copyurl.alfredworkflow](https://github.com/fallroot/copy-url-for-alfred/raw/master/build/copyurl.alfredworkflow) for others.
2. Open file by double-clicking or dragging into Alfred.
3. Open Alfred and type `url`.
4. Select URL format.

You can change everything at Alfred Preferences > Workflows menu.

### For macOS Catalina(10.15.x) Users

Some codes does not work in macOS Catalina. So you should write your favorite browser manually.

* Open Alfred Preferences and choose Workflows > Copy URL
* Select first script filter object
* Edit `myBrowsers` array with *exact* browser name in order

### Add your own template

1. Open `~/Library/Application Support/Alfred 2/Workflow Data/com.fallroot.copyurl/config.json` file.
2. Edit contents with valid [JSON](http://www.json.org/) format.

#### config.json format

`config.json` file should be array of object is consist of `format` and `type` fields.
`format` field should be string of combination `${url}`, `${title}` or JavaScript function string like below.

```json
[
    {
        "format": "${url}",
        "title": "URL"
    },
    {
        "format": "${title}",
        "title": "Title"
    },
    {
        "format": "<a href=\"${url}\">${title}</a>",
        "title": "Anchor"
    },
    {
        "format": "[${title}](${url})",
        "title": "Markdown"
    },
    {
        "format": "function({title,url}){return title.toUpperString() + '\\n' + url}",
        "title": "Custom"
    }
]
```

## Supported Browsers

⚠️ This workflow was made by using OSA(Open Scripting Architecture). You can't use this workflow in browsers which does not support OSA like [Firefox](https://www.mozilla.org/firefox/).

### Chromium

* [Brave](https://brave.com/)
* [Google Chrome](https://www.google.com/chrome/)
* [Microsoft Edge](https://www.microsoftedgeinsider.com/)
* [Vivaldi](https://vivaldi.com/)

### WebKit

* [Safari](https://www.apple.com/safari/)

## License

[MIT](https://github.com/fallroot/copy-url-for-alfred/blob/master/LICENSE)

## Icon

Icons made by [DinosoftLabs](https://www.flaticon.com/authors/dinosoftlabs) from [www.flaticon.com](https://www.flaticon.com/)
