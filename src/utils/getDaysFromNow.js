export default function getDaysFromNow(from) {
    const oneDay = 24 * 60 * 60 * 1000;
    const now = new Date();

    return Math.round(Math.abs((from - now) / oneDay));
}
