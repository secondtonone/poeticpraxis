import vowelsList from './vowelsList';
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export default function vowelCount(word) {
    const vowels = new RegExp(`[${vowelsList}]`, 'gi');
    const result = word.match(vowels);
    return result === null ? 0 : result.length;
}
