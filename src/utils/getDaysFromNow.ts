export default function getDaysFromNow(from: Date): number{
    const oneDay: number = 24 * 60 * 60 * 1000;
    const now: number = +new Date();

    return Math.round(Math.abs((+from - now) / oneDay));
}
