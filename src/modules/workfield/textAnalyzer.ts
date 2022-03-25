import randomize from '@utils/randomize';
import hashFunction from '@utils/hashFunction';

import { IDictionary } from '@modules/workfield/dictionary';
import { IStrings, IElements, IHashTable, IWordLinks, IStringLinks, OrderStrings, MainMeter, IString, IWordElement, ICLetterElement, ILetterElement, Type, IPauseElement, ISymbolElement } from '@modules/workfield/structure';

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
import isLetterSign from './isLetterSign';
import isConsonantVoiced from './isConsonantVoiced';
import isConsonantNoisy from './isConsonantNoisy';
import { AccentTypes } from './accents';

export default function textAnalyzer(text: string, stringsDictionary: IDictionary, wordsDictionary: IDictionary) {
  const fieldStrings = text.split('\n');
    
  const strings: IStrings = {};

  const elements: IElements = {};

  const hashTable: IHashTable = {};

  let iterator = 0;

  let wordsCount = 0;

  const meterDetect = meterDetection();

  let mainMeter = {} as MainMeter;

  let wordLinks: IWordLinks = {};

  let stringLinks: IStringLinks = {};

  /* Строка */
  const orderStrings: OrderStrings = [];

  const fieldStringsLength = fieldStrings.length;

  for (let index = 0; index < fieldStringsLength; index++) {
    const string = fieldStrings[index];

    iterator++;

    /* let idString = `s${index}${randomize(() =>
            hashFunction(string, ++iterator)
        )}`;  */
    const idString = `s${iterator}`;

    const vowel: IString['vowel'] = [];

    const soundGramma: IString['soundGramma'] = [];

    let steps: IString['steps'] = [];

    let rhythmPreset = 0;

    let totalStringAccents: IString['totalStringAccents'] = [];

    const words: IString['words'] = [];

    const tokens = string
      .split(/(\s|[a-zA-ZА-Яа-яёЁ-]+|[.,/#!$%^&*;:{}=\-_`~()⋀])/)
      .filter((n) => n);

    const order: OrderStrings = [];

    let stringIndex = 0;
    /* Символьная последовательность */
    const tokensLength = tokens.length;

    for (let index = 0; index < tokensLength; index++) {
      const token = tokens[index];

      let type: Type = 't';

      let idToken = `t${index}${randomize(() =>
        hashFunction(token, ++iterator)
      )}`;

      let accent: AccentTypes = 0;

      const accents: IWordElement['accents'] = [];

      let hashTokenId = 0;
      /* слово */
      if (isLetter(token)) {
        idToken = `w${index}${randomize(() =>
          hashFunction(token, ++iterator)
        )}`;

        let vowelCounter = 0;

        type = 'w';

        let prev: null | string = null;

        const next: null | string = null;

        const [accentedIndex] = getAccentedPosition(token);

        /* Буквы */
        // const letters = [...token];
        const letters = token.split('');

        const lettersLength = letters.length;

        const orderToken = [];

        for (let index = 0; index < lettersLength; index++) {
          const char = letters[index];

          const array = letters;

          hashTokenId = hashFunction(char, ++iterator);

          const isLast = index === array.length - 1;

          let idSymbol = '';

          let type: Type = 'c';

          let isSolid = false;

          let isVoiced = false;

          let isNoisy = false;

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
              prev &&
                            elements[prev] &&
                            elements[prev].type === 'c' &&
                            !(elements[prev] as ICLetterElement).isSolid
            ) {
              (elements[prev] as ICLetterElement).isSolid = isConsonantSolid(char, (elements[prev] as ICLetterElement).char);
            }
          } else {
            idSymbol = `c${index}${randomize(() =>
              hashFunction(char, ++iterator)
            )}`;

            isSolid = isConsonantSolid('',char);
            isVoiced = isConsonantVoiced(char);
            isNoisy = isConsonantNoisy(char);
                        
            if (
              prev &&
                            elements[prev] &&
                            elements[prev].type === 'c'
            ) {
              (elements[prev] as ICLetterElement).isSolid = isLetterSign(char) ? false : true;
            }
          }

          idSymbol = `${idString}${idToken}${idSymbol}`;

          if (prev) {
            (elements[prev] as ILetterElement).next = idSymbol;
          }

          (elements[idSymbol] as ILetterElement) = {
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
            (elements[idSymbol]  as ICLetterElement).isSolid = isSolid;
            (elements[idSymbol] as ICLetterElement).isNoisy = isNoisy;
            (elements[idSymbol] as ICLetterElement).isVoiced = isVoiced;
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

        (elements[idToken] as IWordElement) = {
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

        (elements[idToken] as IPauseElement | ISymbolElement) = {
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

export type TextAnalyzerResult = ReturnType<typeof textAnalyzer>;
