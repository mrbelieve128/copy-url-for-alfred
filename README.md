# Copy URL for Alfred

You can copy browser's URL and title with various formats like markdown, anchor tag and your own.

![screenshot](https://github.com/fallroot/copy-url-for-alfred/raw/master/misc/screenshot.png)

## Installation

[Powerpack](https://www.alfredapp.com/powerpack/) is required.

1. Download [copyurl.alfredworkflow](https://github.com/fallroot/copy-url-for-alfred/raw/master/build/copyurl.alfredworkflow).
2. Open file by double-clicking or dragging into Alfred.
3. Open Alfred and type `url`.
4. Select URL format.

You can change everything at Alfred Preferences > Workflows menu.

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

### Add your favorite browsers

This workflow works with Google Chrome, Safari. If you want to add other browser, follow the steps below.

* Open Alfred Preferences and choose Workflows > Copy URL
* Select first script filter object
* Edit `browsers` array with *exact* browser name in order

## License

[MIT](https://github.com/fallroot/copy-url-for-alfred/blob/master/LICENSE)

## Icon

Icons made by [DinosoftLabs](https://www.flaticon.com/authors/dinosoftlabs) from [www.flaticon.com](https://www.flaticon.com/)
