import vowelCount from './vowelCount';

function positionAccent(vowelCount: number): number{
    return Math.ceil((vowelCount + 1) / 2);
}

export default function getSuggestedPosition(token: string): number{
    return positionAccent(vowelCount(token));
}
