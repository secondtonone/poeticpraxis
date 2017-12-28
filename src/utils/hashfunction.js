export default function hashFunction(char, order) {

    let hash = order;

    if (char.length === 0) {
        return hash;
    }

    for (let i = 0; i < char.length; i++) {
        let chr = char.charCodeAt(i);
        hash = ((hash << 5) - hash) + order + chr;
        hash |= 0;
    }
    return hash.toString();
}