import {Tokenizer} from "../src/tokenizer/tokenizer";
import {Sojourn} from "../src/sojourn/sojourn";
import {sojourn} from "../src";

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
  <h1>Hello, <br /> World!</h1>
</body>
</html>

`

// const tokens = new Tokenizer(html).start();
//
// console.log(tokens);
//
// const nodes = new Sojourn(tokens).start()

const nodes = sojourn(html)

console.log(JSON.stringify(nodes));