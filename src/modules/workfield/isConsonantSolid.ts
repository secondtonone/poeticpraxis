import { cyrillicAlwaysSolid } from './consonantsList';
import { vowelBeforeSoft, vowelBeforeSolid } from './vowelsList';

const getRegexp = (temp: string): RegExp => new RegExp(`[${temp}]`, 'i');

export default function(letter: string): boolean {
    return (
        getRegexp(cyrillicAlwaysSolid).test(letter) ||
        getRegexp(vowelBeforeSolid).test(letter)
    );
}
