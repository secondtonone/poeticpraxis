import { h, Component } from 'preact';

import { translations } from './translations';

import theme from '../../styles/theme';

import {
    getToneModule,
    Tone,
    getInstrument,
    Instrument,
    mapLetterNote
} from '../../modules/tone';

import { recorder, setUpRecorder } from '../../modules/mediaRecorder';

import Loader from '../../components/Loader';
import Canvas from '../../components/Canvas';
import Player from '../../components/Player';

import { LoaderConatiner, LinkConatiner, DownloadLink } from './styled';

export default class Melody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completeLoading: false,
            progress: 0,
            bpm: 80,
            music: [],
            recorded: false
        };

        this.verticalOffset = 100;

        this.containerWidth = 666;

        this.sliderTimer = null;

        this.canvas = null;

        this.canvasContainer = null;

        this.canvasTimer = null;

        this.downloadableMelody = null;

        this.currentNote = 0;
    }

    async componentDidMount() {
        window.scrollTo(0, 0);

        if (!Tone) {
            await getToneModule();
        }

        if (!Instrument) {
            await getInstrument('piano');

            Instrument.toMaster();
        }

        setUpRecorder(Instrument, (result) => {
            this.setState({
                recorded: true
            });
            this.downloadableMelody = result;
        });

        this.setState({
            completeLoading: true
        });

        this.setUpPlayer();

        this.makeLetterGramma(2);

        this.canvasTimer = requestAnimationFrame(this.drawNotes);
    }

    setUpPlayer = () => {
        Tone.Transport.loopEnd = 1;
        Tone.Transport.loop = true;

        Tone.Transport.bpm.value = parseInt(this.state.bpm);
    };

    makeLetterGramma = (notesCount) => {
        let music = [];
        const { strings, elements, orderStrings } = this.props.rhytmicState;

        let time = 0;

        orderStrings.forEach((stringId, index) => {
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
                        duration = 0.15;

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

                    time = time + duration;
                }
            });
        });

        this.setState({
            music
        });

        Tone.Transport.loopEnd = Math.round(time + 0.1);

        let part = new Tone.Part((time, notes) => {
            const vowelNotes = notes.vowelNotes;
            this.currentNote = notes.index;

            vowelNotes.forEach((note) => {
                Instrument.triggerAttackRelease(
                    note.note,
                    note.duration,
                    time.toFixed(2)
                );
            });
        }, music).start('+0.1');
    };

    componentWillUnmount() {
        cancelAnimationFrame(this.canvasTimer);
    }

    play = () => {
        Tone.Transport.start();
        recorder.start();

        this.canvasTimer = requestAnimationFrame(this.drawNotes);
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
        cancelAnimationFrame(this.canvasTimer);
        recorder.stop();
        Tone.Transport.stop();
    };

    setBPM = (e) => {
        this.setState({
            bpm: e.target.value
        });

        Tone.Transport.bpm.value = parseInt(e.target.value);
    };

    drawNotes = () => {
        const ctx = this.canvas.getContext('2d');

        const music = this.state.music;

        const canvasWidth = this.canvas.offsetWidth;

        let verticalOffset = this.verticalOffset;

        ctx.textAlign = 'center';
        ctx.font = '18px Montserrat';
        ctx.fillStyle = theme[this.props.variant].secondColor;

        let horizontal = 0;

        let vertical = 0;

        const drawNote = (note, index) => {
            let notes = '';
            let frequents = '';
            let string = note.string;

            note.vowelNotes.forEach((note) => {
                if (note.notation) {
                    notes = `${notes}${note.notation}`;
                    frequents = `${frequents}  ${note.note}hz`;
                }
            });

            const char = note.char;

            const isAccented = note.isAccented;

            if (
                horizontal >= canvasWidth - verticalOffset ||
                (lastString && !(string === lastString))
            ) {
                vertical = vertical + verticalOffset;
                horizontal = 0;
            }

            this.drawCell({
                ctx,
                note: { notes, frequents, isAccented, char },
                horizontal,
                vertical
            });

            lastString = string;

            horizontal = horizontal + verticalOffset;
        };

        const currentNote = music[this.currentNote];

        console.log(currentNote);

        // this.drawCell({
        //     ctx,
        //     note: { notes, frequents, isAccented, char },
        //     horizontal,
        //     vertical
        // });

        drawNote(currentNote);

        vertical = vertical + verticalOffset;

        let lastString = '';

        music.forEach(drawNote);

        cancelAnimationFrame(this.canvasTimer);
        this.canvasTimer = requestAnimationFrame(this.drawNotes);
    };

    drawCell = ({
        ctx,
        note: { isAccented, char, frequents, notes },
        horizontal,
        vertical
    }) => {
        vertical = vertical + 20;
        if (isAccented) {
            ctx.fillStyle = theme[this.props.variant].accentColor;
        }
        ctx.fillText(char, horizontal + 60, vertical);
        ctx.font = '10px Montserrat';
        ctx.fillStyle = theme[this.props.variant].grayColor;
        //ctx.fillText('Т', horizontal + 50, vertical);
        ctx.font = '20px Montserrat';
        ctx.fillStyle = theme[this.props.variant].secondColor;
        vertical = vertical + 20;
        ctx.fillText(notes, horizontal + 60, vertical);
        ctx.font = '10px Montserrat';
        ctx.fillStyle = theme[this.props.variant].grayColor;
        vertical = vertical + 12;
        ctx.fillText(frequents, horizontal + 60, vertical);
        ctx.font = '18px Montserrat';
        ctx.fillStyle = theme[this.props.variant].secondColor;
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
                Math.ceil((strings[stringId].soundGramma.length * 90) / width) *
                    this.verticalOffset;
        });

        return height;
    };

    downloadNote = (e) => {
        e.target.href = this.canvas.toDataURL('image/jpg');
    };

    downloadMelody = (e) => {
        e.target.href = this.downloadableMelody;
    };

    render(
        { lang = 'ru', variant },
        { completeLoading, bpm, progress, recorded }
    ) {
        return (
            <div
                ref={(ref) => {
                    this.canvasContainer = ref;
                }}>
                {completeLoading ? (
                    <div>
                        <Player
                            lang={lang}
                            play={this.play}
                            stop={this.stop}
                            progress={progress}
                            bpm={bpm}
                            setBPM={this.setBPM}
                        />
                        <LinkConatiner>
                            <DownloadLink
                                download={'notes'}
                                href=""
                                onClick={this.downloadNote}>
                                Скачать ноты
                            </DownloadLink>

                            {recorded && (
                                <DownloadLink
                                    download={'melody'}
                                    href=""
                                    onClick={this.downloadMelody}>
                                    Скачать мелодию
                                </DownloadLink>
                            )}
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
