import { IDictionary, DictionaryAccents } from './dictionary';

export default function isInDictionary(token: string, dictionary: IDictionary = {}): DictionaryAccents {
  const lowerCased = token.toLowerCase();

  return dictionary[lowerCased];
}
