import React, { Component } from 'react';
import styled from 'styled-components';

import { translations } from './translations';

import Button from '../Button';
import Range from '../Range';

import PlayIcon from '../IconSVG/PlayIcon';
import ReplayIcon from '../IconSVG/ReplayIcon';
import PauseIcon from '../IconSVG/PauseIcon';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PlayerContainer = styled.div`
    width: 100%;

    @media (max-width: 600px) {
        width: auto;
    }
`;

export default class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlaying: false
        };
    }

    componentWillUnmount() {
        if (this.state.isPlaying) {
            this.stop();
        }
    }

    play = () => {
        this.setState({
            isPlaying: true
        });
        if (this.props.play) {
            this.props.play();
        }
    };

    stop = () => {
        this.setState({
            isPlaying: false
        });
        if (this.props.stop) {
            this.props.stop();
        }
    };

    repeat = () => {
        this.stop();
        this.play();
    };

    render() {
        const { lang = 'ru', bpm, progress, setBPM } = this.props;
        const { isPlaying } = this.state;

        return (
            <PlayerContainer>
                <Container>
                    <div>
                        <Button
                            _rounded
                            _transparent
                            type="button"
                            onClick={this.repeat}
                            title={translations[lang].REPEAT}>
                            <ReplayIcon _big />
                        </Button>
                        {!isPlaying && (
                            <Button
                                _rounded
                                _transparent
                                type="button"
                                onClick={this.play}
                                title={translations[lang].PLAY}>
                                <PlayIcon _big />
                            </Button>
                        )}
                        {isPlaying && (
                            <Button
                                _rounded
                                _transparent
                                type="button"
                                onClick={this.stop}
                                title={translations[lang].STOP}>
                                <PauseIcon _big />
                            </Button>
                        )}
                    </div>
                    <div>
                        {translations[lang].TEMPO}
                        <Range
                            type="range"
                            value={bpm}
                            min="20"
                            max="200"
                            onChange={setBPM}
                        />
                    </div>
                </Container>
                <div>
                    <Range
                        hideThumb
                        type="range"
                        value={progress}
                        min="0"
                        max="100"
                        disabled
                    />
                </div>
            </PlayerContainer>
        );
    }
}
