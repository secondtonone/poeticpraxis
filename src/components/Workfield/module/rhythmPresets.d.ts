interface rhythmPreset {
    size: 1 | 2 | 3;
    accent: 0 | 1 | 2 | 3;
    title: 'PYRRHIC' | 'TROCHEE' | 'IAMB' | 'DACTYL' | 'AMPHIBRACHIUM' | 'ANAPAEST';
};

declare const RhythmPresets: rhythmPreset[];

export default RhythmPresets;
