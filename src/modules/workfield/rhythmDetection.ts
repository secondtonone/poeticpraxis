import findCommon from '@utils/findCommon';
import rhythmPresetHelper, { Meter, MeterSizes } from './rhythmicPresentHelper';
import { IElements, IString } from './structure';



export default function rhythmDetection(steps: IString['steps'], elements: IElements) {
    const stringPresetRhythm = steps.map((step) => {
        const stepLength = step.length;

        if (rhythmPresetHelper[stepLength]) {
            const meter: MeterSizes = rhythmPresetHelper[stepLength];
            const accent = step.findIndex(
                (elementId) =>
                    elements[elementId].accent === 1 ||
                    elements[elementId].accent === 2
            );

            return meter[accent] as Meter;
        }

        return 0;
    });

    return findCommon(stringPresetRhythm) || 0;
}
