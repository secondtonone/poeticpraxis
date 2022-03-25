import {
  IElements,
  IStrings,
  IStructure,
  IVLetterElement,
  ICLetterElement,
} from '@modules/workfield/structure';
import { getGroup, calculateFormant } from '@modules/formants';
import LetterGramma, { Music } from '@typings/LetterGramma';

const DURATION = 0.38; // 0.17;
const ACCENTED_DURATION: number = DURATION * 1.5;
/*  длительность двух строк - 3.5
 *  в строках 15 гласных на одну 0.23с = 230мс
 *  120 бпм 1/4 ноты в минуту
 *  ударный - 300-150мс
 *  безударных в первом предударном слоге - 100мс
 *  во втором предударном – 50 – 60 мс
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
  elements: IElements
): number[] => {
  const isAccented: boolean = vowel.accent === 1;
  const char: string = vowel.char.toLowerCase();

  const group = getGroup(char, isAccented);

  //const predictedFormant = getFormant(prev, next);

  const formant = calculateFormant({ group, prev, next }); //getFinalFormant(group, predictedFormant);
  // @ts-ignore
  const notes: number[] = group[formant];

  console.log(prev, vowel, next);
  // @ts-ignore
  console.table({
    гласная: vowel.char,
    // @ts-ignore
    предыдущий: prev ? prev['isSolid'] : '',
    // @ts-ignore
    следующий: next ? next['isSolid'] : '',
    итоговая: formant,
    ноты: notes,
    // @ts-ignore
    слово: elements[`${vowel.idString}${vowel.idToken}`].token,
  });

  return notes;
};

const makeLetterGramma = ({
  notesCount,
  strings,
  elements,
  orderStrings,
  frequencyToNote,
}: {
    notesCount: number;
    strings: IStrings;
    elements: IElements;
    orderStrings: IStructure['orderStrings'];
    frequencyToNote: (frequency: number) => string;
}): LetterGramma => {
  const music: Music = [];

  let time = 0;

  let index = 0;

  orderStrings.forEach((stringId: string) => {
    let soundGramma: { tokenId: string; sound?: 0 | 2 }[] = [];

    strings[stringId].steps.forEach((step) => {
      const modded = stepSoundMultiply(step, elements);
      soundGramma = [...soundGramma, ...modded];
    });

    soundGramma = soundGramma.concat([{ tokenId: 'p' }, { tokenId: 'p' }]);

    soundGramma.forEach(({ tokenId, sound }) => {
      let duration: number = DURATION;
      const vowelNotes: {
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
        const prev: null | ICLetterElement | IVLetterElement =
                    vowel.prev
                      ? (elements[vowel.prev] as
                            | ICLetterElement
                            | IVLetterElement)
                      : null;
        const next: null | ICLetterElement | IVLetterElement =
                    vowel.next
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
              notation: frequencyToNote(note),
            });
          }
        });

        music.push({
          string: stringId,
          isAccented,
          char: char,
          time: +time.toFixed(2),
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
