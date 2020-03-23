/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export default function isPause(char) {
    return /⋀/g.test(char);
}
