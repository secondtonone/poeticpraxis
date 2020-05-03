function wordByNumberRu(number?: number, words: string[] = []):string {
    if (number === undefined || words.length === 0) {
        return '';
    }

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

function wordByNumberEng(number?: number, words: string[] = []):string {
    if (number === undefined || words.length === 0) {
        return '';
    }

    if (number === 1) {
        return words[0];
    }

    return words[1];
}

export default function wordByNumber(lang: string, number: number, words: string[]):string {
    if (lang === 'ru') {
        return wordByNumberRu(number, words);
    }

    return wordByNumberEng(number, words);
}
