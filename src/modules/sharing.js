import { copying } from './copying';

const proxy = 'https://cors-escape.herokuapp.com';
const service = 'https://clck.ru/--';

export function getLongLink(string) {
    return encodeURI(`https://${location.host}${location.pathname}?shared=${string}`);
}

export async function getShortLink(string) {
    const link = getLongLink(string);

    const result = await fetch(`${proxy}/${service}?url=${link}`);

    return await result.text();
}

export function sharing(link) {
    if (navigator.share) {
        navigator.share({
            title: 'Poetic Praxis',
            text: link
        });
    } else {
        copying(link);
    }
}
