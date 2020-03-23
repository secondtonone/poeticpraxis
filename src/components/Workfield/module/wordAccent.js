export default function wordAccent(accent) {
    if (accent < 3) {
        ++accent;
    } else {
        accent = 0;
    }
    return accent;
}
