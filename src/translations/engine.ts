const ru = {
    engineMenu: {
        WORDS: 'Пары',
        MATERIAL: 'Материал',
    },
    placeholders: {
        ENGINE: 'Введите слова или вставьте текст',
    },
    engine: {
        MONTAGE: 'Собрать',
        CLEAR: 'Стереть текст',
        GET: 'Получить слова',
        RECORD: 'Запись',
        WORDS_AMOUNT: ['слово', 'слова', 'слов'],
    },
    matchList: {
        FAVORITES: 'Выбранныe',
        FAVOR_HINT: 'Выберите словосочетания',
        PAIRS: 'Сочетания',
        PAIRS_HINT: ['Нажмите снова на', 'чтобы получить новые сочетаиния'],
        SEE_RHYTHM: 'Посмотреть ритм',
        RETURN: 'Вернуться наверх',
        COPY: 'Копировать',
    },

    main: {
        TITLE: 'МАШИНА ОБРАЗОВ',
    }
} as const;

const en = {
    engineMenu: {
        WORDS: 'Pairs',
        MATERIAL: 'Material',
    },
    placeholders: {
        ENGINE: 'Write or paste words',
    },
    engine: {
        MONTAGE: 'Montaging',
        CLEAR: 'Delete text',
        GET: 'Get words',
        RECORD: 'Recording',
        WORDS_AMOUNT: ['word', 'words'],
    },
    matchList: {
        FAVORITES: 'Favorites',
        FAVOR_HINT: 'Add pairs click by',
        PAIRS: 'Pairs',
        PAIRS_HINT: ['Click on', 'to get more pairs'],
        SEE_RHYTHM: 'See rhythm',
        RETURN: 'Return',
        COPY: 'Copy',
    },
    main: {
        TITLE: 'IMAGES ENGINE',
    },
} as const;

const engine = {
    ru,
    en
};

export default engine;
