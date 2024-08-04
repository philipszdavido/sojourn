import {sojourn} from './sojourn/sojourn';
import {Tokenizer} from "./tokenizer/tokenizer";


export const main = (html: string) => {

    const tokens = new Tokenizer(html).start();

    const nodes = sojourn(tokens)

    return nodes

}