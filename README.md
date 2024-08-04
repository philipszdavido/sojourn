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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test HTML</title>
    <style>
        /* CSS with intentional errors and conflicts */
        .a { color: red; }
        .b { color: blue; }
        .a .b { color: green; }
        .c { font-size: 16px; }
        .d { font-size: 20px; font-size: 12px; }
    </style>
    <script>
        // JavaScript with intentional syntax errors
        function test() {
            var x = 10
            if (x > 5 {
                console.log("x is greater than 5")
            }
        }
    </script>
</head>
<body>
    <div id="main">
        <h1>Welcome to the test!</h1>
        <p class="a">
            This is a <span class="b">nested span</span> with <b>bold text</b>
            <div class="a" id="test">Nested <a href="#">link</a> and <b>bold</b>
            <p class="d">Another paragraph with conflicting font size</p></div>
            <!-- Comment with <unclosed tags -->
            <p>Paragraph with <span class="c">span inside</p>
            <!-- Comment ends here -->
            <div class="unclosed
            <p>Another unclosed paragraph
        </div>
        <footer>
            <p>Footer with <a href="http://example.com">link</a></p>
        </footer>
    </div>
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
    "attributes": [
      {
        "name": "lang",
        "value": "en"
      }
    ],
    "children": [
      {
        "name": "head",
        "attributes": [],
        "children": [
          {
            "name": "    ",
            "type": "text"
          },
          {
            "name": "meta",
            "attributes": [
              {
                "name": "charset",
                "value": "UTF-8"
              }
            ],
            "children": [],
            "type": "element"
          },
          {
            "name": "    ",
            "type": "text"
          },
          {
            "name": "meta",
            "attributes": [
              {
                "name": "name",
                "value": "viewport"
              },
              {
                "name": ""
              },
              {
                "name": "content",
                "value": "width=device-width, initial-scale=1.0"
              }
            ],
            "children": [],
            "type": "element"
          },
          {
            "name": "    ",
            "type": "text"
          },
          {
            "name": "title",
            "attributes": [],
            "children": [
              {
                "name": "Test HTML",
                "type": "text"
              }
            ],
            "type": "element"
          },
          {
            "name": "    ",
            "type": "text"
          },
          {
            "name": "style",
            "attributes": [],
            "children": [
              {
                "name": "        /* CSS with intentional errors and conflicts */        .a { color: red; }        .b { color: blue; }        .a .b { color: green; }        .c { font-size: 16px; }        .d { font-size: 20px; font-size: 12px; }    ",
                "type": "text"
              }
            ],
            "type": "element"
          },
          {
            "name": "    ",
            "type": "text"
          },
          {
            "name": "script",
            "attributes": [],
            "children": [
              {
                "name": "        // JavaScript with intentional syntax errors        function test() {            var x = 10            if (x > 5 {                console.log(\"x is greater than 5\")            }        }    ",
                "type": "text"
              }
            ],
            "type": "element"
          }
        ],
        "type": "element"
      },
      {
        "name": "body",
        "attributes": [],
        "children": [
          {
            "name": "    ",
            "type": "text"
          },
          {
            "name": "div",
            "attributes": [
              {
                "name": "id",
                "value": "main"
              }
            ],
            "children": [
              {
                "name": "        ",
                "type": "text"
              },
              {
                "name": "h1",
                "attributes": [],
                "children": [
                  {
                    "name": "Welcome to the test!",
                    "type": "text"
                  }
                ],
                "type": "element"
              },
              {
                "name": "        ",
                "type": "text"
              },
              {
                "name": "p",
                "attributes": [
                  {
                    "name": "class",
                    "value": "a"
                  }
                ],
                "children": [
                  {
                    "name": "            This is a ",
                    "type": "text"
                  },
                  {
                    "name": "span",
                    "attributes": [
                      {
                        "name": "class",
                        "value": "b"
                      }
                    ],
                    "children": [
                      {
                        "name": "nested span",
                        "type": "text"
                      }
                    ],
                    "type": "element"
                  },
                  {
                    "name": " with ",
                    "type": "text"
                  },
                  {
                    "name": "b",
                    "attributes": [],
                    "children": [
                      {
                        "name": "bold text",
                        "type": "text"
                      }
                    ],
                    "type": "element"
                  },
                  {
                    "name": "            ",
                    "type": "text"
                  },
                  {
                    "name": "div",
                    "attributes": [
                      {
                        "name": "class",
                        "value": "a"
                      },
                      {
                        "name": ""
                      },
                      {
                        "name": "id",
                        "value": "test"
                      }
                    ],
                    "children": [
                      {
                        "name": "Nested ",
                        "type": "text"
                      },
                      {
                        "name": "a",
                        "attributes": [
                          {
                            "name": "href",
                            "value": "#"
                          }
                        ],
                        "children": [
                          {
                            "name": "link",
                            "type": "text"
                          }
                        ],
                        "type": "element"
                      },
                      {
                        "name": " and ",
                        "type": "text"
                      },
                      {
                        "name": "b",
                        "attributes": [],
                        "children": [
                          {
                            "name": "bold",
                            "type": "text"
                          }
                        ],
                        "type": "element"
                      },
                      {
                        "name": "            ",
                        "type": "text"
                      },
                      {
                        "name": "p",
                        "attributes": [
                          {
                            "name": "class",
                            "value": "d"
                          }
                        ],
                        "children": [
                          {
                            "name": "Another paragraph with conflicting font size",
                            "type": "text"
                          }
                        ],
                        "type": "element"
                      }
                    ],
                    "type": "element"
                  },
                  {
                    "name": "a",
                    "attributes": [
                      {
                        "name": "href",
                        "value": "#"
                      }
                    ],
                    "children": [
                      {
                        "name": "link",
                        "type": "text"
                      }
                    ],
                    "type": "element"
                  },
                  {
                    "name": " and ",
                    "type": "text"
                  },
                  {
                    "name": "b",
                    "attributes": [],
                    "children": [
                      {
                        "name": "bold",
                        "type": "text"
                      }
                    ],
                    "type": "element"
                  },
                  {
                    "name": "            ",
                    "type": "text"
                  },
                  {
                    "name": "p",
                    "attributes": [
                      {
                        "name": "class",
                        "value": "d"
                      }
                    ],
                    "children": [
                      {
                        "name": "Another paragraph with conflicting font size",
                        "type": "text"
                      }
                    ],
                    "type": "element"
                  }
                ],
                "type": "element"
              }
            ],
            "type": "element"
          },
          {
            "name": "            ",
            "type": "text"
          },
          {
            "name": ">",
            "attributes": [
              {
                "name": ""
              }
            ],
            "children": [
              {
                "name": "Paragraph with ",
                "type": "text"
              },
              {
                "name": "span",
                "attributes": [
                  {
                    "name": "class",
                    "value": "c"
                  }
                ],
                "children": [
                  {
                    "name": "span inside",
                    "type": "text"
                  },
                  {
                    "name": "            ",
                    "type": "text"
                  },
                  {
                    "name": "            ",
                    "type": "text"
                  },
                  {
                    "name": "div",
                    "attributes": [
                      {
                        "name": "class",
                        "value": "unclosed            p"
                      }
                    ],
                    "children": [
                      {
                        "name": "Another unclosed paragraph        ",
                        "type": "text"
                      }
                    ],
                    "type": "element"
                  },
                  {
                    "name": "        ",
                    "type": "text"
                  },
                  {
                    "name": "footer",
                    "attributes": [],
                    "children": [
                      {
                        "name": "            ",
                        "type": "text"
                      },
                      {
                        "name": "p",
                        "attributes": [],
                        "children": [
                          {
                            "name": "Footer with ",
                            "type": "text"
                          },
                          {
                            "name": "a",
                            "attributes": [
                              {
                                "name": "href",
                                "value": "http://example.com"
                              }
                            ],
                            "children": [
                              {
                                "name": "link",
                                "type": "text"
                              }
                            ],
                            "type": "element"
                          }
                        ],
                        "type": "element"
                      },
                      {
                        "name": "        ",
                        "type": "text"
                      }
                    ],
                    "type": "element"
                  },
                  {
                    "name": "    ",
                    "type": "text"
                  }
                ],
                "type": "element"
              },
              {
                "name": "            ",
                "type": "text"
              },
              {
                "name": "            ",
                "type": "text"
              },
              {
                "name": "div",
                "attributes": [
                  {
                    "name": "class",
                    "value": "unclosed            p"
                  }
                ],
                "children": [
                  {
                    "name": "Another unclosed paragraph        ",
                    "type": "text"
                  }
                ],
                "type": "element"
              },
              {
                "name": "        ",
                "type": "text"
              },
              {
                "name": "footer",
                "attributes": [],
                "children": [
                  {
                    "name": "            ",
                    "type": "text"
                  },
                  {
                    "name": "p",
                    "attributes": [],
                    "children": [
                      {
                        "name": "Footer with ",
                        "type": "text"
                      },
                      {
                        "name": "a",
                        "attributes": [
                          {
                            "name": "href",
                            "value": "http://example.com"
                          }
                        ],
                        "children": [
                          {
                            "name": "link",
                            "type": "text"
                          }
                        ],
                        "type": "element"
                      }
                    ],
                    "type": "element"
                  },
                  {
                    "name": "        ",
                    "type": "text"
                  }
                ],
                "type": "element"
              },
              {
                "name": "    ",
                "type": "text"
              }
            ],
            "type": "element"
          },
          {
            "name": "span",
            "attributes": [
              {
                "name": "class",
                "value": "c"
              }
            ],
            "children": [
              {
                "name": "span inside",
                "type": "text"
              },
              {
                "name": "            ",
                "type": "text"
              },
              {
                "name": "            ",
                "type": "text"
              },
              {
                "name": "div",
                "attributes": [
                  {
                    "name": "class",
                    "value": "unclosed            p"
                  }
                ],
                "children": [
                  {
                    "name": "Another unclosed paragraph        ",
                    "type": "text"
                  }
                ],
                "type": "element"
              },
              {
                "name": "        ",
                "type": "text"
              },
              {
                "name": "footer",
                "attributes": [],
                "children": [
                  {
                    "name": "            ",
                    "type": "text"
                  },
                  {
                    "name": "p",
                    "attributes": [],
                    "children": [
                      {
                        "name": "Footer with ",
                        "type": "text"
                      },
                      {
                        "name": "a",
                        "attributes": [
                          {
                            "name": "href",
                            "value": "http://example.com"
                          }
                        ],
                        "children": [
                          {
                            "name": "link",
                            "type": "text"
                          }
                        ],
                        "type": "element"
                      }
                    ],
                    "type": "element"
                  },
                  {
                    "name": "        ",
                    "type": "text"
                  }
                ],
                "type": "element"
              },
              {
                "name": "    ",
                "type": "text"
              }
            ],
            "type": "element"
          },
          {
            "name": "            ",
            "type": "text"
          },
          {
            "name": "            ",
            "type": "text"
          },
          {
            "name": "div",
            "attributes": [
              {
                "name": "class",
                "value": "unclosed            p"
              }
            ],
            "children": [
              {
                "name": "Another unclosed paragraph        ",
                "type": "text"
              }
            ],
            "type": "element"
          },
          {
            "name": "        ",
            "type": "text"
          },
          {
            "name": "footer",
            "attributes": [],
            "children": [
              {
                "name": "            ",
                "type": "text"
              },
              {
                "name": "p",
                "attributes": [],
                "children": [
                  {
                    "name": "Footer with ",
                    "type": "text"
                  },
                  {
                    "name": "a",
                    "attributes": [
                      {
                        "name": "href",
                        "value": "http://example.com"
                      }
                    ],
                    "children": [
                      {
                        "name": "link",
                        "type": "text"
                      }
                    ],
                    "type": "element"
                  }
                ],
                "type": "element"
              },
              {
                "name": "        ",
                "type": "text"
              }
            ],
            "type": "element"
          },
          {
            "name": "    ",
            "type": "text"
          }
        ],
        "type": "element"
      }
    ],
    "type": "element"
  }
]
```