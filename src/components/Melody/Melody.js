import { h, Component } from 'preact';

import { translations } from './translations';

import theme from '../../styles/theme';

import { Tone, Instrument } from '../../modules/tone';
import Drawing from '../../modules/drawing';
import { makeLetterGramma } from '../../modules/melodic';

import Loader from '../Loader';
import Canvas from '../Canvas';
import Player from '../Player';
import Button from '../Button';

import { Flex } from '../../styles/components';

import {
    DownloadLink,
    Title,
    PlayerContainer
} from './styled';

const drawing = new Drawing();

export default class Melody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completeLoading: false,
            progress: 0,
            bpm: 72,
            music: []
        };

        this.verticalOffset = 100;

        this.containerWidth = 666;

        this.sliderTimer = null;

        this.canvas = null;

        this.canvasContainer = null;

        this.ctx = null;

        this.linkGetNotes = null;

        this.notePlayed = 1;
    }
    shouldComponentUpdate(prevProps) {
        if(prevProps.variant !== this.props.variant) {
            const variant = prevProps.variant;

            const { music } = this.state;
            drawing.setVariant(variant);

            this.drawNotes(music, variant);
        }
    }

    drawNotes = (music, variant) => {
        const canvasWidth = this.canvas.offsetWidth;
        const canvasHeight = this.canvas.offsetHeight;

        let verticalOffset = this.verticalOffset;

        drawing.drawNotes({
            ctx: this.ctx,
            music,
            variant,
            canvasWidth,
            canvasHeight,
            verticalOffset
        });
    }
    async componentDidMount() {
        window.scrollTo(0, 0);

        const {
            variant,
            rhythmicState: { strings, elements, orderStrings }
        } = this.props;

        if (Instrument) {
            Instrument.toMaster();
        }

        this.setState({
            completeLoading: true
        });

        this.setUpPlayer();

        const { music, time } = makeLetterGramma({
            notesCount: 1,/* 2 */
            strings,
            elements,
            orderStrings
        });

        console.log(music, time);
        

        this.setState({
            music
        });

        Tone.Transport.loopEnd = Math.round(time + 1);

        new Tone.Part(this.partCallback, music).start('+0.1');

        this.ctx = this.canvas.getContext('2d');

        drawing.setCtx(this.ctx);
        drawing.setVariant(variant);

        this.drawNotes(music, variant);

        drawing.drawIndicator(this.notePlayed - 1);

        console.log(drawing.coords);
    }

    followForIndicator = () => {
        const {vertical} = drawing.coords[this.notePlayed-1];
        console.log(vertical);

        if (window.innerHeight/2.5 < vertical) {
            window.scrollTo({
                top: 100 + vertical,
                behavior: 'smooth'
            });
        }
        
        
    }

    setUpPlayer = () => {
        Tone.Transport.loopEnd = 1;
        Tone.Transport.loop = true;

        Tone.Transport.bpm.value = parseInt(this.state.bpm);
    };

    partCallback = (time, notes) => {

        const vowelNotes = notes.vowelNotes;

        Instrument.volume.value = Math.floor(notes.sound);

        this.followForIndicator();

        drawing.drawIndicator(this.notePlayed - 1);

        ++this.notePlayed; 

        vowelNotes.forEach((note) => {
            Instrument.triggerAttackRelease(
                note.note,
                note.duration,
                time.toFixed(2)
            );
        });
    };

    componentWillUnmount() {
        cancelAnimationFrame(this.sliderTimer);
    }

    play = () => {
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
        drawing.clearIndicator(this.notePlayed - 2);
        this.notePlayed = 1;
        cancelAnimationFrame(this.sliderTimer);

        Tone.Transport.stop();
    };

    pause = () => {
        cancelAnimationFrame(this.sliderTimer);

        Tone.Transport.pause();
    };

    setBPM = (e) => {
        this.setState({
            bpm: e.target.value
        });

        Tone.Transport.bpm.value = parseInt(e.target.value);
    };

    createNewCtx = () => {
        const canvas = document.createElement('canvas');
        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;
        return canvas.getContext('2d');
    };

    getHeightCanvas = () => {
        const { strings, orderStrings } = this.props.rhythmicState;

        let height = 0;

        let width =
            window.innerWidth <= this.containerWidth
                ? window.innerWidth
                : this.containerWidth;

        orderStrings.forEach((stringId) => {
            height =
                height +
                Math.ceil(
                    (strings[stringId].soundGramma.length * 90 +
                        this.verticalOffset) /
                        width
                ) *
                    this.verticalOffset;
        });

        return height;
    };

    downloadNote = (e) => {
        this.linkGetNotes.href = this.canvas.toDataURL('image/jpg');
    };

    render() {
        const { lang = 'ru', variant } = this.props;
        const { completeLoading, bpm, progress } = this.state;

        return (
            <div
                ref={(ref) => {
                    this.canvasContainer = ref;
                }}>
                {completeLoading ? (
                    <div>
                        <PlayerContainer>
                            <Player
                                lang={lang}
                                play={this.play}
                                stop={this.stop}
                                pause={this.pause}
                                progress={progress}
                                bpm={bpm}
                                setBPM={this.setBPM}
                            />
                        </PlayerContainer>
                        <Flex
                            margin="0 0 24px"
                            justify="flex-start"
                            align="center">
                            <Title>{translations[lang].NOTES}</Title>
                            <DownloadLink
                                margin="0 24px"
                                download={'notes'}
                                ref={(ref) => {
                                    this.linkGetNotes = ref;
                                }}
                                href="#"
                                onClick={(e) => {
                                    this.downloadNote();
                                }}>
                                <Button
                                    _flat
                                    _transparent
                                    _light-gray
                                    type="button"
                                    margin="8px 8px">
                                    {translations[lang].SAVE}{' '}
                                </Button>
                            </DownloadLink>
                        </Flex>
                    </div>
                ) : (
                    <Flex margin="25% auto 0" justify="center">
                        <Loader />
                    </Flex>
                )}

                <Canvas
                    background={theme[variant].primaryColor}
                    getRef={(ref) => {
                        this.canvas = ref;
                    }}
                    height={this.getHeightCanvas()}
                />
            </div>
        );
    }
}
