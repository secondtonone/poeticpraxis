import { copying } from './copying';
import { isTouchDevice } from '../utils';

export function getLongLink(string) {
    return encodeURI(
        `https://${location.host}${location.pathname}?shared=${string}`
    );
}

export function sharing(link) {
    if (navigator.share && isTouchDevice()) {
        navigator.share({
            title: 'Poetic Praxis',
            text: link
        });
    } else {
        copying(link);
    }
}

export function encodeDictionary({ text, stringsDictionary }) {
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

export function decodeDictionary(text, dictionary) {
    const stringsMap = dictionary.split('|');

    const strings = text.split('\n');

    const stringsDictionary = {};

    stringsMap.forEach((map, index) => {
        if(map) {
            const string = strings[index].toLowerCase();

            stringsDictionary[string] = {
                accents: map.split('').map((accent) => {
                    return {
                        type: parseInt(accent)
                    };
                })
            };
        }
        
    });

    return stringsDictionary;
}

export function linkToStateDecode(shared, onSuccess, onError) {
    if (!shared) {
        return;
    }
    try {
        shared = JSON.parse(shared);

        const text = shared[0] || '';
        let stringsDictionary = shared[1] || {};

        stringsDictionary = decodeDictionary(text, stringsDictionary);

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
