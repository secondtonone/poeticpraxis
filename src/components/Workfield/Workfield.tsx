import { FunctionalComponent } from 'preact';

import Langs from '@typings/Langs';
import Textarea, { TextareaProps } from '@components/Textarea';

import Marks, { MarksProps } from './Marks';
import HiddenMarks, { HiddenMarksProps } from './HiddenMarks';
import InfoMarks, { InfoMarksProps } from './InfoMarks';
import StubMarks, { StubMarksProps } from './StubMarks';

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
}) => {
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
};

export default Workfield;
