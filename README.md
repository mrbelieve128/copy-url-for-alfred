# Copy Safari URL for Alfred

You can copy safari's URL and title with various formats like markdown, anchor tag and your own.

![screenshot](https://github.com/mrbelieve128/copy-/mrbelieve128/url-for-alfred/raw/master/misc/screenshot.png)

## Installation

[Powerpack](https://www.alfredapp.com/powerpack/) is required.

1. Download [copyurl-catalina.alfredworkflow](https://github.com/mrbelieve128/copy-url-for-alfred/raw/master/build/copy-/mrbelieve128/url.alfredworkflow) on macOS Catalina or Big Sur. 
2. Open file by double-clicking or dragging into Alfred.
3. Go to Alfred Setting -> Features -> Default Results -> Fallbacks -> "Setup fallback result" and remove all the fallback.
4. Open Alfred and type `url`, if not appear, go back to Step 3 to check the fallback setting.
5. Select URL format.

You can change everything at Alfred Preferences > Workflows menu.


### Add your own template

1. Open `~/Library/Application Support/Alfred/Workflow Data/com.fallroot.copyurl/config.json` file.
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

2021/7/24: 
- Chrome 92.0.4515.107
- Safari

The Edge 92.0.902.55 and Firefox 90.0.1 didn't work

## License

[MIT](https://github.com/mrbelieve128/copy-url-for-alfred/blob/master/LICENSE)

## Icon

Icons made by [DinosoftLabs](https://www.flaticon.com/authors/dinosoftlabs) from [www.flaticon.com](https://www.flaticon.com/)
