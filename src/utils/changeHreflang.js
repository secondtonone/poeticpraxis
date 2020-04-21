const langs = ['ru', 'en', 'x-default'];
export default function changeHreflang(page = '') {
    for (const lang of langs) {
        document.querySelector(
            `link[hreflang=${lang}]`
        ).href = `https://www.poeticpraxis.ru/${page}?lang=${
            lang === 'x-default' ? 'en' : lang
        }`;
    }
}
