import React, { Component } from 'react';
import Recognition from '../../modules/recognition';
import { translations } from './translations';

import Button from '../Button';
import MicIcon from '../IconSVG/Mic';

export default class Recorder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRecording: false,
            isSupporting: true
        };
    }

    componentDidMount() {
        try {
            this.recognition = new Recognition(
                (transcription) => {
                    const text = `${this.props.text}\n${transcription}`;

                    this.props.transmitState({
                        text
                    });
                },
                (message, isRecording) => {
                    this.props.showMessage(message);

                    this.setState({
                        isRecording
                    });
                }
            );
        } catch (error) {
            this.setState({
                isSupporting: false
            });
        }
    }

    toggle = () => {
        this.recognition.toggle();
    };

    render() {
        const { isRecording, isSupporting } = this.state;
        const { lang = 'ru'} = this.props;

        if (!isSupporting) {
            return null;
        }
        return (
            <Button _flat _transparent _accent={isRecording} onClick={this.toggle} {...this.props}>
                <MicIcon _small padding="0 8px 0 0" />{' '}
                {isRecording ? translations[lang].OFF : translations[lang].ON}
            </Button>
        );
    }
}
