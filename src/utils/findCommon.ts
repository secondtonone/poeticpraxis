export default function findCommon(arr: number[]): number {
    let max: number = 1,
        m: number[] = [],
        val: number = arr[0],
        x: number;

    for (let i = 0; i < arr.length; i++) {
        // x = arr[i++];
        x = arr[i];
        if (m[x]) {
            ++m[x] > max && ((max = m[i]), (val = x));
        } else {
            m[x] = 1;
        }
    }
    return val;
}
