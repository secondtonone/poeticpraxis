import type { Ref } from 'preact';
import { forwardRef } from 'preact/compat';

const canvasStyle = { width: '100%' };

interface CanvasProps {
  height: number
}

const Canvas = forwardRef(({ height }: CanvasProps, ref: Ref<HTMLCanvasElement> | undefined) => <canvas style={canvasStyle} height={height} ref={ref} />);

export default Canvas;
