import { h } from 'preact';
import { useState, useCallback, useEffect, useRef, memo } from 'preact/compat';
import { translations } from './translations';
import { messages } from '@translations';

import useScrollToTop from '@hooks/useScrollToTop';
import MelodyMaker from '@modules/tone';
import Drawing from '@modules/drawing';
import { makeLetterGramma } from '@modules/melodic';

import Canvas from '@components/Canvas';
import Player from '@components/Player';
import Button from '@components/Button';
import Flex from '@components/Flex';

import { DownloadLink, Title, PlayerContainer } from './styled';

const drawing = new Drawing();
const tone = new MelodyMaker();
const { getToneModule } = MelodyMaker; 
const verticalOffset = 100;
let notePlayed = 0;
let sliderTimer = null;

const Melody = memo(({
    lang = 'ru',
    variant,
    showMessage,
    rhythmicState: { strings, elements, orderStrings }
}) => {
    const [progress, setProgress] = useState(0);
    const [bpm, setBpm] = useState(72);
    const [music, setMusic] = useState([]);

    const canvas = useRef();
    const innerHeight = useRef(window.innerHeight);

    useScrollToTop();

    useEffect(async () => {
        const setUpPlayer = () => {
            MelodyMaker.Tone.Transport.loopEnd = 1;
            MelodyMaker.Tone.Transport.loop = true;
            MelodyMaker.Tone.Transport.bpm.value = parseInt(bpm);
        };

        const followForIndicator = (index) => {
            const { vertical } = drawing.coords[index];

            if (!index || innerHeight.current / 2.5 < vertical) {
                window.scrollTo({
                    top: 100 + vertical,
                    behavior: 'smooth'
                });
            }
        };

        const partCallback = (time, notes) => {
            const vowelNotes = notes.vowelNotes;

            MelodyMaker.Instrument.volume.value = Math.floor(notes.sound);

            drawing.drawIndicator(notes.index);
            followForIndicator(notes.index);

            notePlayed = notes.index;

            vowelNotes.forEach((note) => {
                MelodyMaker.Instrument.triggerAttackRelease(
                        note.note,
                        note.duration,
                        time.toFixed(2)
                    );
            });
        };

        try {
            await getToneModule(() => import(/* webpackChunkName: "Tone" */'tone'));

            tone.getInstrument('piano');
            //tone.getInstrument('poly');

            MelodyMaker.Instrument.toMaster();

            setUpPlayer();

            const { music, time } = makeLetterGramma({
                notesCount: 1 /* 2 */,
                strings,
                elements,
                orderStrings,
                frequencyToNote: (frequency) => MelodyMaker.Tone.Frequency(frequency, 'hz').toNote()
            });

            setMusic(music);

            MelodyMaker.Tone.Transport.loopEnd = Math.round(time + 1);

            new MelodyMaker.Tone.Part(partCallback, music).start('+0.1');

            drawing.setCtx(canvas.current);
            drawing.setVariant(variant);
            drawing.updateChart(getHeightCanvas); 
            drawing.drawNotes({music, verticalOffset});
            drawing.drawIndicator(notePlayed);

        } catch (e) {
            showMessage(messages[lang].NET);
        }

        return () => stop();
    }, []);

    useEffect(() => {
        if (drawing.canvas && drawing.getVariant() !== variant) {
            drawing.setVariant(variant);
            drawing.drawNotes({ music, verticalOffset });
            drawing.drawIndicator(notePlayed);
        }
    }, [variant]);

    const play = useCallback(() => {
        MelodyMaker.Tone.Transport.start();
        sliderTimer = requestAnimationFrame(calculateProgress);
    }, [calculateProgress]);

    const stop = useCallback(() => {
        drawing.clearIndicator(notePlayed);
        notePlayed = 0;
        cancelAnimationFrame(sliderTimer);
        MelodyMaker.Tone.Transport.stop();
    }, []);

    const pause = useCallback(() => {
        cancelAnimationFrame(sliderTimer);
        MelodyMaker.Tone.Transport.pause();
    }, []);

    const calculateProgress = useCallback(() => {
        setProgress(
            Math.floor((MelodyMaker.Tone.Transport.seconds / MelodyMaker.Tone.Transport.loopEnd) * 100)
        );
        sliderTimer = requestAnimationFrame(calculateProgress);
    }, []);

    const setBPM = useCallback(
        (e) => {
            setBpm(e.target.value);
            MelodyMaker.Tone.Transport.bpm.value = parseInt(e.target.value);
        },
        []
    );

    const getHeightCanvas = useCallback(
        (width) => {
            let height = 0;

            orderStrings.forEach((stringId) => {
                height =
                    height +
                    Math.ceil(
                        (strings[stringId].soundGramma.length * 100 +
                            verticalOffset) /
                            width
                    ) *
                        verticalOffset;
            });

            return height;
        },
        [strings, orderStrings]
    );

    const downloadNote = useCallback((e) => {
        e.currentTarget.href = canvas.current.toDataURL('image/jpg');
    }, []);

    const getRef = useCallback((ref) => canvas.current = ref, []);

    return (
        <div>
            <div>
                <PlayerContainer>
                    <Player
                        lang={lang}
                        play={play}
                        stop={stop}
                        pause={pause}
                        progress={progress}
                        bpm={bpm}
                        setBPM={setBPM}
                    />
                </PlayerContainer>
                <Flex margin="0 0 24px" justify="flex-start" align="center">
                    <Title>{translations[lang].NOTES}</Title>
                    <DownloadLink
                        margin="0 24px"
                        download={'notes'}
                        href="#"
                        onClick={downloadNote}>
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

            <Canvas getRef={getRef} height={getHeightCanvas} />
        </div>
    );
});

export default Melody;
