export function isVowel(char: string) {
  return /^[eyuioaуеыаоэёяию]$/.test(char.toLowerCase());
}

export function isLetter(char: string) {
  return /[a-zA-ZА-Яа-яёЁ]$/.test(char);
}

export function isBreakLine(char: string) {
  return /\n/g.test(char);
}

export function isSpace(char: string) {
  return /\s/g.test(char);
}
