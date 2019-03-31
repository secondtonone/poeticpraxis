import React, { Component } from 'react';

import { translations } from './translations';

import theme from '../../styles/theme';

import { Tone, Instrument, mapLetterNote } from '../../modules/tone';
import { drawNotes } from '../../modules/drawing';
import { recorder, setUpRecorder } from '../../modules/mediaRecorder';

import Loader from '../Loader';
import Canvas from '../Canvas';
import Player from '../Player';
import Button from '../Button';
import Info from '../Info';
import DownloadIcon from '../IconSVG/DownloadIcon';

import {
    LoaderConatiner,
    LinkConatiner,
    DownloadLink,
    Container,
    Title
} from './styled';

export default class Melody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completeLoading: false,
            progress: 0,
            bpm: 80,
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
            rhytmicState: { strings, elements, orderStrings }
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

        const { music, time } = this.makeLetterGramma({
            notesCount: 2,
            strings,
            elements,
            orderStrings
        });

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

        console.log(this.state.music);
    }

    setUpPlayer = () => {
        Tone.Transport.loopEnd = 1;
        Tone.Transport.loop = true;

        Tone.Transport.bpm.value = parseInt(this.state.bpm);
    };

    partCallback = (time, notes) => {
        const vowelNotes = notes.vowelNotes;
        const { music, recorded, recording } = this.state;
        const lastSoundIndex = music[music.length - 1].index;

        if (!notes.index && recorder && !recording) {
            recorder.start();
        }

        vowelNotes.forEach((note) => {
            Instrument.triggerAttackRelease(
                note.note,
                note.duration,
                time.toFixed(2)
            );
        });

        if (notes.index === lastSoundIndex && recorder && !recorded) {
            recorder.stop();
        }
    };

    makeLetterGramma = ({ notesCount, strings, elements, orderStrings }) => {
        let music = [];

        let time = 0;

        let index = 0;

        orderStrings.forEach((stringId) => {
            strings[stringId].soundGramma.forEach((tokenId) => {
                let duration = 0.1;
                let vowelNotes = [];

                if (elements[tokenId].type === 'p') {
                    time = time + duration;
                }
                if (elements[tokenId].type === 'v') {
                    const isAccented = elements[tokenId].accent === 1;
                    const char = elements[tokenId].char.toLowerCase();

                    const notes = mapLetterNote[char];

                    if (isAccented) {
                        duration = 0.3;

                        vowelNotes.push({
                            note: notes.tone,
                            duration
                        });
                    }

                    notes.main.forEach((note, index) => {
                        if (index < notesCount) {
                            vowelNotes.push({
                                note,
                                duration,
                                notation: Tone.Frequency(note, 'hz').toNote()
                            });
                        }
                    });

                    music.push({
                        string: stringId,
                        isAccented,
                        char: char,
                        time: time.toFixed(2),
                        vowelNotes,
                        index
                    });

                    ++index;

                    time = time + duration;
                }
            });
        });

        return { music, time };
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
        const { strings, orderStrings } = this.props.rhytmicState;

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
                        {!recorded && (
                            <Info>{translations[lang].INFO_RECORDING}</Info>
                        )}
                        <Container>
                            <Player
                                lang={lang}
                                play={this.play}
                                stop={this.stop}
                                progress={progress}
                                bpm={bpm}
                                setBPM={this.setBPM}
                            />

                            <Button
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
                            </Button>
                        </Container>
                        <LinkConatiner>
                            <Title>{translations[lang].NOTES}</Title>
                            <DownloadLink
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
