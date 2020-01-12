import { h, Component } from 'preact';

import { translations } from './translations';

import theme from '../../styles/theme';

import { Tone, Instrument } from '../../modules/tone';
import { drawNotes } from '../../modules/drawing';
import { recorder, setUpRecorder } from '../../modules/mediaRecorder';
import { makeLetterGramma } from '../../modules/melodic';

import Loader from '../Loader';
import Canvas from '../Canvas';
import Player from '../Player';
import Button from '../Button';
import Info from '../Info';
import DownloadIcon from '../IconSVG/DownloadIcon';

import { Flex } from '../../styles/components';

import {
    LoaderConatiner,
    LinkConatiner,
    DownloadLink,
    Title
} from './styled';

export default class Melody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completeLoading: false,
            progress: 0,
            bpm: 72,
            music: [],
            recorded: false,
            recording: false
        };

        this.verticalOffset = 100;

        this.containerWidth = 666;

        this.sliderTimer = null;

        this.canvas = null;

        this.canvasContainer = null;

        this.downloadableMelody = null;

        this.ctx = null;

        this.linkGetNotes = null;

        this.linkGetMelody = null;
    }

    async componentDidMount() {
        window.scrollTo(0, 0);

        const canvasWidth = this.canvas.offsetWidth;

        let verticalOffset = this.verticalOffset;

        const {
            variant,
            rhythmicState: { strings, elements, orderStrings }
        } = this.props;

        if (Instrument) {
            Instrument.toMaster();
        }

        setUpRecorder(
            Instrument,
            () => {
                this.setState({
                    recording: true
                });
            },
            (result) => {
                this.setState({
                    recorded: true
                });
                this.downloadableMelody = result;
            }
        );

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

        Tone.Transport.loopEnd = Math.round(time + 0.5);

        new Tone.Part(this.partCallback, music).start('+0.1');

        this.ctx = this.canvas.getContext('2d');

        drawNotes({
            ctx: this.ctx,
            music,
            variant,
            canvasWidth,
            verticalOffset
        });

    }

    setUpPlayer = () => {
        Tone.Transport.loopEnd = 1;
        Tone.Transport.loop = true;

        Tone.Transport.bpm.value = parseInt(this.state.bpm);
    };

    partCallback = (time, notes) => {
        const vowelNotes = notes.vowelNotes;
        const { music/* , recorded, recording  */} = this.state;
        /* const lastSoundIndex = music[music.length - 1].index; */

        /* if (!notes.index && recorder && !recording) {
            recorder.start();
        } */

        Instrument.volume.value = Math.floor(notes.isAccented ? 4 : 0);

        console.log(notes, Instrument.volume.value);

        vowelNotes.forEach((note) => {
            
            Instrument.triggerAttackRelease(
                note.note,
                note.duration,
                time.toFixed(2)
            );
        });

        /* if (notes.index === lastSoundIndex && recorder && !recorded) {
            recorder.stop();
        } */
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
        cancelAnimationFrame(this.sliderTimer);

        Tone.Transport.stop();
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

    downloadMelody = (e) => {
        e.target.href = this.downloadableMelody;
    };

    render() {
        const { lang = 'ru', variant } = this.props;
        const { completeLoading, bpm, progress, recorded } = this.state;

        return (
            <div
                ref={(ref) => {
                    this.canvasContainer = ref;
                }}>
                {completeLoading ? (
                    <div>
                        {/* !recorded && (
                            <Info>{translations[lang].INFO_RECORDING}</Info>
                        ) */}
                        <Flex justify="space-between">
                            <Player
                                lang={lang}
                                play={this.play}
                                stop={this.stop}
                                progress={progress}
                                bpm={bpm}
                                setBPM={this.setBPM}
                            />

                            {/* <Button
                                _rounded
                                _transparent
                                disabled={!recorded}
                                type="button">
                                <DownloadLink
                                    download={'melody'}
                                    ref={(ref) => {
                                        this.linkGetMelody = ref;
                                    }}
                                    disabled={!recorded}
                                    href="#"
                                    onClick={this.downloadMelody}>
                                    <DownloadIcon _big />
                                </DownloadLink>
                                </Button> */}
                        </Flex>
                        <LinkConatiner>
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
                        </LinkConatiner>
                    </div>
                ) : (
                    <LoaderConatiner>
                        <Loader />
                    </LoaderConatiner>
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
