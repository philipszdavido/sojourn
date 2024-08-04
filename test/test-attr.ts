import {AttributeParser} from "../src/attr-parser/attribute-parser";

const p = `
  <link rel="stylesheet" href="styles.css">
  <script src="script.js" defer></script>

`

const attrP = new AttributeParser(`
id = "realboxContainer "
single-colored
style="--ntp-logo-box-color: rgba(31, 31, 31, 1.00);"
`)

const result = attrP.start()

console.log(result)