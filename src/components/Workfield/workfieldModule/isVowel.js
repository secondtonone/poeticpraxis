import vowelsList from './vowelsList';
/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export default function isVowel(char) {
    const vowels = new RegExp(`^[${vowelsList}]$`);
    return vowels.test(char.toLowerCase());
}
