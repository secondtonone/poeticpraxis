/**
 *
 *
 * @export
 * @param {string} char
 * @returns {boolean}
 */
export default function isLetter(char) {
    return /[a-zA-ZА-Яа-яёäöüéàèùâêîôûïüÿìíòóúęąєўЁÄÖÜÉÀÈÙÂÊÎÔÛÏÜŸÌÍÒÓÚĘĄЄЎ]$/.test(
        char
    );
}
