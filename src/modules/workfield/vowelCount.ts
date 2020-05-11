import vowelsList from './vowelsList';

export default function vowelCount(word: string): number {
    const vowels: RegExp = new RegExp(`[${vowelsList}]`, 'gi');
    const result: string[] = word.match(vowels);
    return result === null ? 0 : result.length;
}
