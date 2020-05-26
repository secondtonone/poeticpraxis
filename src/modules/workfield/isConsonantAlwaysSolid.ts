import { cyrillicAlwaysSolid } from './consonantsList';
import getRegexpFromString from '@utils/getRegexpFromString';

export default function(letter: string): boolean {
    return getRegexpFromString(cyrillicAlwaysSolid).test(letter);
}
