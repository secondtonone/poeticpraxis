import { AccentTypes } from './accents';
import getSuggestedPosition from './getSuggestedPosition';

export default function isAccentedByPosition(token: string, vowelCounter: number): AccentTypes {
    return getSuggestedPosition(token) === vowelCounter ? 1 : 0;
}
