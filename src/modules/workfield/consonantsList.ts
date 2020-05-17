const cyrillicAlwaysSolid: string = 'жшц';
const cyrillicAlwaysSoft: string = 'чщйьъ';
const cyrillic: string =
    'кнгзхфвпрлдсмтб' + cyrillicAlwaysSolid + cyrillicAlwaysSoft;
const latin: string = 'qwrtpsdfghjklzxcvbnmßñ';

const consonantsList: string = cyrillic + latin;

export { cyrillicAlwaysSolid, cyrillicAlwaysSoft };

export default consonantsList;
