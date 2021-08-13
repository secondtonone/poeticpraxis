import { h } from 'preact';

import Textarea from '@components/Textarea';

import Marks from './Marks';
import HiddenMarks from './HiddenMarks';
import InfoMarks from './InfoMarks';
import StubMarks from './StubMarks';

import { FakeField, WorkField, PaintField } from './styled';

/* парсить по словам, сравнивать с предыдущим деревом */

export default function Workfield({
    lang,
    placeHolder = '',
    value,
    zoomIn = false,
    readOnly,
    lineHeight,
    syllableOff,
    stringNumberOff,
    strings,
    orderStrings,
    tags,
    elements,
    onClick,
    onDoubleClick,
    onInput,
    onMouseMove,
    onFocus,
    onBlur,
    fakeFieldRef,
    getRef
}) {
    return (
        <WorkField>
            <FakeField
                data-id-comp="fakeField"
                zoomIn={zoomIn}
                ref={fakeFieldRef}>
                <HiddenMarks
                    strings={strings}
                    orderStrings={orderStrings}
                    elements={elements}
                />
            </FakeField>

            <PaintField
                data-id-comp="paintField"
                zoomIn={zoomIn}
                onClick={onClick}
                onDoubleClick={onDoubleClick}>
                {value && <StubMarks strings={strings} orderStrings={orderStrings} />}
                <Marks tags={tags} lang={lang} />
                <InfoMarks
                    lang={lang}
                    strings={strings}
                    orderStrings={orderStrings}
                    lineHeight={lineHeight}
                    elements={elements}
                    syllableOff={syllableOff}
                    stringNumberOff={stringNumberOff}
                />
            </PaintField>
            <Textarea
                onInput={onInput}
                value={value}
                readOnly={readOnly}
                zoomIn={zoomIn}
                onMouseMove={onMouseMove}
                onFocus={onFocus}
                onBlur={onBlur}
                placeHolder={placeHolder}
                getRef={getRef}
            />
        </WorkField>
    );
}
