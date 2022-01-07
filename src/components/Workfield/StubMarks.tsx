import { IStructure } from '@modules/workfield/structure';

import { SyllableStub, MarkStub } from './styled';

export interface StubMarksProps {
    orderStrings?: IStructure['orderStrings']
    strings?: IStructure['strings']
}

const StubMarks = ({ strings = {}, orderStrings = []}: StubMarksProps) => {
    let stubTags: React.ReactNode[] = [];
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
                        width: +stringId * widthSymbol,
                    }}
                />,
            ]);
        }
    }

    return <>{stubTags}</>;
};

export default StubMarks;
