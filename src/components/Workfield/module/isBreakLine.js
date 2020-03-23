/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export default function isBreakLine(char) {
    return /\n/g.test(char);
}
