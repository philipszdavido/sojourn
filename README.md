# Sojourn

A HTML parser for Nodejs.

# Usage

Create a Nodejs project:

```
mkdir test
cd test
```

Install

```sh
npm i sojourn
yarn add sojourn
```

Import the `sojourn` package:

```js
const { sojourn } = require("sojourn")

const html = `

<!DOCTYPE html>
<html>
<head>
  <!-- This is a comment -->
  <title>Document Title</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>

`

const nodes = sojourn(html);

console.log(nodes)
```

Result:

```json
[
  {
    "name": "html",
    "attributes": [],
    "children": [
      {
        "name": "head",
        "attributes": [],
        "children": [
          {"name": "  "},
          {"name": "  "},
          {
            "name": "title",
            "attributes": [],
            "children": [
              {"name": "Document Title"}
            ]
          },
          {"name": "  "},
          {
            "name": "meta",
            "attributes": [
              {"name": "charset", "value": "UTF-8"}
            ],
            "children": []
          },
          {
            "name": "link",
            "attributes": [
              {"name": "rel" , "value": "stylesheet"},
              {"name": ""                           },
              {"name": "href", "value": "styles.css"}
            ],
            "children": []
          },
          {
            "name": "script",
            "attributes": [
              {"name": "src", "value": "script.js"},
              {"name": ""                         }
            ],
            "children": []
          }
        ]
      },
      {
        "name": "body",
        "attributes": [],
        "children": [
          {"name": "  "},
          {
            "name": "h1",
            "attributes": [],
            "children": [
              {"name": "Hello, World!"}
            ]
          }
        ]
      }
    ]
  }
]

```