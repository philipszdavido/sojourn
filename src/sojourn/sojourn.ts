import {ElementNode, NodeType, TextNode, Token} from "../types/types";

export function sojourn(tokens: Token[]) {

    const rootNodes = [];

    for (let i = 0; i < tokens.length; i++) {

        const token = tokens[i];
        const tokenName = token.name;
        const tokenType = token.type;

        // if its a node .
        // find its closing tag
        if(tokenType === "node" && !tokenName?.startsWith("/")) {

            const elementNode = new ElementNode(tokenName, token?.attributes, [])

            const {
                children,
                closingTagIndex
            } = findTokenClosingTag(token, i, tokens)

            tokens = removeElementsToFrom(i + 1, closingTagIndex as number, tokens);
            elementNode.children = sojourn(children);
            rootNodes.push(elementNode);

        }

        if(tokenType === "text") {
            // convert to Text Node
            rootNodes.push(new TextNode(tokenName));
        }

    }

    return rootNodes

}

export function findTokenClosingTag(token: Token, currentTokenIndex: number, tokens: Token[]) {

    const selfClosingLinks = ["meta", "link", "input", "br"];

    const tokenName = token?.name;
    const children = []
    let closingTagIndex;
    let startPushingChildren = false;

    if(selfClosingLinks?.includes(token.name)) {
        return  {
            closingTagIndex: currentTokenIndex + 1,
            children: []
        }
    }

    for (let i = 0; i < tokens.length; i++) {

        const currentToken = tokens[i]

        if(i === currentTokenIndex) {

            if(currentToken?.name === token?.name) {
                startPushingChildren = true;
            }

            continue

        }

        if(currentToken.name === "/" + tokenName) {

            closingTagIndex = i
            startPushingChildren = false;

            break;

        } else {

            if(startPushingChildren) {
                children.push(currentToken)
            }

        }

    }

    if(!closingTagIndex && !children.length) {
        // no closing tag found.
        console.log("no closing tag found.", tokenName)
    }

    return {
        closingTagIndex,
        children
    }

}

function removeElementsToFrom(start: number, end: number, array: Array<any>) {
    const newArray = [];

    for (let i = 0; i < array.length; i++) {
        const el = array[i]

        if(i === end || i === start || (i > start && i < end)) {
            continue
        }

        newArray.push(el)
    }

    return newArray
}
