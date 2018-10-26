import { h, Component } from 'preact';
import styled from 'styled-components';
import { translations } from './translations';
import {
    getToneModule,
    Tone,
    getInstrument,
    Instrument
} from '../../modules/tone';
import Button from '../../components/Button';

const Container = styled.div`
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
`;

export default class Melody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            strings: props.getData().strings,
            completeLoading: false
        };
    }

    async componentDidMount() {
        if (!Tone) {
            await getToneModule();
        }

        if (!Instrument) {
            await getInstrument('piano');

            Instrument.toMaster();
        }

        

        this.setState({
            completeLoading: true
        });
    }

    componentWillUnmount() {
        //Instrument.disconnect();
    }

    play = () => {
        Instrument.triggerAttackRelease('E4', 2000);
    };
    render({ lang = 'ru' }, { completeLoading }) {
        return (
            <Container>
                <Button
                    _rounded
                    _transparent
                    disabled={!completeLoading}
                    type="button"
                    onClick={this.play}
                    title="Играть">
                    Play
                </Button>
            </Container>
        );
    }
}
