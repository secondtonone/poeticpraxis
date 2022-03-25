export default function isPause(char: string): boolean {
  return /⋀/g.test(char);
}
