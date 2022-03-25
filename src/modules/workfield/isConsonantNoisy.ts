import getRegexpFromString from '@utils/getRegexpFromString';
import { noisy } from './consonantsList';

export default function(letter: string): boolean {
  return getRegexpFromString(noisy).test(letter);
}
