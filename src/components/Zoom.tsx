import { FunctionalComponent, JSX } from 'preact';
import { useCallback } from 'preact/compat';

type ZoomEvent = JSX.TargetedPointerEvent<HTMLDivElement>;

const evCache: ZoomEvent[] = [];
let prevDiff = -1;

const removeEvent = <T extends ZoomEvent>(ev: T) => {
  // Remove this event from the target's cache
  for (let i = 0; i < evCache.length; i++) {
    if (evCache[i].pointerId == ev.pointerId) {
      evCache.splice(i, 1);
      break;
    }
  }
};

const pointerDownHandler: JSX.PointerEventHandler<HTMLDivElement> = (ev) => {
  evCache.push(ev);
};

const pointerUpHandler: JSX.PointerEventHandler<HTMLDivElement> = (ev) => {
  removeEvent(ev);
  // If the number of pointers down is less than two then reset diff tracker
  if (evCache.length < 2) {
    prevDiff = -1;
  }
};

interface ZoomProps { 
    onZoomIn: () => void
    onZoomOut: () => void
}

const Zoom: FunctionalComponent<ZoomProps> = ({ children, onZoomIn, onZoomOut }) => {

  const pointerMoveHandler: preact.JSX.PointerEventHandler<HTMLDivElement> = useCallback(
    (ev) => {
      for (let i = 0; i < evCache.length; i++) {
        if (ev.pointerId == evCache[i].pointerId) {
          evCache[i] = ev;
          break;
        }
      }

      if (evCache.length == 2) {
        // Calculate the distance between the two pointers
        const curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

        if (prevDiff > 0) {
          if (curDiff > prevDiff) {
            onZoomIn();
          }
          if (curDiff < prevDiff) {
            onZoomOut();
          }
        }
        prevDiff = curDiff;
      }
    },
    [onZoomIn, onZoomOut]
  );

  return (
    <div
      onPointerDown={pointerDownHandler}
      onPointerMove={pointerMoveHandler}
      onPointerUp={pointerUpHandler}
      onPointerCancel={pointerUpHandler}
      onPointerOut={pointerUpHandler}
      onPointerLeave={pointerUpHandler}
    >
      {children}
    </div>
  );
};

export default Zoom;
