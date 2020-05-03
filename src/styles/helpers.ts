export function withElements<T>(props: T): string {
    const modifiers: string[] = Object.keys(props).filter(
        (propName: string) => propName.startsWith('_') && props[propName]
    );
    return [...modifiers].join(' ');
}
