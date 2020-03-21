export default function scrollToAnchor() {
    const urlHash = window.decodeURIComponent(window.location.hash);
    const hashParts = urlHash.split('#');

    if (hashParts.length > 1) {
        const hash = hashParts.slice(-1)[0];
        document.querySelector(`#${hash}`).scrollIntoView();
    }
}
