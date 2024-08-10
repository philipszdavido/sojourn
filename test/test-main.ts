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
  <h1>Hello, <br /> World!</h1>
  <h1>Hello, <br /> World!</h1>
</body>
</html>

`

const toughHTML = `
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
  <h1>Hello, <br /> World!</h1>
  <h1>Hello, <br /> World!</h1>
</body>
</html>

`

// const tokens = new Tokenizer(html).start();
//
// console.log(tokens);
//
// const nodes = new Sojourn(tokens).start()

const nodes = sojourn(`
<div *[ngIf]="nodes.length < 0">
</div>
<div *[ngFor]="nodes.length > 0">
</div>
`)

console.log(JSON.stringify(nodes));