import wordAccent from './wordAccent';
import updateElementsByStringLink from './updateElementsByStringLink';
import updateWordsDictionary from './updateWordsDictionary';
import updateStringsDictionary from './updateStringsDictionary';
import makeSoundGramma from './makeSoundGramma';
import meterDetection from './meterDetection';
import stringOnSteps from './stringOnSteps';
import rhythmDetection from './rhythmDetection';
import { IStructure, IVLetterElement, IWordElement } from './structure';
import { IDictionary } from './dictionary';
import { AccentTypes } from './accents';

interface MakeAccentProps extends Pick<IStructure, 'elements' | 'strings' | 'stringLinks'> {
    wordsDictionary: IDictionary
    stringsDictionary: IDictionary
    accent: AccentTypes
    signId: string
}

export default function makeAccent({
    signId,
    elements,
    strings,
    stringLinks,
    /* wordLinks, */
    wordsDictionary,
    stringsDictionary,
    accent
}: MakeAccentProps) {
    let clonedElements = Object.assign({}, elements);
    let clonedStrings = Object.assign({}, strings);
    let clonedWordsDictionary = Object.assign({}, wordsDictionary);
    let clonedStringsDictionary = Object.assign({}, stringsDictionary);

    const element = clonedElements[signId] as IVLetterElement;

    const idString = element.idString;

    // const meterDetect = meterDetection();

    const idWord = `${idString}${element.idToken}`;

    //let stringLinksTriggered = false;

    let string = clonedStrings[idString];

    const stringLowerCased = string.string.toLowerCase();

    const elementAccent = element.accent;

    /* Удаление ударения */

    if ((clonedElements[idWord] as IWordElement).accents && (clonedElements[idWord] as IWordElement).accents[0]) {
        //const element = clonedElements[idWord].accents[0];

        //clonedElements[element].accent = 0;

        (clonedElements[idWord] as IWordElement).accents = [];
    }

    /* Работа с ударением */

    clonedElements[signId].accent = Number.isInteger(accent)
        ? accent
        : wordAccent(elementAccent);

    if (clonedElements[signId].accent === 1) {
        (clonedElements[idWord] as IWordElement).accents.push(signId);
    }

    /* Работа со словом */

    clonedWordsDictionary = updateWordsDictionary(idWord, clonedWordsDictionary, clonedElements);

    /* Работа со строкой */

    clonedStringsDictionary = updateStringsDictionary(
        string,
        clonedStringsDictionary,
        clonedElements
    );

    /* Работа с нотой */

    clonedStrings[idString].soundGramma = makeSoundGramma(
        signId,
        string,
        clonedElements[signId].accent
    );

    /* Работа с количеством ударений */

    clonedStrings[idString].totalStringAccents = clonedStrings[idString].soundGramma.filter(
        (idElement) =>
            clonedElements[idElement].accent === 1 || clonedElements[idElement].accent === 2
    );

    /* баги*/

    if (stringLinks[stringLowerCased]) {
        const stringLink = stringLinks[stringLowerCased];

        clonedElements = updateElementsByStringLink({
            elements: clonedElements,
            element,
            stringLink,
            strings: clonedStrings,
        });
    }

    /* Определение метра */

    clonedStrings[idString].steps = stringOnSteps(
        clonedStrings[idString].soundGramma,
        clonedStrings[idString].totalStringAccents.length,
        clonedElements
    );

    clonedStrings[idString].rhythmPreset = rhythmDetection(
        clonedStrings[idString].steps,
        clonedElements
    );

    /* clonedStrings[idString].mainMeter = meterDetect(clonedStrings[idString].rhythmPreset); */

    /* if(!stringLinksTriggered && wordLinks[wordLowerCased]) {
            wordLinks[wordLowerCased].forEach( idWord => {

                if(clonedElements[idWord]) {

                    let idElement = clonedElements[idWord].orderToken[element.index];

                    if(element.id != idElement) {
                        clonedElements[idElement].accent = clonedElements[element.id].accent;
                    }

                }
            });
        }*/

    return {
        elements: clonedElements,
        strings: clonedStrings,
        wordsDictionary: clonedWordsDictionary,
        stringsDictionary: clonedStringsDictionary,
    };
}

export type MakeAccentResult = ReturnType<typeof makeAccent>;
