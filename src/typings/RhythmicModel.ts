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

export default interface IRhythmicModel {
    wordsDictionary: IDictionary;
    currentRhythmicState: ICurrentRhythmicState;
}