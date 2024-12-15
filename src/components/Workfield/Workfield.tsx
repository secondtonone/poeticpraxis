import type { FunctionalComponent } from 'preact';

import type { Langs } from '@typings/Langs';
import Textarea, { type TextareaProps } from '@components/Textarea';

import Marks, { type MarksProps } from './Marks';
import HiddenMarks, { type HiddenMarksProps } from './HiddenMarks';
import InfoMarks, { type InfoMarksProps } from './InfoMarks';
import StubMarks, { type StubMarksProps } from './StubMarks';

import { FakeField, WorkField, PaintField } from './styled';

/* парсить по словам, сравнивать с предыдущим деревом */
export interface WorkfieldProps extends Omit<TextareaProps, 'onError' | 'onClick' | 'onDoubleClick'>, Partial<MarksProps>, Partial<StubMarksProps>, Partial<HiddenMarksProps>, Partial<InfoMarksProps> {
  lang: Langs
  fakeFieldRef?: React.Ref<HTMLDivElement>
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onDoubleClick?: React.MouseEventHandler<HTMLDivElement>
}

const Workfield: FunctionalComponent<WorkfieldProps> = ({
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
}) => (
  <WorkField>
    <FakeField
      data-id-comp="fakeField"
      zoomIn={zoomIn}
      ref={fakeFieldRef}>
      <HiddenMarks
        strings={strings}
        orderStrings={orderStrings}
        elements={elements} />
    </FakeField>

    <PaintField
      data-id-comp="paintField"
      zoomIn={zoomIn}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {value && <StubMarks strings={strings} orderStrings={orderStrings} />}
      <Marks tags={tags} lang={lang} />
      <InfoMarks
        lang={lang}
        strings={strings}
        orderStrings={orderStrings}
        lineHeight={lineHeight}
        elements={elements}
        syllableOff={syllableOff}
        stringNumberOff={stringNumberOff} />
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
      getRef={getRef} />
  </WorkField>
);

export default Workfield;
