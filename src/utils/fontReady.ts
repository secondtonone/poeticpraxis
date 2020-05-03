export default function fontReady(cb: TimerHandler): void {
    if (document['fonts'].ready) {
        document['fonts'].ready.then(cb);
    } else {
        setTimeout(cb, 150);
    }
}
