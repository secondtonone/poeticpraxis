import React, { Component } from 'react';

import { calcRatio } from '../../modules/drawing';

export default class Canvas extends Component {
    componentDidMount() {
        this.updateChart();

        //window.addEventListener('resize', this.updateChart);
    }

    componentWillUnmount() {
        //window.removeEventListener('resize', this.updateChart);
    }

    updateChart = () => {
        const ratio = calcRatio();
        this.canvas.width = this.canvas.offsetWidth * ratio;
        this.canvas.height = this.props.height * ratio;
        this.canvas.style.width = this.canvas.offsetWidth + 'px';
        this.canvas.style.height = this.props.height + 'px';
        const ctx = this.canvas.getContext('2d');
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.fillStyle = this.props.background;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    render() {
        const { height, getRef } = this.props;

        return (
            <canvas
                style={{ width: '100%' }}
                height={height}
                ref={(ref) => {
                    getRef(ref);
                    this.canvas = ref;
                }}
            />
        );
    }
}
