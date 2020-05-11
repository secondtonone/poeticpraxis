export default function isLetterSign(char: string): boolean {
    return /[ьЬ]/.test(
        char
    );
}
