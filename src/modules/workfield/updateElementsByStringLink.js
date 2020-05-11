export default function updateElementsByStringLink({
    elements,
    element,
    stringLink,
    strings
}) {
    const stringLinkLength = stringLink.length;

    for (let i = 0; i < stringLinkLength; i++) {
        const idString = stringLink[i];

        if (strings[idString]) {
            let idElement = strings[idString].order[element.stringIndex];

            if (element.id !== idElement) {
                elements[idElement].accent = elements[element.id].accent;

                stringLinksTriggered = true;
            }
        }
    }

    return elements;
}
