export default function delay(fn: TimerHandler, ms: number = 0):number {
    return window.setTimeout(fn, ms);
}
