import {sojourn} from "../src/sojourn/sojourn";

const testTokens = [
    {
        index: 0,
        name: 'html',
        attributes: [],
        startTag: true,
        type: 'node'
    },
    {
        index: 1,
        name: 'head',
        attributes: [],
        startTag: true,
        type: 'node'
    },
    { index: 2, name: '  ', type: 'text' },
    { index: 3, name: '  ', type: 'text' },
    {
        index: 4,
        name: 'title',
        attributes: [],
        startTag: true,
        type: 'node'
    },
    { index: 5, name: 'Document Title', type: 'text' },
    { index: 6, name: '/title', endTag: true, type: 'node' },
    { index: 7, name: '  ', type: 'text' },
    {
        index: 8,
        name: 'meta',
        attributes: [ [Object] ],
        startTag: true,
        type: 'node'
    },
    {
        index: 8,
        name: '/meta',
        endTag: true,
        type: 'node'
    },
    { index: 9, name: '  ', type: 'text' },
    {
        index: 10,
        name: 'link',
        attributes: [ [Object], [Object] ],
        startTag: true,
        type: 'node'
    },
    {
        index: 10,
        name: '/link',
        endTag: true,
        type: 'node'
    },
    { index: 11, name: '  ', type: 'text' },
    {
        index: 12,
        name: 'script',
        attributes: [ [Object], [Object] ],
        startTag: true,
        type: 'node'
    },
    { index: 13, name: '/script', endTag: true, type: 'node' },
    { index: 14, name: '/head', endTag: true, type: 'node' },
    {
        index: 15,
        name: 'body',
        attributes: [],
        startTag: true,
        type: 'node'
    },
    { index: 16, name: '  ', type: 'text' },
    {
        index: 17,
        name: 'h1',
        attributes: [],
        startTag: true,
        type: 'node'
    },
    { index: 18, name: 'Hello, World!', type: 'text' },
    { index: 19, name: '/h1', endTag: true, type: 'node' },
    { index: 20, name: '/body', endTag: true, type: 'node' },
    { index: 21, name: '/html', endTag: true, type: 'node' }
]

const testTokens1 = [
    {
        index: 0,
        name: 'html',
        attributes: [],
        startTag: true,
        type: 'node'
    },
    {
        index: 1,
        name: 'head',
        attributes: [],
        startTag: true,
        type: 'node'
    },
    { index: 2, name: '  ', type: 'text' },
    { index: 3, name: '  ', type: 'text' },
    {
        index: 4,
        name: 'title',
        attributes: [],
        startTag: true,
        type: 'node'
    },
    { index: 5, name: 'Document Title', type: 'text' },
    { index: 6, name: '/title', endTag: true, type: 'node' },
    { index: 7, name: '  ', type: 'text' },
    {
        index: 8,
        name: 'meta',
        attributes: [ [Object] ],
        startTag: true,
        type: 'node'
    },
    { index: 9, name: '  ', type: 'text' },
    {
        index: 10,
        name: 'link',
        attributes: [ [Object], [Object] ],
        startTag: true,
        type: 'node'
    },
    { index: 11, name: '  ', type: 'text' },
    {
        index: 12,
        name: 'script',
        attributes: [ [Object], [Object] ],
        startTag: true,
        type: 'node'
    },
    { index: 13, name: '/script', endTag: true, type: 'node' },
    { index: 14, name: '/head', endTag: true, type: 'node' },
    { index: 15, name: '/html', type: 'node' },
]

const tokens = sojourn(null, testTokens1/*[
    { index: 2, name: '  ', type: 'text' },
    { index: 3, name: '  ', type: 'text' },
    {
        index: 4,
        name: 'title',
        attributes: [],
        startTag: true,
        type: 'node'
    },
    { index: 5, name: 'Document Title', type: 'text' },
    { index: 6, name: '/title', endTag: true, type: 'node' },
    { index: 7, name: '  ', type: 'text' },
    {
        index: 8,
        name: 'meta',
        attributes: [ [Object] ],
        startTag: true,
        type: 'node'
    },
    { index: 9, name: '  ', type: 'text' },
    {
        index: 10,
        name: 'link',
        attributes: [ [Object], [Object] ],
        startTag: true,
        type: 'node'
    },
    { index: 11, name: '  ', type: 'text' },
    {
        index: 12,
        name: 'script',
        attributes: [ [Object], [Object] ],
        startTag: true,
        type: 'node'
    },
    { index: 13, name: '/script', endTag: true, type: 'node' },
]*/)
//console.log(node)

console.log(JSON.stringify(tokens))


// const children = findTokenClosingTag(testTokens[0], 0, testTokens)
// console.log(children)

// console.log(removeElementsToFrom(1, 4, [1,2,3,4,5,6,7,8,9,10]))
