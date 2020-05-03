export default function isTouchDevice():boolean {
    return 'ontouchstart' in window.document.documentElement;
}
