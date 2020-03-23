/**
 *
 *
 * @export
 * @param {RegExp} rule
 * @param {string} char
 * @returns {number}
 */
export default function isAccentedByRegExp(rule, char) {
    const regExp = new RegExp(rule);
    return regExp.test(char) ? 1 : 0;
}
