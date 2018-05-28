export function withElements(props) {
    const modifiers = Object.keys(props).filter((propName) =>
        propName.startsWith('_')
    );
    return [...modifiers].join(' ');
}
