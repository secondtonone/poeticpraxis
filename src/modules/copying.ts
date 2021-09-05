export function copyFrom<T extends HTMLElement>(field: T) {
    let range = {} as Range;

    if (window.getSelection) {
        range = document.createRange();
        range.selectNodeContents(field);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }

    setTimeout(() => {
        if (!document.execCommand('Copy')) copyToClipboard(field.innerHTML);
    }, 0);
}

export function makeTextarea(value: string) {
    let textArea = document.createElement('pre');
    let id = 'textAreaForCopy';

    textArea.id = id;
    textArea.style.position = 'fixed';
    textArea.style.top = '-2em';
    textArea.style.left = '0';
    textArea.style.height = '2em';
    textArea.style.width = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.zIndex = '-999';
    textArea.style.background = 'transparent';

    textArea.innerHTML = value;

    return { element: textArea, id };
}

export function copying(value: string) {
    const { element } = makeTextarea(value);
    document.body.appendChild(element);
    copyFrom(element);

    setTimeout(() => {
        document.body.removeChild(element);
    }, 100);
}

export function copyToClipboard(text: string) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    }
}
