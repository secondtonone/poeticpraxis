//@ts-nocheck 
import { useState, useContext, useCallback, useEffect, useRef } from 'preact/hooks';
import { memo } from 'preact/compat';

import LetterGramma, { Note } from '@typings/LetterGramma';
import { translations } from './translations';
import { messages } from '@translations';

import StateContext from '@contexts/stateContext';

import useScrollToTop from '@hooks/useScrollToTop';

import MelodyMaker from '@modules/tone';
import Drawing from '@modules/drawing';
import { makeLetterGramma } from '@modules/melodic';
import { MediaRecorder } from '@modules/mediaRecorder';

import Canvas from '@components/Canvas';
import Player from '@components/Player';
import Button from '@components/Button';
import Flex from '@components/Flex';
import DownloadIcon from '@icons/DownloadIcon';

import { DownloadLink, Title, PlayerContainer } from './styled';

const DEV = process.env.NODE_ENV === 'development';
const drawing = new Drawing();
const tone = new MelodyMaker();
const recorder = new MediaRecorder();
const { getToneModule } = MelodyMaker;
const verticalOffset = 100;
let notePlayed = 0;
let sliderTimer = 0;

interface MelodyProps {
  showMessage: (message: string) => void
}

const Melody = memo<MelodyProps>(({ showMessage }) => {
  const {
    Layout: { lang, variant },
    Rhythmic: {
      currentRhythmicState: { strings, elements, orderStrings }
    }
  } = useContext(StateContext);

  const [progress, setProgress] = useState(0);
  const [bpm, setBpm] = useState(72);
  const [music, setMusic] = useState<LetterGramma['music']>([]);
  const [downloadableMelody, setDownloadableMelody] = useState<string | null>(null);
  const [isRecording, setRecording] = useState(false);

  const canvas = useRef<HTMLCanvasElement>(null);
  const innerHeight = useRef(window.innerHeight);

  useScrollToTop();

  useEffect(() => {
    (async () => {
      const setUpPlayer = () => {
        MelodyMaker.Tone.Transport.loopEnd = 1;
        MelodyMaker.Tone.Transport.loop = false;
        MelodyMaker.Tone.Transport.bpm.value = bpm;
      };

      const followForIndicator = (index: number) => {
        const { vertical } = drawing.coords[index];

        if (!index || innerHeight.current / 2.5 < vertical) {
          window.scrollTo({
            top: 100 + vertical,
            behavior: 'smooth'
          });
        }
      };

      const partCallback = (time: number, { vowelNotes, sound, index }: Note) => {

        if (sound !== undefined) MelodyMaker.Instrument.volume.value = Math.floor(sound);

        drawing.drawIndicator(index);
        followForIndicator(index);

        notePlayed = index;

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
      } catch (e) {
        showMessage(messages[lang].NET);
      }
      try {
        setUpPlayer();

        const { music, time } = makeLetterGramma({
          notesCount: 1 /* 2 */,
          strings,
          elements,
          orderStrings,
          frequencyToNote: (frequency) => MelodyMaker.Tone.Frequency(frequency, 'hz').toNote()
        });

        setMusic(music);

        if (canvas.current) drawing.setCtx(canvas.current);
        drawing.setVariant(variant);
        drawing.updateChart(getHeightCanvas);
        drawing.drawNotes({ music, verticalOffset });
        drawing.drawIndicator(notePlayed);

        await tone.getInstrument('piano');
        //tone.getInstrument('poly');

        MelodyMaker.Instrument.toDestination();

        recorder.connect(MelodyMaker.Tone, (dest) => MelodyMaker.Instrument.connect(dest));

        MelodyMaker.Tone.Transport.loopEnd = Math.round(time + 1);

        new MelodyMaker.Tone.Part(partCallback, music).start('+0.1');
      } catch (e) {
        showMessage(messages[lang].SOMETHING);
      }
    })();

    return () => stop();
  });

  useEffect(() => {
    if (drawing.canvas && drawing.getVariant() !== variant) {
      drawing.setVariant(variant);
      drawing.drawNotes({ music, verticalOffset });
      drawing.drawIndicator(notePlayed);
    }
  }, [music, variant]);

  const calculateProgress = useCallback(() => {
    setProgress(
      Math.floor((MelodyMaker.Tone.Transport.seconds / (MelodyMaker.Tone.Transport.loopEnd as number)) * 100)
    );
    sliderTimer = requestAnimationFrame(calculateProgress);
  }, []);

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

  const returning = useCallback(() => {
    stop();
    calculateProgress();
    drawing.drawIndicator(0);
  }, [calculateProgress, stop]);

  const record = useCallback(() => {
    const time = MelodyMaker.Tone?.Transport?.loopEnd || 1;
    setRecording(true);
    play();
    console.log(Math.ceil(time * 1000));
    recorder.onStart((url) => {
      stop();
      setRecording(false);
      setDownloadableMelody(url);
    }, Math.ceil(time * 1000));
    
  }, [play, stop]);

  const pause = useCallback(() => {
    cancelAnimationFrame(sliderTimer);
    MelodyMaker.Tone.Transport.pause();
  }, []);

  const setBPM: React.MouseEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { value } = e.target as HTMLInputElement;
      setBpm(parseInt(value));
      MelodyMaker.Tone.Transport.bpm.value = parseInt(value);
    },
    []
  );

  const getHeightCanvas = useCallback(
    (width = 666) => {
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

  const downloadNote: React.MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    if (canvas.current) e.currentTarget.href = canvas.current.toDataURL('image/jpg');
  }, []);

  const downloadMelody: React.MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    if (downloadableMelody) e.currentTarget.href = downloadableMelody;
  }, [downloadableMelody]);

  // @ts-ignore
  const getRef = useCallback((ref: HTMLCanvasElement) => canvas.current = ref, []);

  return (
    <div>
      <div>
        <PlayerContainer>
          <Flex justify="space-between" align="flex-end">
            <Player
              lang={lang}
              play={play}
              stop={stop}
              record={record}
              returning={returning}
              pause={pause}
              isBlocked={isRecording}
              progress={progress}
              bpm={bpm}
              setBPM={setBPM}
              withRecording={DEV}
            />
            {DEV && <DownloadLink
              download="melody.mp3"
              href="#"
              onClick={downloadMelody}
              disabled={!downloadableMelody}
            >
              <Button
                _rounded
                _transparent
                type="button"
                margin="0 0 0 16px"
              >
                <DownloadIcon _big />
              </Button>
            </DownloadLink>}
          </Flex>
        </PlayerContainer>
        <Flex margin="0 0 24px" justify="flex-start" align="center">
          <Title>{translations[lang].NOTES}</Title>
          <DownloadLink
            margin="0 24px"
            download={'notes'}
            href="#"
            onClick={downloadNote}
          >
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

      <Canvas getRef={getRef} height={getHeightCanvas(canvas.current?.offsetWidth)} />
    </div>
  );
});

export default Melody;
