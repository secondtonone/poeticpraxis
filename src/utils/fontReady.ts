export default function fontReady(cb: () => void): void {
  if(typeof cb === 'function') {
    document['fonts'].ready.then(() => cb());
  }
}
