export default function maxMatchMedia(value) {
    return window.matchMedia(`(max-width: ${value}px)`).matches;
}
