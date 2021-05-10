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
    main: {
        TITLE: 'PROSODY',
    },
} as const;

const rhythmic = {
    ru,
    en
};

export default rhythmic;
