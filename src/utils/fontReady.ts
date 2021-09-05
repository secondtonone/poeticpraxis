export default function fontReady(cb: () => void): void {
    if(typeof cb === 'function') {
        if (document['fonts'].ready) {
            document['fonts'].ready.then(() => cb());
        } else {
            setTimeout(cb, 150);
        }
    }
}
