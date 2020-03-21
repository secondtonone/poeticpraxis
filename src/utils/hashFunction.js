export default function hashFunction(char, order) {
    let hash = order;
    let chr;

    for (let i = 0; i < char.length; i++) {
        chr = char.charCodeAt(i);
        hash = (hash << 5) - hash + order + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}
