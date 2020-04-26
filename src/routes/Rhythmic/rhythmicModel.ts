import { IStructure } from '@components/Workfield/module/structure';

export interface IDictionary {
    [key: string]: {
        accents: Array<{
            type: 0 | 1 | 2 | 3;
        }>
    }
}

export interface ICurrentRhythmicState
    extends Pick<
        IStructure,
        'mainMeter' | 'strings' | 'elements' | 'orderStrings'
    > {
    text: string;
    stringsDictionary: IDictionary;
    wordsCount: number;
}

interface IRhythmicModel {
    wordsDictionary: IDictionary;
    currentRhythmicState: ICurrentRhythmicState;
}

const rhythmicModel: IRhythmicModel = {
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
