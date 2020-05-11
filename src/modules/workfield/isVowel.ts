import vowelsList from './vowelsList';

export default function isVowel(char: string): boolean {
    const vowels = new RegExp(`^[${vowelsList}]$`);
    return vowels.test(char.toLowerCase());
}
