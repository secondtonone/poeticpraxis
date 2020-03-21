export default function randomize() {
    let length = 4;
    let chars = '0123456789';
    let result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
