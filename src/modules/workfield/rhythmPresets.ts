export interface IRhythmPreset {
    size: 1 | 2 | 3;
    accent: 0 | 1 | 2 | 3;
    title: 'PYRRHIC' | 'TROCHEE' | 'IAMB' | 'DACTYL' | 'AMPHIBRACHIUM' | 'ANAPAEST';
}

export type RhythmPresets = IRhythmPreset[];

const rhythmPresets: RhythmPresets = [
  {
    size: 2,
    accent: 0,
    title: 'PYRRHIC',
  },
  {
    size: 2,
    accent: 1,
    title: 'TROCHEE',
  },
  {
    size: 2,
    accent: 2,
    title: 'IAMB',
  },
  {
    size: 3,
    accent: 1,
    title: 'DACTYL',
  },
  {
    size: 3,
    accent: 2,
    title: 'AMPHIBRACHIUM',
  },
  {
    size: 3,
    accent: 3,
    title: 'ANAPAEST',
  },
];

export default rhythmPresets;
