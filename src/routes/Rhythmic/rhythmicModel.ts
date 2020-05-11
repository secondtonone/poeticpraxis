import { IStructure } from '@modules/workfield/structure';
import { IDictionary } from '@modules/workfield/dictionary';

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
