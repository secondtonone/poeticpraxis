export default function updateWordsDictionary(idWord, wordsDictionary, elements) {
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
