export default function findCommon(arr) {
    var max = 1,
        m = [],
        val = arr[0],
        i,
        x;

    for (i = 0; i < arr.length; i++) {
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
