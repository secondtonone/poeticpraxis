export default function isLetter(char: string): boolean {
    return /[a-zA-ZА-Яа-яёäöüéàèùâêîôûïüÿìíòóúęąєўЁÄÖÜÉÀÈÙÂÊÎÔÛÏÜŸÌÍÒÓÚĘĄЄЎ]$/.test(
        char
    );
}
