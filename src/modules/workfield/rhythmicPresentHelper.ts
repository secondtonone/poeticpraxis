const rhythmPresetHelper = {
  2: {
    0: 1,
    1: 2
  },
  3: {
    0: 3,
    1: 4,
    2: 5
  }
} as const;

export type RhythmPresetHelper = typeof rhythmPresetHelper;

export type MeterSizes = RhythmPresetHelper[2] | RhythmPresetHelper[3];

export type MeterSizesKeys = keyof RhythmPresetHelper[2] | keyof RhythmPresetHelper[3];

export type Meter = RhythmPresetHelper[2][0 | 1] | RhythmPresetHelper[3][0 | 1 | 2];

export default rhythmPresetHelper;
