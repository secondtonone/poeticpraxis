import rhythmPresets from './rhythmPresets';

type idString = string; //has format 's02874'
type idWord = string; //has format 's02874w09528'
type idWordToken = string; //has format 'w09528'
type idVowel = string; //has format 's02874w09528v11213'
type idConsonant = string; //has format 's02874w09528c47855'
type idSpace = string; //has format 's02874sp34205'
type idSymbol = string; //has format 's02874t57503'
type idPauseSymbol = string; //has format 's02874p34205'

type idElement =
    | idWord
    | idVowel
    | idConsonant
    | idSpace
    | idSymbol
    | idPauseSymbol;

interface Tag {
    height: number;
    left: number;
    top: number;
    width: number;
}

interface CoreElement {
    accent: number;
    idString: idString;
}

interface SymbolElement extends CoreElement {
    id: idSpace | idSymbol;
    char: string;
    hashTokenId: number;
    type: 'sp' | 't';
}

interface PauseElement extends SymbolElement {
    id: idPauseSymbol;
    type: 'p';
    tag: Tag;
}

interface WordElement extends CoreElement {
    id: idWord;
    type: 'w';
    accents: idVowel[];
    orderToken: (idVowel | idConsonant)[];
    token: string;
}

interface CLettetElement extends SymbolElement {
    id: idConsonant;
    type: 'c';
    idToken: idWordToken;
    index: number;
    isLast: boolean;
    stringIndex: number;
}

interface VLettetElement extends CLettetElement {
    id: idVowel;
    type: 'v';
    tag: Tag;
}

interface Strings {
    [idString: string]: {
        id: idString;
        order: idElement[];
        soundGramma: string[];
        string: string;
        tag: Tag;
        vowel: string[];
        words: string[];
        totalStringAccents: string[];
        rhythmPresets: RhythmPreset;
    };
}

interface Elements {
    [idElement: string]:
        | SymbolElement
        | PauseElement
        | WordElement
        | CLettetElement
        | VLettetElement;
}

type Tags = VLettetElement | PauseElement;

interface HashTable {
    [hash: number]: { id: idElement | idString };
}

interface StringLinks {
    [rhymeString: string]: idString[];
}

interface WordLinks {
    [word: string]: idWord[];
}

declare const structure: {
    strings: Strings;
    orderStrings: string[];
    elements: Elements;
    tags: Tags[];
    hashTable: HashTable;
    stringLinks: StringLinks;
    wordLinks: WordLinks;
    wordsCount: string;
    mainMeter: {
        title: string;
        inPercent: number;
    };
}

export default structure;
