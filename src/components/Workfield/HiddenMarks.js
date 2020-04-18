import { h } from 'preact';

import { Accent, StringPause, StringField } from './styled';

import { accents } from './module';

const HiddenMarks = ({ strings, orderStrings, elements }) => {
    let stringsOrders = [];

    let symbolsTags = {};

    let markingTags = [];

    const orderStringsLength = orderStrings.length;

    for (let index = 0; index < orderStringsLength; index++) {
        const id = orderStrings[index];

        if (strings[id]) {
            const string = strings[id];

            if (!symbolsTags[id]) {
                symbolsTags[id] = [];
            }

            stringsOrders = [...stringsOrders, ...string.order];
        }
    }

    const stringsOrdersLength = stringsOrders.length;

    for (let index = 0; index < stringsOrdersLength; index++) {
        const id = stringsOrders[index];

        if (elements[id]) {
            const symbol = elements[id];

            let char = symbol.char;

            const idString = symbol.idString;

            const accent = symbol.accent;

            let tag = char;

            if (symbol.type === 'v') {
                tag = (
                    <Accent
                        data-type={accents[accent]}
                        accent={accents[accent]}
                        key={`a-${id}`}
                        id={id}>
                        {char}
                    </Accent>
                );
            }
            if (symbol.type === 'p') {
                tag = (
                    <StringPause
                        key={`sp-${id}`}
                        id={id}
                        data-type="string-pause">
                        {char}
                    </StringPause>
                );
            }

            symbolsTags[idString].push(tag);
        }
    }

    for (let index = 0; index < orderStringsLength; index++) {
        const id = orderStrings[index];

        if (symbolsTags[id]) {
            const symbols = symbolsTags[id] || [];

            markingTags.push(
                <StringField key={`st-${id}`} id={id}>
                    {symbols.length ? symbols : ' '}
                </StringField>
            );
        }
    }

    return markingTags;
};

export default HiddenMarks;
