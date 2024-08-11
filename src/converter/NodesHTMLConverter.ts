import {Attribute, ElementNode, NodeType} from "../types/types";


export class NodesHTMLConverter {

    constructor(public nodes: NodeType[]) {

    }


    public start() {

        let html = ''

        for (let node of this.nodes) {

            const nodeType = node.type;

            if (nodeType === "text") {
                html += node.name;
            }

            if (nodeType === "element") {

                html += '<'
                html += node.name;

                const attrs = (node as ElementNode).attributes;

                if(attrs) {

                    for (let j = 0; j < attrs.length; j++) {
                        const attr = attrs[j];

                        html += ` ${attr.name}`;

                        if(attr.value) {
                            html += `="${attr.value}"`;
                        }

                    }

                }

                html += '>'

                const children = (node as ElementNode).children;

                if(children) {

                    const childHTML = new NodesHTMLConverter(children).start();
                    html += childHTML;

                }

                html += '</' + node.name + '>'

            }

        }

        return html;
    }
}