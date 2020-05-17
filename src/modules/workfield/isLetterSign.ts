export default function isLetterSign(char: string): boolean {
    return /[ьЬъЪ]/.test(
        char
    );
}
