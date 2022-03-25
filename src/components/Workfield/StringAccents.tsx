import { memo } from 'preact/compat';
import { useMemo } from 'preact/hooks';

import {
  Syllable,
  TriangleElement,
  CircleElement,
  SyllableAccent,
  SyllableAccentType
} from './styled';

import { IRhythmPreset } from '@modules/workfield/rhythmPresets';

const makeAccentSizeIndicator = (size: IRhythmPreset['size'], accent: IRhythmPreset['accent']) => {
  const scheme: React.ReactNode[] = [];

  for (let i = 1; i <= size; i++) {
    if (i === accent) {
      scheme.push(<TriangleElement key={`tr-${i}`} />);
    } else {
      scheme.push(<CircleElement key={`cl-${i}`} />);
    }
  }

  return scheme;
};

export interface StringAccentsProps {
    id: string
    title: string
    delta: number
    top: number
    vowelAccentCount: number
    soundGrammaLength: number
    size: IRhythmPreset['size']
    accent: IRhythmPreset['accent']
}

const StringAccents = memo<StringAccentsProps>(({
  id,
  title,
  delta,
  top,
  vowelAccentCount,
  soundGrammaLength,
  size,
  accent
}) => {

  const dataTypeAQ = 'a/q';

  const accentSizeGenerator = useMemo(() => makeAccentSizeIndicator(size, accent), [size, accent]);

  return (
    <Syllable
      id={id}
      data-type={dataTypeAQ}
      title={title}
      key={`s-${top}`}
      style={{ top: top + delta }}>
      {vowelAccentCount ? (
        <SyllableAccent>
          {vowelAccentCount}
        </SyllableAccent>
      ) : null}
      {soundGrammaLength}
      <SyllableAccentType>
        {accentSizeGenerator}
      </SyllableAccentType>
    </Syllable>
  );
});

export default StringAccents;
