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

const html3 = `

<div>{{2+4}}</div>
<div class="for">@for(i of [7,9, 10]){<span>For Child <b>{{i}}</b></span> @for(ii of [2,3,4]){<strong>Strong</strong>} } <section>A section</section></div>
<button>@for(y of [100,200]){@if(y < 100){<i>{{y}}</i>}}</button>
<div> @if (x > 5) { <h1>My First Heading</h1> }</div>
      @for (fruit of ['mango', 'orange']) {
        <i> {{ fruit }}</i>
      }


`

const tokens = new Tokenizer(`
@for(fruit of ['mango', 'orange']) {
        <i> {{ fruit }}</i>
      }
`).start();

console.log(tokens);