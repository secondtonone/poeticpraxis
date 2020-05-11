const cyrillicAlwaysSolid: string = 'жшц';
const cyrillicAlwaysSoft: string = 'чщй';
const cyrillic: string =
    'кнгзхфвпрлдсмтб' + cyrillicAlwaysSolid + cyrillicAlwaysSoft;
const latin: string = 'qwrtpsdfghjklzxcvbnmßñ';

const consonantsList: string = cyrillic + latin;

export { cyrillicAlwaysSolid, cyrillicAlwaysSoft };

export default consonantsList;
