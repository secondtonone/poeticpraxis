export default function engSuffixNumber(num: number): string {
    const last: number = num % 100;
    const suffixes: string[] = [null, 'st', 'nd', 'rd'];
    return suffixes[last] ? suffixes[last] : 'th';
}
