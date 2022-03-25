import { copying } from './copying';
import isTouchDevice from '@utils/isTouchDevice';
import { IDictionary } from '@modules/workfield/dictionary';
import { AccentTypes } from '@modules/workfield/accents';

export function getLongLink(string: string) {
  return encodeURI(
    `https://${location.host}${location.pathname}?shared=${string}`
  );
}

export function sharing(link: string) {
  if (navigator.share && isTouchDevice()) {
    navigator.share({
      title: 'Poetic Praxis',
      text: link
    });
  } else {
    copying(link);
  }
}

export function encodeDictionary({ text, stringsDictionary }: { text: string, stringsDictionary: IDictionary }) {
  const strings = text.split('\n');

  return strings
    .map((string) => {
      if (stringsDictionary[string.toLowerCase()]) {
        const mapAccent = stringsDictionary[string.toLowerCase()].accents;

        return mapAccent.map((accent) => accent.type).join('');
      }

      return '';
            
    })
    .join('|');
}

export function decodeDictionary(text: string, dictionary: string) {
  const stringsMap = dictionary.split('|');

  const strings = text.split('\n');

  const stringsDictionary: IDictionary = {};

  stringsMap.forEach((map, index) => {
    if(map) {
      const string = strings[index].toLowerCase();

      stringsDictionary[string] = {
        accents: map.split('').map((accent) => {
          return {
            type: parseInt(accent) as AccentTypes
          };
        })
      };
    }
        
  });

  return stringsDictionary;
}

export function linkToStateDecode(shared: string | null, onSuccess: (props: { text: string, stringsDictionary: IDictionary }) => void, onError: () => void) {
  if (!shared) {
    return;
  }
  try {
    const parsed: [text?: string, dictionary?: string] = JSON.parse(shared);

    const text = parsed[0] || '';
    const stringsDictionaryString = parsed[1] || '';

    const stringsDictionary = decodeDictionary(text,stringsDictionaryString);

    if (text && onSuccess) {
      onSuccess({
        text,
        stringsDictionary
      });
    }
  } catch (error) {
    if (onError) {
      onError();
    }
  }
}
