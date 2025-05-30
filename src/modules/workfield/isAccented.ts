import isInDictionary from './isInDictionary';
import type { IDictionary } from './dictionary';
import type { AccentTypes } from './accents';

export default function isAccented(
  token: string,
  index: number,
  dictionary: IDictionary = {}
): AccentTypes {
  const element = isInDictionary(token, dictionary);

  return element /* && element.accents[index] */
    ? element.accents[index].type
    : 0;
}
