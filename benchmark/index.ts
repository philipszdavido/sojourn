import {benchNoInput} from "./bench";
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

const tokenizer0 = Tokenizer.getInstance("<html></html>");
const tokenizer1 = Tokenizer.getInstance(html);
const tokenizer2 = Tokenizer.getInstance(html2);

const endTime = benchNoInput(() => {tokenizer0.start()}, 100)

console.log(endTime);

const endTime1 = benchNoInput(() => {tokenizer1.start()}, 100)
const endTime2 = benchNoInput(() => {tokenizer2.start()}, 100)

console.log(endTime1);
console.log(endTime2);
