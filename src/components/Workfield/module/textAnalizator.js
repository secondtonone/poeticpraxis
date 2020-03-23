import randomize from '@utils/randomize';
import hashFunction from '@utils/hashFunction';

import meterDetection from './meterDetection';
import isLetter from './isLetter';
import isSpace from './isSpace';
import isPause from './isPause';
import isInDictionary from './isInDictionary';
import isAccented from './isAccented';
import isAccentedByRegExp from './isAccentedByRegExp';
import isAccentedByPosition from './isAccentedByPosition';
import makeListLinks from './makeListLinks';
import stringOnSteps from './stringOnSteps';
import rhythmDetection from './rhythmDetection';

/**
 * @export
 * @param {string} text
 * @param {Object} stringsDictionary
 * @param {Object} wordsDictionary
 * @returns {Object}
 */
export default function textAnalizator(text, stringsDictionary, wordsDictionary) {
    const fieldStrings = text.split('\n');

    let strings = {};

    let elements = {};

    let hashTable = {};

    let interator = 0;

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

        interator += index;

        let idString = `s${index}${randomize()}`;

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

                let prev = null;

                let next = null;

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

        totalStringAccents = soundGramma.filter(
            (idElemet) =>
                elements[idElemet].accent === 1 ||
                elements[idElemet].accent === 2
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
