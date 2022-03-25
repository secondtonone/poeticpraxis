export default function delay(fn: TimerHandler, ms = 0):number {
  return window.setTimeout(fn, ms);
}
