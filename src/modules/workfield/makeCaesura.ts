function setCursor(elem: HTMLTextAreaElement, pos: number) {
  elem.focus();

  setTimeout(() => {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    }
  }, 50);
}

function insertionToPosition<T extends HTMLTextAreaElement>(str: string, textarea: T, getResult: (text: string) => void) {
  const value = textarea.value;
  const before = value.substring(0, textarea.selectionStart);
  const after = value.substring(textarea.selectionEnd, value.length);

  const text = `${before}${str}${after}`;

  if (getResult) {
    getResult(text);
  }

  setCursor(textarea, before.length + str.length);
}
export default function makeCaesura<T extends HTMLTextAreaElement>(field: T, getResult: (text: string) => void) {
  insertionToPosition('⋀', field, getResult);
}
