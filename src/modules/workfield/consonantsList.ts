const sonor: string = 'лмнрй';

const blankPaired: string = 'пфктшс';
const blank: string = blankPaired + 'чцчщ';

const voicedPaired: string = 'бвгджз';
const voiced: string = voicedPaired + sonor;

const noisy: string = voicedPaired + blank;

const cyrillicAlwaysSolid: string = 'жшц';
const cyrillicAlwaysSoft: string = 'чщйьъ';

const cyrillic: string =
    'кнгзхфвпрлдсмтб' + cyrillicAlwaysSolid + cyrillicAlwaysSoft;
const latin: string = 'qwrtpsdfghjklzxcvbnmßñ';

const consonantsList: string = cyrillic + latin;

export { cyrillicAlwaysSolid, cyrillicAlwaysSoft, noisy, sonor, voiced, blank };

export default consonantsList;
