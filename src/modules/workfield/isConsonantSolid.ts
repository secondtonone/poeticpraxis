import { vowelBeforeSolid } from './vowelsList';
import getRegexpFromString from '@utils/getRegexpFromString';
import isConsonantAlwaysSolid from './isConsonantAlwaysSolid';

export default function(letter: string, prevLetter: string): boolean {
    return (
        isConsonantAlwaysSolid(prevLetter) ||
        getRegexpFromString(vowelBeforeSolid).test(letter)
    );
}
