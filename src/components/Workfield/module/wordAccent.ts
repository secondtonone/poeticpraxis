export default function wordAccent(accent: number): number {
    if (accent < 3) {
        ++accent;
    } else {
        accent = 0;
    }
    return accent;
}
