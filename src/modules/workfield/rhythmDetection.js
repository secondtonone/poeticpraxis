import findCommon from '@utils/findCommon';
export default function rhythmDetection(steps, elements) {
    let rhythmPresetHelper = {
        '2': {
            '0': 1,
            '1': 2
        },
        '3': {
            '0': 3,
            '1': 4,
            '2': 5
        }
    };

    const stringPresetRhythm = steps.map((step) => {
        const stepLength = step.length;

        if (rhythmPresetHelper[stepLength]) {
            const meter = rhythmPresetHelper[stepLength];
            const accent = step.findIndex(
                (elementId) =>
                    elements[elementId].accent === 1 ||
                    elements[elementId].accent === 2
            );

            return meter[accent];
        }

        return 0;
    });

    return findCommon(stringPresetRhythm) || 0;
}
