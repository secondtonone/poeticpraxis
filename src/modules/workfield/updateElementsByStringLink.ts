import type { IElements, IStrings, IdString, ILetterElement } from './structure';

export default function updateElementsByStringLink({
  elements,
  element,
  stringLink,
  strings,
}: {
    elements: IElements;
    element: ILetterElement;
    stringLink: IdString[];
    strings: IStrings;
}) {
  const stringLinkLength: number = stringLink.length;

  for (let i = 0; i < stringLinkLength; i++) {
    const idString: IdString = stringLink[i];

    if (strings[idString]) {
      const idElement = strings[idString].order[element.stringIndex];

      if (element.id !== idElement) {
        elements[idElement].accent = elements[element.id].accent;
      }
    }
  }

  return elements;
}
