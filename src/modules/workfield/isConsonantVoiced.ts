import getRegexpFromString from '@utils/getRegexpFromString';
import { voiced } from './consonantsList';

export default function(letter: string): boolean {
  return getRegexpFromString(voiced).test(letter);
}
