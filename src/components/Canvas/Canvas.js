import { h, Component } from 'preact';

export default class Canvas extends Component {
    componentDidMount() {
        this.updateChart();
    }

    calcRatio() {
        let ctx = document.createElement('canvas').getContext('2d'),
            dpr = window.devicePixelRatio || 1,
            bsr =
                ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio ||
                1;
        return dpr / bsr;
    }

    updateChart() {
        const ratio = this.calcRatio();
        this.canvas.width = this.canvas.offsetWidth * ratio;
        this.canvas.height = this.props.height * ratio;
        this.canvas.style.width = this.canvas.offsetWidth + 'px';
        this.canvas.style.height = this.props.height + 'px';
        const ctx = this.canvas.getContext('2d');
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.fillStyle = this.props.background;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render({ height, getRef }) {
        return (
            <canvas
                style={'width: 100%;'}
                height={height}
                ref={(ref) => {
                    this.canvas = ref;
                    getRef(ref);
                }}
            />
        );
    }
}
