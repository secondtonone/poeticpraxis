import { RhythmPresets } from './rhythmPresets';

type IdString = string; //has format 's02874'
type IdWord = string; //has format 's02874w09528'
type IdWordToken = string; //has format 'w09528'
type IdVowel = string; //has format 's02874w09528v11213'
type IdConsonant = string; //has format 's02874w09528c47855'
type IdSpace = string; //has format 's02874sp34205'
type IdSymbol = string; //has format 's02874t57503'
type IdPauseSymbol = string; //has format 's02874p34205'

type IdElement =
    | IdWord
    | IdVowel
    | IdConsonant
    | IdSpace
    | IdSymbol
    | IdPauseSymbol;

type Type = 'sp' | 't' | 'p' | 'w' | 'c' | 'v';

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
}

export interface ICLetterElement extends ILetterElement {
    id: IdConsonant;
    type: 'c';
}

export interface IVLetterElement extends ILetterElement {
    id: IdVowel;
    type: 'v';
    tag: ITag;
}

export interface IStrings {
    [idString: string]: {
        id: IdString;
        order: IdElement[];
        soundGramma: string[];
        string: string;
        tag: ITag;
        vowel: string[];
        words: string[];
        totalStringAccents: string[];
        rhythmPresets: RhythmPresets;
    };
}

export interface IElements {
    [idElement: string]:
        | ISymbolElement
        | IPauseElement
        | IWordElement
        | ICLetterElement
        | IVLetterElement;
}

type Tags = IVLetterElement | IPauseElement;

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
    orderStrings: string[];
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
