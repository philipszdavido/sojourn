import {describe, expect, test} from '@jest/globals';
import {Tokenizer} from "../../src/tokenizer/tokenizer";

describe("Tokenizer", () => {
    test('getInstance returns a Tokenizer instance', () => {
        expect(Tokenizer.getInstance("") instanceof Tokenizer).toBe(true);
    });

    test("", () => {
        const tokenizer = Tokenizer.getInstance("<html></html>");
        const tokens = tokenizer.start();

        expect(tokens).toEqual( [{"attributes": [], "index": 0, "name": "html", "startTag": true, "type": "node"}, {"endTag": true, "index": 1, "name": "/html", "type": "node"}, {"index": 2, "name": "EOF", "type": "EOF"}])

    })

})