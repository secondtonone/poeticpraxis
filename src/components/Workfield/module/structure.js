/**
 * @typedef {string} idString - has format 's02874'
 * @typedef {string} idWord - has format 's02874w09528'
 * @typedef {string} idWordToken - has format 'w09528'
 * @typedef {string} idVowel - has format 's02874w09528v11213'
 * @typedef {string} idConsonant - has format 's02874w09528c47855'
 * @typedef {string} idSpace - has format 's02874sp34205'
 * @typedef {string} idSymbol - has format 's02874t57503'
 * @typedef {string} idPauseSymbol - has format 's02874p34205'
 * @typedef {idWord | idVowel | idConsonant | idSpace | idSymbol | idPauseSymbol} idElement - all elements
 * @typedef {{height: number, left: number, top: number, width: number}} Tag - painted element's position
 */
/**
 * @typedef {{accent: number, idString: idString}} CoreElement - core element props
 */
/**
 * @typedef {CoreElement & {id: idSpace | idSymbol, char: string, hashTokenId: number, type: 'sp' | 't'}} SymbolElement - non-letters
 */
/**
 * @typedef {SymbolElement & {id: idPauseSymbol, type: 'p', tag: Tag}} PauseElement - pause element
 */
/**
 * @typedef {CoreElement & {id: idWord, type: 'w', accents: idVowel[], orderToken: (idVowel | idConsonant)[], token: string}} WordElement - word element
 */
/**
 * @typedef {SymbolElement & {id: idConsonant, type: 'c', idToken: idWordToken, index: number, isLast: boolean, stringIndex: number}} CLettetElement - consonat letter
 */
/**
 * @typedef {CLettetElement & {id: idVowel, type: 'v', tag: Tag}} VLettetElement - vowel letter
 */
/**
 * @typedef {{[idElement: string]: SymbolElement | PauseElement | WordElement | CLettetElement | VLettetElement}} Elements - struct all elements
 */
/**
 * @typedef {VLettetElement | PauseElement} Tags - painted elements
 */
/**
 * @typedef {{[word: string]: idWord[]}} WordLinks - glosary word links with word elements
 */
/**
 * @typedef {{[rhymeString: string]: idString[]}} StringLinks - string links with string elements
 */
/**
 * @typedef {{[hash: number]: {id: idElement | idString}}} HashTable - hash links with elements
 */
/**
 * @typedef {{[idString: string]: {id: idString, order: idElement[], soundGramma: string[], string: string, tag: Tag, vowel: string[], words: string[], totalStringAccents: string[], rhythmPresets: RhythmPreset }}} Strings - string elements
 */

/**
 * @type {{strings: Strings, orderStrings: string[], elements: Elements, tags: Tags[], hashTable: HashTable, stringLinks: StringLinks, wordLinks: WordLinks}} - data model of app
 */

const structure = {
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
        inPercent: 0
    }
};

export default structure;
