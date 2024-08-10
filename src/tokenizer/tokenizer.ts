import {Token} from "../types/types";
import {AttributeParser} from "../attr-parser/attribute-parser";
import {syntaxes} from "../utils/constants";

export class Tokenizer {

    private tokens: Token[] = [];

    constructor(private html: string) {}

    public static getInstance(html: string): Tokenizer {
        return new Tokenizer(html)
    }

    public start() {

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

        // const tokens: Array<Token> = [];

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

            if(char === "@" && openTag === false) {

                const returnIndex = this.checkTemplateSyntaxes(index);

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

        // console.log(mappedTokens)

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

    private checkTemplateSyntaxes(currentIndex: number) {

        let text = "";
        const stops = ["(", "{"];
        let isViableSyntax = false;

        let token!: Token;

        let returnIndex

        for (let index = currentIndex; index < this.html.length; index++) {

            const char = this.html[index];
            const nextChar = this.html[index + 1];

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
                            if(token) {
                                // @ts-ignore
                                token.attributes.push({
                                    name: "let-attr",
                                    value: condition,
                                })
                            }
                            index = j + 1;
                            break;
                        }

                    }

                } else if(char === "{") {

                    // get till we reach }

                    let closeBracket = 0

                    for(let j = index; j < this.html.length; j++) {

                        const closeBracketChar = this.html[j];
                        const nextCloseBracketChar = this.html[j + 1];

                        if(closeBracketChar === "{") {
                            closeBracket++
                        }

                        if(closeBracketChar === "}") {
                            closeBracket--;
                        }

                        if(closeBracketChar === "}" && closeBracket === 0) {

                            const splicedHtml = this.html.split("")
                            splicedHtml.splice(index, 1);

                            this.html = splicedHtml.join("");

                            const _tokens = Tokenizer.getInstance(this.html).start()
                            this. tokens.push(..._tokens);
                            this.tokens.push({
                                name: "/" + token.name,
                                endTag: true,
                                type: "node"
                            })
                            index = j + 1;
                            returnIndex = index;
                            break;
                        }

                    }

                }

            }

            text += char;

            if(stops.includes(nextChar) && syntaxes.includes(text)){

                isViableSyntax = true;

                token = {
                    type: "node",
                    name: text,
                    startTag: true,
                    attributes: [],
                };

                text = "";

                // index++;

            } else {
                break;
            }

        }

        return returnIndex;

    }

}

