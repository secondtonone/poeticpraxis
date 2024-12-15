import findCommon from '@utils/findCommon';
import rhythmPresetHelper, { type Meter, type MeterSizesKeys, type RhythmPresetHelper } from './rhythmicPresentHelper';
import type { IElements, IString } from './structure';



export default function rhythmDetection(steps: IString['steps'], elements: IElements) {
  const stringPresetRhythm = steps.map((step) => {
    const stepLength = step.length as keyof RhythmPresetHelper;

    if (rhythmPresetHelper[stepLength]) {
      const meter = rhythmPresetHelper[stepLength];
      const accent = step.findIndex(
        (elementId) =>
          elements[elementId].accent === 1 ||
                    elements[elementId].accent === 2
      ) as MeterSizesKeys;
      // @ts-ignore
      return (meter[accent] ? meter[accent] : 0) as Meter | 0;
    }

    return 0;
  });

  return findCommon(stringPresetRhythm) || 0;
}
