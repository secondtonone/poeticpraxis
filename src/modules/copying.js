export function copy(field) {
    let range = {};

    if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(field);
        range.select().createTextRange();
        document.execCommand('Copy');
        console.log('range');
    } else if (window.getSelection) {
        range = document.createRange();
        range.selectNodeContents(field);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('Copy');
    }
};
