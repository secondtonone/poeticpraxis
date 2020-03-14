import { h } from 'preact';
import { useCallback } from 'preact/compat';

let evCache = [];
let prevDiff = -1;

const removeEvent = (ev) => {
 // Remove this event from the target's cache
    for (var i = 0; i < evCache.length; i++) {
        if (evCache[i].pointerId == ev.pointerId) {
            evCache.splice(i, 1);
            break;
        }
    }
}

const pointerDownHandler = (ev) => {
    evCache.push(ev);
};

const pointerUpHandler = (ev) => {
    removeEvent(ev);
    // If the number of pointers down is less than two then reset diff tracker
    if (evCache.length < 2) {
        prevDiff = -1;
    }
};

const Zoom = ({ children, onZoomIn, onZoomOut }) => {

    const pointerMoveHandler = useCallback(
        (ev) => {
            for (var i = 0; i < evCache.length; i++) {
                if (ev.pointerId == evCache[i].pointerId) {
                    evCache[i] = ev;
                    break;
                }
            }

            if (evCache.length == 2) {
                // Calculate the distance between the two pointers
                let curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

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
