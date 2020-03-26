export default function engSuffixNumber(num) {
    const last = num % 100;
    const suffixes = [null,'st','nd','rd'];
    return suffixes[last] ? suffixes[last] : 'th';
}
