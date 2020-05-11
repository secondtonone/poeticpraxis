export default function isSpace(char: string): boolean {
    return /\s/g.test(char);
}
