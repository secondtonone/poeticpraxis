export default function isAccentedByRegExp(rule: string, char: string): number {
  const regExp = new RegExp(rule);
  return regExp.test(char) ? 1 : 0;
}
