export default function isBreakLine(char: string): boolean {
    return /\n/g.test(char);
}
