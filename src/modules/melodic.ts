import { Tone } from './tone';
import {
    IElements,
    IStrings,
    IStructure,
    IVLetterElement,
    IdString,
    IdVowel,
} from '@modules/workfield/structure';

interface ILetterNote {
    tone: number;
    reduced: number[];
    main: number[];
}

interface IMapLetterNote {
    [key: string]: ILetterNote;
}

const mapLetterNote: IMapLetterNote = {
    а: { tone: 80, reduced: [660], main: [755, 1360, 2500] }, 
    е: { tone: 80, reduced: [385], main: [465, 2025, 2700] }, 
    у: { tone: 80, reduced: [300], main: [305, 975, 2715] }, 
    и: { tone: 80, reduced: [355], main: [290, 2190, 2865] }, 
    о: { tone: 80, reduced: [375], main: [480, 825, 2495] }, 
    ы: { tone: 80, reduced: [360], main: [285, 1655, 2465] }, 
    э: { tone: 80, reduced: [415], main: [465, 1750, 2450] }, 
    ё: { tone: 80, reduced: [375], main: [390, 1200, 1940] }, 
    ю: { tone: 80, reduced: [300], main: [300, 800, 1975] }, 
    я: { tone: 80, reduced: [690], main: [780, 1490, 2400] }, 
    a: { tone: 80, reduced: [660], main: [755, 1360, 2500] },
    u: { tone: 80, reduced: [300], main: [305, 975, 2715] },
    i: { tone: 80, reduced: [690], main: [780, 1490, 2400] },
    y: { tone: 80, reduced: [660], main: [755, 1360, 2500] },
    e: { tone: 80, reduced: [355], main: [290, 2190, 2865] },
    o: { tone: 80, reduced: [375], main: [480, 825, 2495] },
};
/* длительность двух строк - 3.5
 *  в строках 15 гласных на одну 0.23с = 230мс
 *  120 бпм 1/4 ноты в минуту
 */
const stepSoundMultiply = (
    step: string[],
    elements: IElements
): Array<{ tokenId: string; sound: 2 | 0 }> => {
    return step.map((tokenId) => {
        return {
            tokenId,
            sound: elements[tokenId].accent === 1 ? 2 : 0,
        };
    });
};

const getNote = (elements: IElements, vowel: IVLetterElement): number[] => {
    const isAccented: boolean = vowel.accent === 1;
    const char: string = vowel.char.toLowerCase();

    const notes: ILetterNote['main'] | ILetterNote['reduced'] = isAccented
        ? mapLetterNote[char].main
        : mapLetterNote[char].reduced;

    return notes;
};

const makeLetterGramma = ({
    notesCount,
    strings,
    elements,
    orderStrings,
}: {
    notesCount: number;
    strings: IStrings;
    elements: IElements;
    orderStrings: IStructure['orderStrings'];
}): {
    music: {
        string: IdString;
        isAccented: boolean;
        char: string;
        time: number;
        sound?: 0 | 2;
        vowelNotes: {
            note: number;
            duration: number;
            notation: string;
        }[];
        index: number;
    }[];
    time: number;
} => {
    let music = [];

    let time: number = 0;

    let index: number = 0;

    orderStrings.forEach((stringId: string) => {
        let soundGramma: { tokenId: string; sound?: 0 | 2 }[] = [];

        strings[stringId].steps.forEach((step) => {
            const modded = stepSoundMultiply(step, elements);
            soundGramma = [...soundGramma, ...modded];
        });

        soundGramma = soundGramma.concat([{ tokenId: 'p' }, { tokenId: 'p' }]);

        soundGramma.forEach(({ tokenId, sound }) => {
            let duration: number = /* 0.17; // */ 0.38;
            let vowelNotes: {
                note: number;
                duration: number;
                notation: string;
            }[] = [];

            if (tokenId === 'p' || elements[tokenId].type === 'p') {
                time += duration;
            } else if (elements[tokenId].type === 'v') {
                const vowel = elements[tokenId] as IVLetterElement;
                const isAccented: boolean = vowel.accent === 1;
                const char: string = vowel.char.toLowerCase();

                const notes:
                    | ILetterNote['main']
                    | ILetterNote['reduced'] = getNote(elements, vowel);

                duration = isAccented ? 0.57 : duration;

                notes.forEach((note: number, index: number) => {
                    if (index < notesCount) {
                        vowelNotes.push({
                            note,
                            duration,
                            notation: Tone.Frequency(note, 'hz').toNote(),
                        });
                    }
                });

                music.push({
                    string: stringId,
                    isAccented,
                    char: char,
                    time: time.toFixed(2),
                    sound,
                    vowelNotes,
                    index,
                });

                ++index;

                time += duration;
            }
        });
    });

    return { music, time };
};

export { makeLetterGramma, mapLetterNote };
