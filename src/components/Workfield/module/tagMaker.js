/**
 *
 *
 * @export
 * @param {Object} node
 * @param {Object} textAnalized
 * @returns {Object}
 */
export default function tagMaker(node, textAnalized) {
    const stringNodes = [...node];

    let tags = [];

    let symbols = [];

    const { elements, strings } = textAnalized;

    let symbolsSet = [];

    const stringNodesLength = stringNodes.length;

    for (let i = 0; i < stringNodesLength; i++) {
        const string = stringNodes[i];

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
            const symbol = symbols[i];

            const type = symbol.dataset.type;
            if (
                type === 'black' ||
                type === 'red' ||
                type === 'red_secondary' ||
                type === 'gray' ||
                type === 'string-pause'
            ) {
                const offsetLeft = symbol.parentNode.offsetLeft;
                const offsetTop = symbol.parentNode.offsetTop;

                elements[symbol.id].tag = {
                    left: symbol.offsetLeft + offsetLeft,
                    top: symbol.offsetTop + offsetTop,
                    height: symbol.offsetHeight,
                    width: symbol.offsetWidth
                };

                tags.push(elements[symbol.id]);
            }
        }
    }

    return {
        elements,
        strings,
        tags
    };
}
