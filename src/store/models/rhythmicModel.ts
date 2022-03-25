import IRhythmicModel from '@typings/RhythmicModel';

const rhythmicModel: Readonly<IRhythmicModel> = {
  currentRhythmicState: {
    text: '',
    stringsDictionary: {},
    wordsCount: 0,
    mainMeter: {
      title: '',
      inPercent: 0,
    },
    strings: {},
    elements: {},
    orderStrings: [],
  },
  wordsDictionary: {},
};

export default rhythmicModel;
