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
