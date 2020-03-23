export default function updateStringsDictionary(string, stringsDictionary, elements) {
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
