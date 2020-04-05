import { h } from 'preact';
import { memo } from 'preact/compat';

const canvasStyle = { width: '100%' };

const Canvas = memo(({ height, getRef }) => {
    return <canvas style={canvasStyle} height={height} ref={getRef} />;
});

export default Canvas;
