import randomGenerator from '@utils/randomGenerator';

const TOTAL_WORDS = 67774;
const INTERVAL = 5000;
const LIMIT_WORDS = 20;

function findDictionary(wordId: number) {
  for (let i = 0; i < TOTAL_WORDS; i += INTERVAL) {
    if (wordId < i) {
      return i;
    }
  }

  return TOTAL_WORDS;
}

function wordToDictionary(wordCount: number) {
  const wordsIds = randomGenerator(TOTAL_WORDS, wordCount);

  const wordsDictionariesMap: {[key: string]: number[]} = {};

  wordsIds.forEach((id) => {
    const dictionaryId = findDictionary(id);
    const relativeWordId = INTERVAL - (dictionaryId - id) - 1;
    if (wordsDictionariesMap[dictionaryId]) {
      wordsDictionariesMap[dictionaryId].push(relativeWordId);
    } else {
      wordsDictionariesMap[dictionaryId] = [relativeWordId];
    }
  });

  return {
    wordsIds,
    dictionariesIds: Object.keys(wordsDictionariesMap),
    wordsDictionariesMap
  };
}
/* async function getDictionary(id) {
    const response = await fetch(`dictionary-${id}.json`);
    return response.json();
} */
async function getDictionary(id: string) {
  const dictionary: string[] = await import(`@public/dictionary/dictionary-${id}.json`);
  return dictionary;
}

async function requestMaker(dictionariesIds: string[]) {
  return Promise.all(dictionariesIds.map((id) => getDictionary(id)));
}

export async function getWords(text = '', wordsLength: number) {
  const words: string[] = [];

  const needWords =
        wordsLength > 0 && wordsLength < LIMIT_WORDS
          ? wordsLength % 2
            ? wordsLength + 1
            : wordsLength
          : LIMIT_WORDS;

  const { dictionariesIds, wordsDictionariesMap } = wordToDictionary(
    needWords
  );

  const dictionaries = await requestMaker(dictionariesIds);

  dictionariesIds.forEach((dictionaryId, index) => {
    const wordsIds = wordsDictionariesMap[dictionaryId];
    const dictionary = dictionaries[index];
    wordsIds.forEach((wordId) => {
      words.push(dictionary[wordId]);
    });
  });

  const result = `${text} ${words.join(' ')}`;

  return Promise.resolve(result);
}
