export function copyFrom(field) {
    let range = {};

    if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(field);
        range.select().createTextRange();
    } else if (window.getSelection) {
        range = document.createRange();
        range.selectNodeContents(field);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }

    setTimeout(() => {
        if (!document.execCommand('Copy')) {
            copyToClipboard(field.innerHTML);
        }
    }, 0);
}

export function makeTextarea(value) {
    let textArea = document.createElement('pre');
    let id = 'textAreaForCopy';

    textArea.id = id;
    textArea.style.position = 'fixed';
    textArea.style.top = '-2em';
    textArea.style.left = 0;
    textArea.style.height = '2em';
    textArea.style.width = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.zIndex = '-999';
    textArea.style.background = 'transparent';

    textArea.innerHTML = value;

    return { element: textArea, id };
}

export function copying(value) {
    const { element, id } = makeTextarea(value);
    document.body.appendChild(element);
    copyFrom(element);

    setTimeout(() => {
        document.body.removeChild(element);
    }, 100);
}

export function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    }
}
