function positionAccent(vowelCount) {
    return Math.floor((vowelCount + 1) / 2);
}

export default function isAccentedByPosition(token, vowelCounter) {
    const vowelNumber = vowelCount(token);

    const suggestionPosAccent = positionAccent(vowelNumber);

    return suggestionPosAccent === vowelCounter ? 1 : 0;
}
