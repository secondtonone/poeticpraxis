import MarkupTypes from "@typings/MarkupTypes";
import { IStrings, IElements, Tags } from "./structure";
import { TextAnalyzerResult } from "./textAnalyzer";

interface TagMakerResult {
    elements: IElements
    strings: IStrings
    tags: Tags[]
}

export default function tagMaker(node: HTMLCollection, textAnalyzed: TextAnalyzerResult, cb: (value: TagMakerResult | PromiseLike<TagMakerResult>) => void) {
    const stringNodes = [...node];

    let tags: Tags[] = [];

    let symbols: Element[] = [];

    const strings = Object.assign({}, textAnalyzed.strings);

    const elements = Object.assign({}, textAnalyzed.elements);

    let symbolsSet: Element[][] = [];

    const stringNodesLength = stringNodes.length;

    for (let i = 0; i < stringNodesLength; i++) {
        const string = stringNodes[i] as HTMLDivElement;

        const symbols = [...string.children];

        strings[string.id].tag = {
            left: string.offsetLeft,
            top: string.offsetTop,
            height: string.offsetHeight,
            width: string.offsetWidth
        };

        symbolsSet.push(symbols);
    }

    const symbolsSetLength = symbolsSet.length;

    for (let i = 0; i < symbolsSetLength; i++) {
        const set = symbolsSet[i];

        symbols = [...symbols, ...set];
    }

    const symbolsLength = symbols.length;

    if (symbolsLength) {
        for (let i = 0; i < symbolsLength; i++) {
            const symbol = symbols[i] as HTMLSpanElement;

            const type = symbol.dataset.type as MarkupTypes;
            if (
                type === 'black' ||
                type === 'red' ||
                type === 'red_secondary' ||
                type === 'gray' ||
                type === 'string-pause'
            ) {
                const parent = symbol.parentNode as HTMLDivElement;
                const offsetLeft = parent.offsetLeft;
                const offsetTop = parent.offsetTop;

                (elements[symbol.id] as Tags).tag = {
                    left: symbol.offsetLeft + offsetLeft,
                    top: symbol.offsetTop + offsetTop,
                    height: symbol.offsetHeight,
                    width: symbol.offsetWidth
                };

                tags.push(elements[symbol.id] as Tags);
            }
        }
    }

    if (cb) {
        cb({
            elements,
            strings,
            tags,
        });
    }
}


export function tagMakerPromise(node: HTMLCollection, textAnalyzedResult: TextAnalyzerResult) {
    return new Promise<TagMakerResult>((resolve) => {
        tagMaker(node, textAnalyzedResult, resolve);
    });
}
