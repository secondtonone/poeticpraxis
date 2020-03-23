import isInDictionary from './isInDictionary';
/**
 *
 * @export
 * @param {string} token
 * @param {number} index
 * @param {{[word: string]: any}} dictionary
 * @returns {number}
 */
export default function isAccented(token, index, dictionary = {}) {
    let element = isInDictionary(token, dictionary);

    return element /* && element.accents[index] */
        ? element.accents[index].type
        : 0;
}
