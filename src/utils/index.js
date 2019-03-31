export function isTouchDevice() {
    return 'ontouchstart' in window.document.documentElement;
}

export function isDaytime() {
    const hours = new Date().getHours();
    return hours > 6 && hours < 23;
}

export function userLang() {
    return window.navigator.language || window.navigator.userLanguage || 'ru';
}

export function hashFunction(char, order) {
    let hash = order;
    let chr;

    for (let i = 0; i < char.length; i++) {
        chr = char.charCodeAt(i);
        hash = (hash << 5) - hash + order + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}

export function randomize() {
    let length = 4;
    let chars = '0123456789';
    let result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

export function fontReady(cb) {
    if (document.fonts.ready) {
        document.fonts.ready.then(cb);
    } else {
        setTimeout(cb, 150);
    }
}

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ]
        : null;
}

export function delay(fn, ms = 0) {
    return setTimeout(fn, ms);
}

export function scrollToAnchor() {
    const urlHash = window.decodeURIComponent(window.location.hash);
    const hashParts = urlHash.split('#');

    if (hashParts.length > 1) {
        const hash = hashParts.slice(-1)[0];
        document.querySelector(`#${hash}`).scrollIntoView();
    }
}
