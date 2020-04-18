export default function hashFunction(char, order) {
    let hash = order;
    let code;

    for (let i = 0; i < char.length; i++) {
        code = char.charCodeAt(i);
        hash = (hash << 5) - hash + order + code;
        hash |= 0; // Convert to 32bit integer
    }

    return Math.abs(hash);
}
