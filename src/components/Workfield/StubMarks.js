import { h } from 'preact';

import { SyllableStub, MarkStub } from './styled';

const StubMarks = ({ strings, orderStrings }) => {
    let stubTags = [];
    const lineHeight = 52;
    const widthSymbol = 10;

    const orderStringsLength = orderStrings.length;

    for (let index = 0; index < orderStringsLength; index++) {
        const stringId = orderStrings[index];

        if (strings[stringId] === undefined) {
            stubTags.push([
                <SyllableStub
                    as="span"
                    data-type="stub"
                    key={`stub-${index}`}
                    style={{ top: index * lineHeight }}
                />,
                <MarkStub
                    as="span"
                    data-type="stub"
                    key={`mark-stub-${index}`}
                    style={{
                        top: index * lineHeight,
                        width: stringId * widthSymbol,
                    }}
                />,
            ]);
        }
    }

    return stubTags;
};

export default StubMarks;
