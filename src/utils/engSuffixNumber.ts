export default function engSuffixNumber(num: number): string | null {
  const last: number = num % 100;
  const suffixes = [null, 'st', 'nd', 'rd'];
  return suffixes[last] ? suffixes[last] : 'th';
}
