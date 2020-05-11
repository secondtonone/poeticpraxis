import randomize from '@utils/randomize';
import hashFunction from '@utils/hashFunction';

import meterDetection from './meterDetection';
import isLetter from './isLetter';
import isSpace from './isSpace';
import isPause from './isPause';
import isVowel from './isVowel';
import isInDictionary from './isInDictionary';
import isAccented from './isAccented';
import isAccentedByPosition from './isAccentedByPosition';
import makeListLinks from './makeListLinks';
import stringOnSteps from './stringOnSteps';
import rhythmDetection from './rhythmDetection';
import getAccentedPosition from './getAccentedPosition';
import isConsonantSolid from './isConsonantSolid';
import isSoftSign from './isSoftSign';

/**
 * @export
 * @param {string} text
 * @param {Object} stringsDictionary
 * @param {Object} wordsDictionary
 * @returns {Object}
 */
export default function textAnalyzer(text, stringsDictionary, wordsDictionary) {
    const fieldStrings = text.split('\n');
    
    let strings = {};

    let elements = {};

    let hashTable = {};

    let iterator = 0;

    let wordsCount = 0;

    const meterDetect = meterDetection();

    let mainMeter = null;

    let wordLinks = {};

    let stringLinks = {};

    /* Строка */
    let orderStrings = [];

    const fieldStringsLength = fieldStrings.length;

    for (let index = 0; index < fieldStringsLength; index++) {
        const string = fieldStrings[index];

        iterator++;

        /* let idString = `s${index}${randomize(() =>
            hashFunction(string, ++iterator)
        )}`;  */
        let idString = `s${iterator}`;

        let vowel = [];

        let soundGramma = [];

        let steps = [];

        let rhythmPreset = 0;

        let totalStringAccents = [];

        let words = [];

        let tokens = string
            .split(/(\s|[a-zA-ZА-Яа-яёЁ-]+|[\.,\/#!$%\^&\*;:{}=\-_`~()⋀])/)
            .filter((n) => n);

        let order = [];

        let stringIndex = 0;
        /* Символьная последовательность */
        const tokensLength = tokens.length;

        for (let index = 0; index < tokensLength; index++) {
            const token = tokens[index];

            let type = 't';

            let idToken = `t${index}${randomize(() =>
                hashFunction(token, ++iterator)
            )}`;

            let accent = 0;

            let accents = [];

            let hashTokenId = '';
            /* слово */
            if (isLetter(token)) {
                idToken = `w${index}${randomize(() =>
                    hashFunction(token, ++iterator)
                )}`;

                let vowelCounter = 0;

                type = 'w';

                let prev = null;

                let next = null;

                const [accentedIndex] = getAccentedPosition(token);

                /* Буквы */
                const letters = [...token];

                const lettersLength = letters.length;

                let orderToken = [];

                for (let index = 0; index < lettersLength; index++) {
                    const char = letters[index];

                    const array = letters;

                    hashTokenId = hashFunction(char, ++iterator);

                    const isLast = index === array.length - 1;

                    let idSymbol = '';

                    let type = 'c';

                    let isSolid = null;

                    accent = 0;

                    if (isVowel(char)) {
                        idSymbol = `v${index}${randomize(() =>
                            hashFunction(char, ++iterator)
                        )}`;

                        type = 'v';

                        //++vowelCounter;

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
                                accentedIndex === -1
                                    ? isAccentedByPosition(token, ++vowelCounter)
                                    : accentedIndex === index
                                    ? 1
                                    : 0;
                                    /*isAccentedByRegExp('[ёЁ]', char) ||
                                isAccentedByPosition(token, vowelCounter); */
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

                        if (
                            elements[prev] &&
                            elements[prev].type === 'c' &&
                            !elements[prev].isSolid
                        ) {
                            elements[prev].isSolid = isConsonantSolid(char);
                        }
                    } else {
                        idSymbol = `c${index}${randomize(() =>
                            hashFunction(char, ++iterator)
                        )}`;

                        isSolid = isConsonantSolid(char);
                        
                        if (isSoftSign(char) &&
                            elements[prev] &&
                            elements[prev].type === 'c'
                        ) {
                            elements[prev].isSolid = false;
                        }
                    }

                    idSymbol = `${idString}${idToken}${idSymbol}`;

                    if (prev) {
                        elements[prev].next = idSymbol;
                    }

                    elements[idSymbol] = {
                        isLast,
                        prev,
                        next,
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

                    if(type === 'c') {
                        elements[idSymbol].isSolid = isSolid;
                    }

                    prev = idSymbol;

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

                ++wordsCount;
            } else {
                hashTokenId = hashFunction(token, ++iterator);

                idToken = `${idString}${idToken}`;

                if (isSpace(token)) {
                    type = 'sp';

                    idToken = `${idString}${type}${index}${randomize(() =>
                        hashFunction(token, ++iterator)
                    )}`;
                }

                if (isPause(token)) {
                    type = 'p';

                    idToken = `${idString}${type}${index}${randomize(() =>
                        hashFunction(token, ++iterator)
                    )}`;

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

        totalStringAccents = soundGramma.filter(
            (idElement) =>
                elements[idElement].accent === 1 ||
                elements[idElement].accent === 2
        );

        steps = stringOnSteps(soundGramma, totalStringAccents.length, elements);

        rhythmPreset = rhythmDetection(steps, elements);

        mainMeter = meterDetect(rhythmPreset);

        strings[idString] = {
            order,
            string,
            words,
            vowel,
            totalStringAccents,
            soundGramma,
            steps,
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
        stringLinks,
        wordsCount,
        mainMeter
    };
}
