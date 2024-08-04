import {sojourn as sojourner} from './sojourn/sojourn';
import {Tokenizer} from "./tokenizer/tokenizer";


export const sojourn = (html: string) => {

    const tokens = new Tokenizer(html).start();

    const nodes = sojourner(tokens)

    return nodes

}