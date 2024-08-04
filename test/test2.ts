import {ParseTokens} from "../src/parser/parser2";
import {Tokenizer} from "../src/tokenizer/tokenizer";

const html = `
<html>
  <head>
    Sample HTML
  </head>
</html>
`;

const html2 = `

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

const tokens = new Tokenizer(html).start();

new ParseTokens(tokens).build()
