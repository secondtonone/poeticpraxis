/**
 *
 * @param {string} token
 * @param {{[word: string]: any} | {}} dictionary
 * @returns {boolean}
 */
export default function isInDictionary(token, dictionary = {}) {
    let lowerCased = token.toLowerCase();

    return dictionary[lowerCased];
}
