import { IDictionary, DictionaryAccents } from './dictionary';

export default function isInDictionary(token: string, dictionary: IDictionary = {}): DictionaryAccents {
    let lowerCased = token.toLowerCase();

    return dictionary[lowerCased];
}
