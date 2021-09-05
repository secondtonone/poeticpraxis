import { AccentTypes } from './accents';
import { IDictionary } from './dictionary';
import { IElements, IWordElement } from './structure';

export default function updateWordsDictionary(idWord: string, wordsDictionary: IDictionary, elements: IElements) {
    const word = elements[idWord] as IWordElement;
    const wordLowerCased = word.token.toLowerCase();

    let wordAccents: {
        type: AccentTypes
    }[] = [];

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
