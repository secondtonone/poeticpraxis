import getPositionBySymbol from './getPositionBySymbol';

const methods: Array<(token: string) => number> = [
  (token) => getPositionBySymbol('ё', token),
];

export default function getAccentedPosition(token: string): number[] {
  let position = -1;
  const diff = 0;

  for (let index = 0; index < methods.length; index++) {
    const result: number = methods[index](token);
    if(result !== -1) {
      position = result;
      break;
    }
  }

  return [position, diff];
}
