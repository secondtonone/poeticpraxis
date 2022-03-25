const langs: string[] = ['ru', 'en', 'x-default'];

export default function changeHreflang(page = ''): void {
  for (const lang of langs) {
    const tag = document.querySelector(`link[hreflang=${lang}]`) as HTMLAnchorElement;
    tag.href = `https://www.poeticpraxis.ru/${page}?lang=${
      lang === 'x-default' ? 'en' : lang
    }`;
  }
}
