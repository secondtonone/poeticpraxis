import { randomize, hashFunction } from '../../utils';

const vowelsList = 'eyuioaуеыаоэёяиюäöüéàèùâêîôûïüÿìíòóúęąєў';
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isVowel(char) {
    const vowels = new RegExp(`^[${vowelsList}]$`);
    return vowels.test(char.toLowerCase());
}
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function vowelCount(word) {
    const vowels = new RegExp(`[${vowelsList}]`, 'gi');
    const result = word.match(vowels);
    return result === null ? 0 : result.length;
}
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isLetter(char) {
    return /[a-zA-ZА-Яа-яёäöüéàèùâêîôûïüÿìíòóúęąєўЁÄÖÜÉÀÈÙÂÊÎÔÛÏÜŸÌÍÒÓÚĘĄЄЎ]$/.test(
        char
    );
}
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isBreakLine(char) {
    return /\n/g.test(char);
}
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isSpace(char) {
    return /\s/g.test(char);
}
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isPause(char) {
    return /⋀/g.test(char);
}
/**
 *
 *
 * @export
 * @param {RegExp} rule
 * @param {string} char
 * @returns {number}
 */
export function isAccentedByRegExp(rule, char) {
    const regExp = new RegExp(rule);
    return regExp.test(char) ? 1 : 0;
}
/**
 *
 * @export
 * @param {string} token
 * @param {number} index
 * @param {{[word: string]: any}} dictionary
 * @returns {number}
 */
export function isAccented(token, index, dictionary = {}) {
    let element = isInDictionary(token, dictionary);

    return element /* && element.accents[index] */
        ? element.accents[index].type
        : 0;
}
/**
 *
 * @param {string} token
 * @param {{[word: string]: any} | {}} dictionary
 * @returns {boolean}
 */
function isInDictionary(token, dictionary = {}) {
    let lowerCased = token.toLowerCase();

    return dictionary[lowerCased];
}
/**
 *
 *
 * @export
 * @param {string} token
 * @param {string} idToken
 * @param {Object} list
 * @returns {Object}
 */
export function makeListLinks(token, idToken, list) {
    let lowerCased = token.toLowerCase();

    let links = list[lowerCased] || [];

    links = [...links, idToken];

    list[lowerCased] = [...new Set(links)];

    return list;
}
/* убрать знаки припенания, для выявления слов*/

/* str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');*/

/* let stringWords = string.match(/[a-zA-ZА-Яа-яёЁ]+/g) || [];

        words = [...words, ...stringWords];*/

function positionAccent(vowelCount) {
    return Math.floor((vowelCount + 1) / 2);
}

function isAccentedByPosition(token, vowelCounter) {
    const vowelNumber = vowelCount(token);

    const suggestionPosAccent = positionAccent(vowelNumber);

    return suggestionPosAccent === vowelCounter ? 1 : 0;
}

function stringOnSteps(string = [], totalAccents = 0, elements = {}) {
    const isAccented = (id) =>
        id ? elements[id].accent === 1 || elements[id].accent === 2 : false;

    const whichStep = (index, step = 2) => {
        if (string[index + step] && !isAccented(string[index + step])) {
            return whichStep(index, step + 1);
        }
        return step;
    };

    const elementCount = string.length;

    let steps = [];

    let step = [];

    let defaultStep = Math.floor(elementCount / totalAccents);

    for (let index = 0; index < elementCount; index++) {
        const element = string[index];

        if (isAccented(element)) {
            defaultStep = whichStep(index, defaultStep);
        }

        step.push(element);

        if (step.length >= defaultStep || index === elementCount - 1) {
            steps.push(step);
            step = [];
        }
    }

    return steps;
}
/**
 * @export
 * @param {string} text
 * @param {Object} stringsDictionary
 * @param {Object} wordsDictionary
 * @returns {Object}
 */
export function textAnalizator(text, stringsDictionary, wordsDictionary) {
    const fieldStrings = text.split('\n');

    let strings = {};

    let elements = {};

    let hashTable = {};

    let interator = 0;

    let wordLinks = {};

    let stringLinks = {};

    /* Строка */
    let orderStrings = [];

    const fieldStringsLength = fieldStrings.length;

    for (let index = 0; index < fieldStringsLength; index++) {
        const string = fieldStrings[index];

        interator += index;

        let idString = `s${index}${randomize()}`;

        let vowel = [];

        let soundGramma = [];

        let rhythmPreset = 0;

        let totalStringAccents = [];

        let words = [];

        let tokens = string
            .split(/(\s|[a-zA-ZА-Яа-яёЁ-]+|[\.,\/#!$%\^&\*;:{}=\-_`~()⋀])/)
            .filter((n) => n);

        let order = [];

        let stringIndex = 0;
        /* Слово */
        const tokensLength = tokens.length;

        for (let index = 0; index < tokensLength; index++) {
            const token = tokens[index];

            let type = 't';

            let idToken = `t${index}${randomize()}`;

            let accent = 0;

            let accents = [];

            let hashTokenId = '';
            /* символ */
            if (isLetter(token)) {
                idToken = `w${index}${randomize()}`;

                let vowelCounter = 0;

                type = 'w';

                /* Буквы */
                const letters = [...token];

                const lettersLength = letters.length;

                let orderToken = [];

                for (let index = 0; index < lettersLength; index++) {
                    const char = letters[index];

                    const array = letters;

                    hashTokenId = hashFunction(char, ++interator);

                    const isLast = index === array.length - 1;

                    let idSymbol = `c${index}${randomize()}`;

                    let type = 'c';

                    accent = 0;

                    if (isVowel(char)) {
                        idSymbol = `v${index}${randomize()}`;

                        type = 'v';

                        ++vowelCounter;

                        if (
                            isInDictionary(string, stringsDictionary) ||
                            isInDictionary(token, wordsDictionary)
                        ) {
                            accent = isInDictionary(string, stringsDictionary)
                                ? isAccented(
                                      string,
                                      stringIndex,
                                      stringsDictionary
                                  )
                                : isAccented(token, index, wordsDictionary);
                        } else {
                            accent =
                                isAccentedByRegExp('ёЁ', char) ||
                                isAccentedByPosition(token, vowelCounter);
                        }

                        const idVowel = `${idString}${idToken}${idSymbol}`;

                        vowel.push(idVowel);

                        if (accent !== 3) {
                            /* if (!soundGramma.length) {
                                const step = [idVowel];
                                soundGramma.push(step);
                            } else {
                                soundGramma[soundGramma.length-1].push(idVowel);
                            } 
                            */
                            soundGramma.push(idVowel);
                            accents.push(idVowel);
                        }
                    }

                    idSymbol = `${idString}${idToken}${idSymbol}`;

                    elements[idSymbol] = {
                        isLast,
                        type,
                        char,
                        accent,
                        index,
                        id: idSymbol,
                        idString,
                        idToken,
                        stringIndex,
                        hashTokenId
                    };

                    hashTable[hashTokenId] = {
                        id: idSymbol
                    };

                    order.push(idSymbol);

                    ++stringIndex;

                    orderToken.push(idSymbol);
                }

                idToken = `${idString}${idToken}`;

                words.push(idToken);

                wordLinks = makeListLinks(token, idToken, wordLinks);

                elements[idToken] = {
                    type,
                    token,
                    accent,
                    accents,
                    orderToken,
                    id: idToken,
                    idString
                };
            } else {
                hashTokenId = hashFunction(token, ++interator);

                idToken = `${idString}${idToken}`;

                if (isSpace(token)) {
                    type = 'sp';

                    idToken = `${idString}${type}${index}${randomize()}`;
                }

                if (isPause(token)) {
                    type = 'p';

                    idToken = `${idString}${type}${index}${randomize()}`;

                    soundGramma.push(idToken);
                }

                elements[idToken] = {
                    type,
                    char: token,
                    id: idToken,
                    idString,
                    hashTokenId,
                    accent
                };

                hashTable[hashTokenId] = {
                    id: idToken
                };

                order.push(idToken);

                ++stringIndex;
            }
        }

        stringLinks = makeListLinks(string, idString, stringLinks);

        rhythmPreset = rhythmDetection(soundGramma, elements);

        totalStringAccents = soundGramma.filter(
            (idElemet) =>
                elements[idElemet].accent === 1 ||
                elements[idElemet].accent === 2
        );

        try {
            const meter = stringOnSteps(
                soundGramma,
                totalStringAccents.length,
                elements
            );
            console.log(meter);
        } catch (error) {
            console.info(error);
        }

        strings[idString] = {
            order,
            string,
            words,
            vowel,
            totalStringAccents,
            soundGramma,
            rhythmPreset,
            id: idString
        };

        orderStrings.push(idString);
    }

    return {
        strings,
        orderStrings,
        elements,
        hashTable,
        wordLinks,
        stringLinks
    };
}
/**
 *
 *
 * @export
 * @param {Object} node
 * @param {Object} textAnalized
 * @returns {Object}
 */
export function tagMaker(node, textAnalized) {
    const stringNodes = [...node];

    let tags = [];

    let symbols = [];

    const { elements, strings } = textAnalized;

    let symbolsSet = [];

    const stringNodesLength = stringNodes.length;

    for (let i = 0; i < stringNodesLength; i++) {
        const string = stringNodes[i];

        const symbols = [...string.children];

        strings[string.id].tag = {
            left: string.offsetLeft,
            top: string.offsetTop,
            height: string.offsetHeight,
            width: string.offsetWidth
        };

        symbolsSet.push(symbols);
    }

    const symbolsSetLength = symbolsSet.length;

    for (let i = 0; i < symbolsSetLength; i++) {
        const set = symbolsSet[i];

        symbols = [...symbols, ...set];
    }

    const symbolsLength = symbols.length;

    if (symbolsLength) {
        for (let i = 0; i < symbolsLength; i++) {
            const symbol = symbols[i];

            const type = symbol.dataset.type;
            if (
                type === 'black' ||
                type === 'red' ||
                type === 'red_secondary' ||
                type === 'gray' ||
                type === 'string-pause'
            ) {
                const offsetLeft = symbol.parentNode.offsetLeft;
                const offsetTop = symbol.parentNode.offsetTop;

                elements[symbol.id].tag = {
                    left: symbol.offsetLeft + offsetLeft,
                    top: symbol.offsetTop + offsetTop,
                    height: symbol.offsetHeight,
                    width: symbol.offsetWidth
                };

                tags.push(elements[symbol.id]);
            }
        }
    }

    return {
        elements,
        strings,
        tags
    };
}

export function makeCaesura(field, getResult) {
    insertionToPosition('⋀', field, getResult);
}

function insertionToPosition(str, textarea, getResult) {
    const value = textarea.value;
    const before = value.substring(0, textarea.selectionStart);
    const after = value.substring(textarea.selectionEnd, value.length);

    const text = `${before}${str}${after}`;

    if (getResult) {
        getResult(text);
    }

    setCursor(textarea, before.length + str.length);
}

function setCursor(elem, pos) {
    elem.focus();

    setTimeout(() => {
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            const range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }, 50);
}

function rhythmDetection(soundGramma, elements) {
    let rhythmPreset = 0;

    /* soundGramma.forEach((elementId, index) => {
        if (index === 0) {
            
        }
    }); */

    return rhythmPreset;
}
function wordAccent(accent) {
    if (accent < 3) {
        ++accent;
    } else {
        accent = 0;
    }
    return accent;
}

function updateElementsByStringLink({
    elements,
    element,
    stringLink,
    strings
}) {
    const stringLinkLength = stringLink.length;

    for (let i = 0; i < stringLinkLength; i++) {
        const idString = stringLink[i];

        if (strings[idString]) {
            let idElement = strings[idString].order[element.stringIndex];

            if (element.id !== idElement) {
                elements[idElement].accent = elements[element.id].accent;

                stringLinksTriggered = true;
            }
        }
    }

    return elements;
}

function updateWordsDictionary(idWord, wordsDictionary, elements) {
    const word = elements[idWord];
    const wordLowerCased = word.token.toLowerCase();

    let wordAccents = [];

    const wordOrderTokenLength = word.orderToken.length;

    for (let i = 0; i < wordOrderTokenLength; i++) {
        const id = word.orderToken[i];

        wordAccents.push({
            type: elements[id].accent
        });
    }

    wordsDictionary[wordLowerCased] = {
        accents: wordAccents
    };
    return wordsDictionary;
}

function updateStringsDictionary(string, stringsDictionary, elements) {
    const stringLowerCased = string.string.toLowerCase();

    let stringAccents = [];

    const stringOrderLength = string.order.length;

    for (let i = 0; i < stringOrderLength; i++) {
        const id = string.order[i];

        stringAccents.push({
            type: elements[id].accent
        });
    }

    stringsDictionary[stringLowerCased] = {
        accents: stringAccents
    };

    return stringsDictionary;
}

function makeSoundGramma(signId, string, accent) {
    let soundGramma = string.soundGramma;

    const indexSoundGramma = string.soundGramma.indexOf(signId);

    if (accent === 3 && indexSoundGramma !== -1) {
        soundGramma.splice(indexSoundGramma, 1);
    }
    if (accent < 3 && indexSoundGramma === -1) {
        soundGramma.push(signId);
    }

    return soundGramma;
}

export function makeAccent({
    signId,
    elements,
    strings,
    stringLinks,
    wordLinks,
    wordsDictionary,
    stringsDictionary,
    accent
}) {
    const element = elements[signId];

    const idString = element.idString;

    const idWord = `${idString}${element.idToken}`;

    //let stringLinksTriggered = false;

    let string = strings[idString];

    const stringLowerCased = string.string.toLowerCase();

    const elementAccent = element.accent;

    /* Удаление ударения */

    if (elements[idWord].accents && elements[idWord].accents[0]) {
        //const element = elements[idWord].accents[0];

        //elements[element].accent = 0;

        elements[idWord].accents = [];
    }

    /* Работа с ударением */

    elements[signId].accent = Number.isInteger(accent)
        ? accent
        : wordAccent(elementAccent);

    if (elements[signId].accent === 1) {
        elements[idWord].accents.push(signId);
    }

    /* Работа со словом */

    wordsDictionary = updateWordsDictionary(idWord, wordsDictionary, elements);

    /* Работа со строкой */

    stringsDictionary = updateStringsDictionary(
        string,
        stringsDictionary,
        elements
    );

    /* Работа с нотой */

    strings[idString].soundGramma = makeSoundGramma(
        signId,
        string,
        elementAccent
    );

    /* Работа с количеством ударений */

    strings[idString].totalStringAccents = strings[idString].soundGramma.filter(
        (idElemet) =>
            elements[idElemet].accent === 1 || elements[idElemet].accent === 2
    );

    /* баги*/

    if (stringLinks[stringLowerCased]) {
        const stringLink = stringLinks[stringLowerCased];

        elements = updateElementsByStringLink({
            elements,
            element,
            stringLink,
            strings
        });
    }

    /* if(!stringLinksTriggered && wordLinks[wordLowerCased]) {
            wordLinks[wordLowerCased].forEach( idWord => {

                if(elements[idWord]) {

                    let idElement = elements[idWord].orderToken[element.index];

                    if(element.id != idElement) {
                        elements[idElement].accent = elements[element.id].accent;
                    }

                }
            });
        }*/

    return {
        elements,
        strings,
        wordsDictionary,
        stringsDictionary
    };
}
/**
 * @typedef {{size: 1 | 2 | 3, accent: 0 | 1 | 2 | 3 }} RhythmPreset
 */
/**
 * @type {Array<RhythmPreset>}
 */
export const rhythmPresets = [
    {
        size: 2,
        accent: 0
    },
    {
        size: 2,
        accent: 1
    },
    {
        size: 2,
        accent: 2
    },
    {
        size: 3,
        accent: 1
    },
    {
        size: 3,
        accent: 2
    },
    {
        size: 3,
        accent: 3
    }
];

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
export const structure = {
    strings: {},
    orderStrings: [],
    elements: {},
    tags: [],
    hashTable: {},
    stringLinks: {},
    wordLinks: {}
};
