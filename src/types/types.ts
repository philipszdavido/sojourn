
export class ElementNode {

    constructor(
        public name: string,
        public attributes: Array<Attribute> | undefined,
        public children: NodeType[]) {
    }

}

export type Attribute = {
    name?: string;
    value?: string;
}

export class TextNode {
    constructor(public name: string) {}
}

export type NodeContainer = ElementNode;

export type NodeType = ElementNode | TextNode;


export type Token = {
    name: string;
    attributes?: Array<{
        name?: string;
        value?: string | undefined;
    }>;
    startTag?: boolean;
    endTag?: boolean;
    type: "node" | "text" | "EOF";
    index?: number;
}