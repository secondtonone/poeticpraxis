import { Tone } from '@modules/tone';
import {
    IElements,
    IStrings,
    IStructure,
    IVLetterElement,
    ICLetterElement,
    ILetterElement,
    IdString,
} from '@modules/workfield/structure';
import { getGroup, calculateFormant } from '@modules/formants';

const DURATION: number = 0.38; // 0.17;
const ACCENTED_DURATION: number = DURATION * 1.5;
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


const getNote = (
    vowel: IVLetterElement,
    prev: null | ICLetterElement | IVLetterElement,
    next: null | ICLetterElement | IVLetterElement,
    elements
): number[] => {
    const isAccented: boolean = vowel.accent === 1;
    const char: string = vowel.char.toLowerCase();

    const group = getGroup(char, isAccented);

    //const predictedFormant = getFormant(prev, next);

    const formant = calculateFormant({group, prev, next});//getFinalFormant(group, predictedFormant);

    
    let notes: number[] = group[formant];
    console.log(prev,vowel,next);
    console.table({'гласная':vowel.char, 'предыдущий':prev ?prev['isSolid']:'', 'следующий':next?next['isSolid']:'', 'итоговая': formant , 'ноты': notes ,'слово':elements[`${vowel.idString}${vowel.idToken}`].token});
    
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
            let duration: number = DURATION;
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
                const prev:
                    | null
                    | ICLetterElement
                    | IVLetterElement = vowel.prev
                    ? (elements[vowel.prev] as
                          | ICLetterElement
                          | IVLetterElement)
                    : null;
                const next:
                    | null
                    | ICLetterElement
                    | IVLetterElement = vowel.next
                    ? (elements[vowel.next] as
                          | ICLetterElement
                          | IVLetterElement)
                    : null;

                const notes: number[] = getNote(vowel, prev, next, elements);

                duration = isAccented ? ACCENTED_DURATION : duration;

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

export { makeLetterGramma };
