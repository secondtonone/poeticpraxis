import type { IString, IElements } from './structure';
import type { IDictionary } from './dictionary';
import type { AccentTypes } from './accents';

export default function updateStringsDictionary(string: IString, stringsDictionary: IDictionary, elements: IElements) {
  const stringLowerCased = string.string.toLowerCase();

  const stringAccents: {
        type: AccentTypes
    }[] = [];

  const stringOrderLength = string.order.length;

  for (let i = 0; i < stringOrderLength; i++) {
    const id = string.order[i];

    stringAccents.push({
      type: elements[id].accent
    });
  }

  stringsDictionary[stringLowerCased] = {
    accents: stringAccents
  };

  return stringsDictionary;
}
