import { IdString } from '@modules/workfield/structure';

export default interface LetterGramma {
  music: {
    string: IdString
    isAccented: boolean
    char: string
    time: number
    sound?: 0 | 2
    vowelNotes: {
      note: number
      duration: number
      notation: string
    }[]
    index: number
  }[]
  time: number
};

export type Music = LetterGramma['music'];
export type Note = Music[0];
export type VowelNotes = Note['vowelNotes'];
export type VowelNote = VowelNotes[0];
