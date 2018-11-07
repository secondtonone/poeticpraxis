import { h, Component } from 'preact';
import Recognition from '../../modules/recognition';

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

    render({ text, transmitState, showMessage, ...props }, { isRecording, isSupporting }) {
        if (!isSupporting) {
            return null;
        }
        return (
            <Button _accent={isRecording} onClick={this.toggle} {...props}>
                <MicIcon _middle />
            </Button>
        );
    }
}
