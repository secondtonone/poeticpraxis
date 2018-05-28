/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isVowel(char) {
    return /^[eyuioaуеыаоэёяию]$/.test(char.toLowerCase());
}
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isLetter(char) {
    return /[a-zA-ZА-Яа-яёЁ]$/.test(char);
}
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isBreakLine(char) {
    return /\n/g.test(char);
}
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isSpace(char) {
    return /\s/g.test(char);
}
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export function isPause(char) {
    return /⋀/g.test(char);
}
/**
 *
 * @export
 * @param {string} token
 * @param {number} index
 * @param {Objec} dictionary
 * @returns {number}
 */
export function isAccented(token, index, dictionary) {
    let lowerCased = token.toLowerCase();

    return dictionary[lowerCased]
        ? dictionary[lowerCased].accents[index].type
        : 0;
}
/**
 * 
 * 
 * @export
 * @param {string} token 
 * @param {string} idToken 
 * @param {Object} list 
 * @returns {Object}
 */
export function makeListLinks(token, idToken, list) {
    let lowerCased = token.toLowerCase();

    let links = list[lowerCased] || [];

    links = [...links, idToken];

    list[lowerCased] = [...new Set(links)];

    return list;
};
