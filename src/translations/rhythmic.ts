const ru = {
  placeholders: {
    RHYTHMICS: 'Напишите или вставьте текст',
  },
  rhythmic: {
    COPY: 'Копировать в текстовый редактор',
    SHARE: 'Поделиться ссылкой',
    ZOOMIN: 'Увеличить',
    ZOOMOUT: 'Уменьшить',
    BLOCK: 'Блокировать',
    UNBLOCK: 'Разблокировать',
    CAESURA: 'Цезура',
    WORDS_AMOUNT: ['слово', 'слова', 'слов'],
  },
  rhythmicMenu: {
    RHYTHMICS: 'Ритмика',
    MELODY: 'Мелодия',
  },
  meters: {
    PYRRHIC: 'Пиррихий',
    TROCHEE: 'Хорей',
    IAMB: 'Ямб',
    DACTYL: 'Дактиль',
    AMPHIBRACHIUM: 'Амфибрахий',
    ANAPAEST: 'Анапест',
  },
  main: {
    TITLE: 'ПРОСОДИЯ',
  },
} as const;

const en = {
  placeholders: {
    RHYTHMICS: 'Write or paste text',
  },
  rhythmic: {
    COPY: 'Copy to text editor',
    SHARE: 'Share with link',
    ZOOMIN: 'Zoom in',
    ZOOMOUT: 'Zoom out',
    BLOCK: 'Block',
    UNBLOCK: 'Unblock',
    CAESURA: 'Caesura',
    WORDS_AMOUNT: ['word', 'words'],
  },
  rhythmicMenu: {
    RHYTHMICS: 'Rhythmics',
    MELODY: 'Melody',
  },
  meters: {
    PYRRHIC: 'Pyrrhic',
    TROCHEE: 'Trochee',
    IAMB: 'Iamb',
    DACTYL: 'Dactyl',
    AMPHIBRACHIUM: 'Amphibrachium',
    ANAPAEST: 'Anapaest',
  },
  main: {
    TITLE: 'PROSODY',
  },
} as const;

const rhythmic = {
  ru,
  en
};

export default rhythmic;
