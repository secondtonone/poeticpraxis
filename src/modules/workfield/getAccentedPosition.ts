import getPositionBySymbol from './getPositionBySymbol';

const methods: Array<(token: string) => number> = [
    (token) => getPositionBySymbol('ё', token),
];

export default function getAccentedPosition(token: string): number[] {
    let position: number = -1;
    let diff: number = 0;

    for (let index: number = 0; index < methods.length; index++) {
        const result: number = methods[index](token);
        if(result !== -1) {
            position = result;
            break;
        }
    }

    return [position, diff];
}
