import { enginePage as translations } from '@translations';
import type { Langs } from '@typings/Langs';

type WordsRU = typeof translations.ru.engine.WORDS_AMOUNT;
type WordsEN = typeof translations.en.engine.WORDS_AMOUNT;

function wordByNumberRu(number: number, words: WordsRU ):string {
  const lastNumber:number = number % 10;

  if (lastNumber === 1 && number !== 11) {
    return words[0];
  }

  if (
    lastNumber >= 2 &&
        lastNumber <= 4 &&
        number !== 12 &&
        number !== 13 &&
        number !== 14
  ) {
    return words[1];
  }

  //1-слово 2- слова 5-слов

  return words[2];
}

function wordByNumberEng(number: number, words: WordsEN):string {
  if (number === 1) {
    return words[0];
  }

  return words[1];
}

export default function wordByNumber(lang: Langs, number: number, words: WordsEN | WordsRU): string {
  if (lang === 'ru') {
    return wordByNumberRu(number, words as WordsRU);
  }

  return wordByNumberEng(number, words as WordsEN);
}
