import { randomize, hashFunction } from '../../utils';
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isVowel(char) {
    return /^[eyuioaуеыаоэёяию]$/.test(char.toLowerCase());
}
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isLetter(char) {
    return /[a-zA-ZА-Яа-яёЁ]$/.test(char);
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
 * @export
 * @param {string} token
 * @param {number} index
 * @param {Objec} dictionary
 * @returns {number}
 */
export function isAccented(token, index, dictionary) {
    let lowerCased = token.toLowerCase();

    return dictionary[lowerCased]
        ? dictionary[lowerCased].accents[index].type
        : 0;
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
/**
 *
 *
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
    const orderStrings = fieldStrings.map((string, index) => {
        interator += index;

        let idString = `s${index}${randomize()}`;

        let vowel = [];

        let soundGramma = [];

        let rhythmPreset = 0;

        let words = [];

        let tokens = string
            .split(/(\s|[a-zA-ZА-Яа-яёЁ-]+|[\.,\/#!$%\^&\*;:{}=\-_`~()⋀])/)
            .filter((n) => n);

        let order = [];

        let stringIndex = 0;

        /* Слово */
        tokens.forEach((token, index) => {
            let type = 't';

            let idToken = `t${index}${randomize()}`;

            let accent = 0;

            let accents = [];

            let orderToken = [];

            let hashTokenId = '';

            if (isLetter(token)) {
                idToken = `w${index}${randomize()}`;

                type = 'w';

                /* Буквы */
                orderToken = [...token].map((char, index, array) => {
                    hashTokenId = hashFunction(char, ++interator);

                    const isLast = index === array.length - 1;

                    let idSymbol = `c${index}${randomize()}`;

                    let type = 'c';

                    accent = 0;

                    if (isVowel(char)) {
                        idSymbol = `v${index}${randomize()}`;

                        type = 'v';

                        if (stringsDictionary) {
                            accent =
                                isAccented(
                                    string,
                                    stringIndex,
                                    stringsDictionary
                                ) || isAccented(token, index, wordsDictionary);
                        }

                        const idVowel = `${idString}${idToken}${idSymbol}`;

                        vowel.push(idVowel);

                        if (accent !== 3) {
                            soundGramma.push(idVowel);
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
                        idSymbol
                    };

                    order.push(idSymbol);

                    ++stringIndex;

                    return idSymbol;
                });

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

                if (isSpace(token)) {
                    type = 'sp';

                    idToken = `sp${index}${randomize()}`;
                }

                if (isPause(token)) {
                    type = 'p';

                    idToken = `p${index}${randomize()}`;

                    soundGramma.push(idToken);
                }

                idToken = `${idString}${idToken}`;

                elements[idToken] = {
                    type,
                    char: token,
                    id: idToken,
                    idString,
                    hashTokenId
                };

                hashTable[hashTokenId] = {
                    idToken
                };

                order.push(idToken);

                ++stringIndex;
            }
        });

        stringLinks = makeListLinks(string, idString, stringLinks);

        rhythmPreset = rhythmDetection(soundGramma, elements);

        strings[idString] = {
            order,
            string,
            words,
            vowel,
            soundGramma,
            rhythmPreset,
            id: idString
        };

        return idString;
    });

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

    const symbolsSet = stringNodes.map((string) => {
        const symbols = [...string.children];

        strings[string.id].tag = {
            left: string.offsetLeft,
            top: string.offsetTop,
            height: string.offsetHeight,
            width: string.offsetWidth
        };

        return symbols;
    });

    symbolsSet.forEach((set) => {
        symbols = [...symbols, ...set];
    });

    if (symbols.length) {
        symbols.forEach((symbol) => {
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
        });
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
    stringLink.forEach((idString) => {
        if (strings[idString]) {
            let idElement = strings[idString].order[element.stringIndex];

            if (element.id !== idElement) {
                elements[idElement].accent = elements[element.id].accent;

                stringLinksTriggered = true;
            }
        }
    });

    return elements;
}

function updateWordsDictionary(idWord, wordsDictionary, elements) {
    const word = elements[idWord];
    const wordLowerCased = word.token.toLowerCase();

    const wordAccents = word.orderToken.map((id) => {
        return {
            type: elements[id].accent
        };
    });

    wordsDictionary[wordLowerCased] = {
        accents: wordAccents
    };
    return wordsDictionary;
}

function updateStringsDictionary(string, stringsDictionary, elements) {
    const stringLowerCased = string.string.toLowerCase();

    const stringAccents = string.order.map((id) => {
        return {
            type: elements[id].accent
        };
    });

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
    if (accent === 0 && indexSoundGramma === -1) {
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

    /* Работа с ударением */

    elements[signId].accent = Number.isInteger(accent)
        ? accent
        : wordAccent(elementAccent);

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

export const structure = {
    strings: {},
    orderStrings: [],
    elements: {},
    tags: [],
    hashTable: {},
    stringLinks: {},
    wordLinks: {}
};
