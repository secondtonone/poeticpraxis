export default function isTouchDevice() {
    return 'ontouchstart' in window.document.documentElement;
}
