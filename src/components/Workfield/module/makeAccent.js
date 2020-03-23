import wordAccent from './wordAccent';
import updateElementsByStringLink from './updateElementsByStringLink';
import updateWordsDictionary from './updateWordsDictionary';
import updateStringsDictionary from './updateStringsDictionary';
import makeSoundGramma from './makeSoundGramma';
import meterDetection from './meterDetection';
import stringOnSteps from './stringOnSteps';
import rhythmDetection from './rhythmDetection';

export default function makeAccent({
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

    const meterDetect = meterDetection();

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
        elements[signId].accent
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

    /* Определение метра */

    strings[idString].steps = stringOnSteps(
        strings[idString].soundGramma,
        strings[idString].totalStringAccents.length,
        elements
    );

    strings[idString].rhythmPreset = rhythmDetection(
        strings[idString].steps,
        elements
    );

    strings[idString].mainMeter = meterDetect(strings[idString].rhythmPreset);

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
