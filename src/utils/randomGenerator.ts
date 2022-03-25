function getRandomInt(min: number, max: number): number{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function randomGenerator(max = 0, count = 1): number[] {
  const valueArray: number[] = [];

  for (let i = 0; i < count; i++) {
    valueArray.push(getRandomInt(0, max));
  }

  return valueArray;
}
