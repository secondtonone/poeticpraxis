function setCursor(elem, pos) {
    elem.focus();

    setTimeout(() => {
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            const range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }, 50);
}

function insertionToPosition(str, textarea, getResult) {
    const value = textarea.value;
    const before = value.substring(0, textarea.selectionStart);
    const after = value.substring(textarea.selectionEnd, value.length);

    const text = `${before}${str}${after}`;

    if (getResult) {
        getResult(text);
    }

    setCursor(textarea, before.length + str.length);
}
export default function makeCaesura(field, getResult) {
    insertionToPosition('⋀', field, getResult);
}
