import getSuggestedPosition from './getSuggestedPosition';

export default function isAccentedByPosition(token: string, vowelCounter: number): number {
    return getSuggestedPosition(token) === vowelCounter ? 1 : 0;
}
