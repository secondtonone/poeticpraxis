export default function maxMatchMedia(value: string | number): boolean {
  return window.matchMedia(`(max-width: ${value}px)`).matches;
}
