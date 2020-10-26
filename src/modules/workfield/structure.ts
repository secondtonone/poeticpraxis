import { RhythmPresets } from './rhythmPresets';

export type IdString = string; //has format 's02874'
export type IdWord = string; //has format 's02874w09528'
export type IdWordToken = string; //has format 'w09528'
export type IdVowel = string; //has format 's02874w09528v11213'
export type IdConsonant = string; //has format 's02874w09528c47855'
export type IdSpace = string; //has format 's02874sp34205'
export type IdSymbol = string; //has format 's02874t57503'
export type IdPauseSymbol = string; //has format 's02874p34205'

export type IdElement =
    | IdWord
    | IdVowel
    | IdConsonant
    | IdSpace
    | IdSymbol
    | IdPauseSymbol;

export type Type = 'sp' | 't' | 'p' | 'w' | 'c' | 'v';

export interface ITag {
    height: number;
    left: number;
    top: number;
    width: number;
}

export interface ICoreElement {
    accent: number;
    idString: IdString;
    type: Type;
    stringIndex: number;
}

export interface IUnitaryElement extends ICoreElement {
    id: IdSpace | IdSymbol;
    char: string;
    hashTokenId: number;
    type: Extract<Type, 'p' | 'c' | 'v'>;
}

export interface ISymbolElement extends ICoreElement {
    id: IdSpace | IdSymbol;
    char: string;
    hashTokenId: number;
    type: Extract<Type, 'sp' | 't'>;
}

export interface IPauseElement extends IUnitaryElement {
    id: IdPauseSymbol;
    type: 'p';
    tag: ITag;
}

export interface IWordElement extends ICoreElement {
    id: IdWord;
    type: 'w';
    accents: IdVowel[];
    orderToken: (IdVowel | IdConsonant)[];
    token: string;
}

export interface ILetterElement extends IUnitaryElement {
    id: IdConsonant | IdVowel;
    type: Extract<Type, 'c' | 'v'>;
    idToken: IdWordToken;
    index: number;
    isLast: boolean;
    stringIndex: number;
    prev: null | IdConsonant | IdVowel;
    next: null | IdConsonant | IdVowel;
}

export interface ICLetterElement extends ILetterElement {
    id: IdConsonant;
    type: 'c';
    isSolid: boolean;
    isNoisy: boolean;
    isVoiced: boolean;
}

export interface IVLetterElement extends ILetterElement {
    id: IdVowel;
    type: 'v';
    tag: ITag;
}

export type ISoundGramma = IdVowel[];

export interface IStrings {
    [idString: string]: {
        id: IdString;
        order: IdElement[];
        soundGramma: ISoundGramma;
        string: string;
        steps: IdVowel[][];
        tag: ITag;
        vowel: IdVowel[];
        words: IdWord[];
        totalStringAccents: IdVowel[];
        rhythmPresets: RhythmPresets;
    };
}

export type Element =
    | ISymbolElement
    | IPauseElement
    | IWordElement
    | ICLetterElement
    | IVLetterElement;

export interface IElements {
    [idElement: string]: Element;
}

export type Tags = IVLetterElement | IPauseElement;

export interface IHashTable {
    [hash: number]: { id: IdElement | IdString };
}

export interface IStringLinks {
    [rhymeString: string]: IdString[];
}

export interface IWordLinks {
    [word: string]: IdWord[];
}

export interface IStructure {
    strings: IStrings;
    orderStrings: IdElement[];
    elements: IElements;
    tags: Tags[];
    hashTable: IHashTable;
    stringLinks: IStringLinks;
    wordLinks: IWordLinks;
    wordsCount: number;
    mainMeter: {
        title: string;
        inPercent: number;
    };
}

const structure: IStructure = {
    strings: {},
    orderStrings: [],
    elements: {},
    tags: [],
    hashTable: {},
    stringLinks: {},
    wordLinks: {},
    wordsCount: 0,
    mainMeter: {
        title: '',
        inPercent: 0,
    },
};

export default structure;
