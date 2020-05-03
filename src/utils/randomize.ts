export default function randomize(cb?: () => number | string): number | string {
    if (cb) {
        return cb();
    }

    let length: number = 4;
    let chars: string = '0123456789';
    let result: string = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
