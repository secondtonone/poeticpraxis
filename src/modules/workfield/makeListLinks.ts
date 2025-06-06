import type { IWordLinks, IStringLinks } from '@modules/workfield/structure';

export default function makeListLinks<T extends IWordLinks | IStringLinks>(
  token: string,
  idToken: string,
  list: T
) {
  const lowerCased = token.toLowerCase();

  let links = list[lowerCased] || [];

  links = [...links, idToken];

  list[lowerCased] = [...new Set(links)];

  return list;
}
