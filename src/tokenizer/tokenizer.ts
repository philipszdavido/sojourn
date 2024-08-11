import {Token} from "../types/types";
import {AttributeParser} from "../attr-parser/attribute-parser";
import {syntaxes} from "../utils/constants";

type OptionsType = {
    parseControlSyntax: boolean,
    parseExpression: boolean,
}

const defaultOptions: OptionsType = {
    parseControlSyntax: true,
    parseExpression: false,
}

export class Tokenizer {

    private tokens: Token[] = [];

    constructor(private html: string, private options: OptionsType = defaultOptions) {}

    public static getInstance(html: string, options?: OptionsType): Tokenizer {
        return new Tokenizer(html, options = defaultOptions)
    }

    public start(root?: boolean) {

        const { parseControlSyntax, parseExpression } = this.options

        this.html = this.html.split("").filter(char => {
            if (char === "\n") {
                return false
            }

            return true;
        }).join("")

        let openTag = false;
        let comment = false;
        let DOCTYPE = false;

        let elementName = "";

        for (let index = 0; index < this.html.length; index++) {

            const char = this.html[index];
            const nextChar = this.html[index + 1];

            if(char === "<" && openTag === false) {

                // check for comment
                if(nextChar === "!") {
                    if(this.html[index + 2] === "-") {

                        comment = true;
                        continue;

                    } else if(this.html[index + 2] === "D") {
                        // we have "DOCTYPE"
                        DOCTYPE = true;
                        continue;
                    }

                }

                openTag = true;
                continue;
            }

            if(char === "@" && parseControlSyntax) {

                const returnIndex = this.parseControlTemplateSyntax(index);

                if(returnIndex) {
                    index = returnIndex;
                }

            }

            if(comment) {
                if(char === "-" && nextChar === ">") {
                    comment = false;
                    continue;
                }
                continue
            }

            if(DOCTYPE) {
                if(char === ">") {
                    DOCTYPE = false;
                    continue;
                }
                continue
            }

            if(openTag) {

                elementName += char

                // make sure that the ">"
                if(nextChar === ">" && !this.isInsideAttributeValue(elementName)) {

                    if(elementName.startsWith("/")) {

                        this.tokens.push({
                            name: elementName,
                            endTag: true,
                            type: "node"
                        })
    
                    } else {

                        // gather attributes
                        const elementNameParts = elementName.split(" ")

                        // first is the element name
                        const name = elementNameParts[0];

                        const elementAttributes = this.processAttributes(elementNameParts.slice(1))

                        this.tokens.push({
                            name,
                            attributes: elementAttributes,
                            startTag: true,
                            type: "node"
                        });
    
                    }

                    elementName = ""

                    openTag = false;
                    continue;

                }

            }
            else if(!comment || !DOCTYPE) {

                if(char === ">") {
                    continue;
                }

                let textName = ""

                for (let j = index; j < this.html.length; j++) {

                    const textChar = this.html[j];
                    textName += textChar;

                    if(textChar === "@" && parseControlSyntax) {

                        const returnIndex = this.parseControlTemplateSyntax(j);

                        if(returnIndex) {
                            j = returnIndex;
                            index = j;
                        }

                    }

                    if(this.html[j + 1] === "<") {

                        this.tokens.push({
                            name: textName,
                            type: "text"
                        })
                        textName = ""

                        index = j;
                        break;

                    }
                    
                }

            }
            
        }

        if(!root) {
            return this.tokens
        }

        this.tokens.push({
            name: "EOF",
            type: "EOF",
        })

        const mappedTokens = this.tokens.map((token, index) => {
            return {
                index,
                ...token
            }
        });

        return mappedTokens

    }

    private isInsideAttributeValue(elementName: string) {
        // check we have " or ' left
        // and we have = after " or '

        let insideAttribute = false;

        const reversedElementName = elementName
            .split("=")
            .map( part => part.trim())
            .join("=")
            .split("").reverse().join("");

        let sawAttributeValueOpen = false

        for(let i = 0; i < reversedElementName.length; i++) {
            const char = reversedElementName[i];
            const nextChar = reversedElementName[i + 1];

            if(char === '"' && nextChar !== "=") {
                sawAttributeValueOpen = true
                continue
            }

            if(!sawAttributeValueOpen && char === '"' && nextChar === "=") {
                insideAttribute = true;
                break;
            }
        }

        return insideAttribute;

    }

    private processAttributes(attributes: string[]) {

        const attributesString = attributes.join(" ")

        const attributeParser = new AttributeParser(attributesString)
        return attributeParser.start()
        
    }

    private parseControlTemplateSyntax(currentIndex: number) {

        let text = "";
        const paranthesisBracketOpen = ["(", "{"];
        let isViableSyntax = false;

        let exit = false;

        let token!: Token;

        let returnIndex

        for (let index = currentIndex; index < this.html.length; index++) {

            const char = this.html[index];
            const nextChar = this.html[index + 1];

            if(exit) {
                break;
            }

            if(index === currentIndex) {
                continue;
            }

            if(isViableSyntax) {

                if(char === "(") {

                    // get till we reach )
                    let condition = ""
                    for(let j = index; j < this.html.length; j++) {

                        const charCondition = this.html[j];
                        const nextCharCondition = this.html[j + 1];

                        if(j === index) {
                            continue;
                        }

                        condition += charCondition;

                        if(nextCharCondition === ")") {

                            if(token && token.attributes) {

                                token.attributes.push({
                                    name: "let-attr",
                                    value: condition,
                                });

                                this.tokens.push(token)

                            }

                            index = j;
                            break;

                        }

                    }

                }

                else if(char === "{") {

                    // get till we reach }

                    let closeBracket = 0;
                    const startIndex = index + 1;
                    let endIndex;

                    for(let j = index; j < this.html.length; j++) {

                        const closeBracketChar = this.html[j];

                        if(closeBracketChar === "{") {
                            closeBracket++
                        }

                        if(closeBracketChar === "}") {
                            closeBracket--;
                        }

                        if(closeBracketChar === "}" && closeBracket === 0) {

                            endIndex = j;

                            const html = this.html.slice(startIndex, endIndex);

                            const childTokens = Tokenizer.getInstance(html, this.options).start()

                            this. tokens.push(...childTokens);

                            this.tokens.push({
                                name: "/" + token.name?.trim(),
                                endTag: true,
                                type: "node"
                            })

                            index = j + 1;
                            returnIndex = index;

                            isViableSyntax = false;
                            exit = true;

                            break;

                        }

                    }

                }

                continue;

            }

            text += char;

            if(paranthesisBracketOpen.includes(nextChar)){

                if(syntaxes.includes(text.trim())) {

                    isViableSyntax = true;

                    token = {
                        type: "node",
                        name: text?.trim(),
                        startTag: true,
                        attributes: [],
                    };

                    text = "";

                }

            }

        }

        return returnIndex;

    }

}

