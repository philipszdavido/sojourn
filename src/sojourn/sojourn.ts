// @ts-ignore
export function sojourn(parent, tokens) {

    const rootNodes = {}
    let currentNode = parent

    for (let i = 0; i < tokens.length; i++) {

        const token = tokens[i]

        // if its a node .
        // find its closing tag
        if(token?.type === "node" && !token?.name?.startsWith("/")) {

            currentNode = token

            const {
                children,
                closingTagIndex
            } = findTokenClosingTag(token, i, tokens)

            tokens = removeElementsToFrom(i + 1, closingTagIndex as number, tokens);
            token.children = sojourn(currentNode, children);

        }

    }

    return tokens

}

// @ts-ignore
export function findTokenClosingTag(token, currentTokenIndex, tokens) {

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

    // console.log((token), currentTokenIndex, children);
    // console.log("=============================")

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
