import imaged from './imaged';
import analyticsInit from './analytics';
import {
    isBreakLine,
    isLetter,
    isPause,
    isSpace,
    isVowel,
    isAccented,
    makeListLinks
} from './rhythmic';

export function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
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
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

export { imaged };
export { analyticsInit };
export {
    isBreakLine,
    isLetter,
    isPause,
    isSpace,
    isVowel,
    isAccented,
    makeListLinks
};
