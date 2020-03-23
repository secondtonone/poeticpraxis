/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export default function isSpace(char) {
    return /\s/g.test(char);
}
