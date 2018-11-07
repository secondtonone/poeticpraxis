import { h, Component } from 'preact';

import { translations } from './translations';

import {
    getToneModule,
    Tone,
    getInstrument,
    Instrument,
    mapLetterNote
} from '../../modules/tone';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Range from '../../components/Range';

import { Container, LoaderConatiner } from './styled';

import PlayIcon from '../../components/IconSVG/PlayIcon';
import ReplayIcon from '../../components/IconSVG/ReplayIcon';
import PauseIcon from '../../components/IconSVG/PauseIcon';

export default class Melody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completeLoading: false,
            isPlaying: false,
            progress: 0,
            bpm: 80
        };

        this.sliderTimer = null;
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

        this.setUp();

        this.makeLetterGramma();
    }

    setUp = () => {
        Tone.Transport.loopEnd = 1;
        Tone.Transport.loop = true;

        Tone.Transport.bpm.value = parseInt(this.state.bpm);
    };

    makeLetterGramma = () => {
        let music = [];
        const { strings, elements, orderStrings } = this.props.rhytmicState;

        let time = 0;

        orderStrings.forEach((stringId) => {
            strings[stringId].order.forEach((tokenId) => {
                let duration = 0.1;
                if (elements[tokenId].type === 'v') {
                    const char = elements[tokenId].char.toLowerCase();

                    const notes = mapLetterNote[char];

                    if (elements[tokenId].accent === 1) {
                        duration = 0.15;
                    }

                    notes.forEach((note) => {
                        music.push({
                            note,
                            time: time.toFixed(1),
                            duration
                        });
                    });

                    time = time + 0.2;
                }
            });
        });

        /* Tone.Transport.schedule((time) => {
            Instrument.triggerAttackRelease('659.26hz', '0.1', time);
        }, 0);
        Tone.Transport.schedule((time) => {
            Instrument.triggerAttackRelease('F4', '0.15', time);
        }, '0.2');

        Tone.Transport.schedule((time) => {
            Instrument.triggerAttackRelease('A4', '0.1', time);
        }, '0.45');

        Tone.Transport.schedule((time) => {
            Instrument.triggerAttackRelease('E4', '0.1', time);
        }, '0.65'); */

        /* music = [
            { time: 0, note: '659.26hz', duration: '0.1' },
            { time: 0.4, note: 'F4', duration: '0.15' },
            { time: 0.8, note: 'A4', duration: '0.1' },
            { time: 2, note: 'E4', duration: '0.1' }
        ]; */
        
        Tone.Transport.loopEnd = Math.round(time + 1);

        let part = new Tone.Part((time, note) => {
            Instrument.triggerAttackRelease(note.note, note.duration, time);
        }, music).start(0);
    };

    componentWillUnmount() {
        if (this.state.isPlaying) {
            this.stop();
        }
    }

    play = () => {
        this.setState({
            isPlaying: true
        });
        Tone.Transport.start();

        this.sliderTimer = requestAnimationFrame(this.calculateProgress);
    };

    calculateProgress = () => {
        this.setState({
            progress: (
                (Tone.Transport.seconds / Tone.Transport.loopEnd) *
                100
            ).toFixed(2)
        });

        this.sliderTimer = requestAnimationFrame(this.calculateProgress);
    };

    stop = () => {
        cancelAnimationFrame(this.sliderTimer);

        this.setState({
            isPlaying: false
        });

        Tone.Transport.stop();
    };

    setBPM = (e) => {
        this.setState({
            bpm: e.target.value
        });

        Tone.Transport.bpm.value = parseInt(e.target.value);
    };

    repeat = () => {
        this.stop();
        this.play();
    };

    render({ lang = 'ru' }, { completeLoading, isPlaying, bpm, progress }) {
        if (!completeLoading) {
            return (
                <LoaderConatiner>
                    <Loader />
                </LoaderConatiner>
            );
        }

        return (
            <div>
                <Container>
                    <Button
                        _rounded
                        _transparent
                        disabled={!completeLoading}
                        type="button"
                        onClick={this.repeat}
                        title="Играть заново">
                        <ReplayIcon _big />
                    </Button>
                    {!isPlaying && (
                        <Button
                            _rounded
                            _transparent
                            disabled={!completeLoading}
                            type="button"
                            onClick={this.play}
                            title="Играть">
                            <PlayIcon _big />
                        </Button>
                    )}
                    {isPlaying && (
                        <Button
                            _rounded
                            _transparent
                            disabled={!completeLoading}
                            type="button"
                            onClick={this.stop}
                            title="Стоп">
                            <PauseIcon _big />
                        </Button>
                    )}
                    <div>
                        BPM
                        <Range
                            type="range"
                            value={bpm}
                            min="20"
                            max="200"
                            onChange={this.setBPM}
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
            </div>
        );
    }
}
