import { h } from 'preact';
import { memo } from 'preact/compat';

const canvasStyle = { width: '100%' };

interface CanvasProps {
    height: string
    getRef: React.Ref<HTMLCanvasElement>
}

const Canvas = memo<CanvasProps>(({ height, getRef }) => {
    return <canvas style={canvasStyle} height={height} ref={getRef} />;
});

export default Canvas;
