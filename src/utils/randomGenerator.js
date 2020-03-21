function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function randomGenerator(max = 0, count = 1) {
    let valueArray = [];

    for (let i = 0; i < count; i++) {
        valueArray.push(getRandomInt(0, max));
    }

    return valueArray;
}
