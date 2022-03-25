const sonor = 'лмнрй';

const blankPaired = 'пфктшс';
const blank: string = blankPaired + 'чцчщ';

const voicedPaired = 'бвгджз';
const voiced: string = voicedPaired + sonor;

const noisy: string = voicedPaired + blank;

const cyrillicAlwaysSolid = 'жшц';
const cyrillicAlwaysSoft = 'чщйьъ';

const cyrillic: string =
    'кнгзхфвпрлдсмтб' + cyrillicAlwaysSolid + cyrillicAlwaysSoft;
const latin = 'qwrtpsdfghjklzxcvbnmßñ';

const consonantsList: string = cyrillic + latin;

export { cyrillicAlwaysSolid, cyrillicAlwaysSoft, noisy, sonor, voiced, blank };

export default consonantsList;
