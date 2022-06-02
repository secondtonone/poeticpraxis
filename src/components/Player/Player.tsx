import { FunctionalComponent } from 'preact';
import { useState, useCallback, useEffect } from 'preact/compat';

import { translations } from './translations';

import Button from '@components/Button';
import Range from '@components/Range';

import PlayIcon from '@icons/PlayIcon';
import ReplayIcon from '@icons/ReplayIcon';
import PauseIcon from '@icons/PauseIcon';
import Return from '@icons/Return';

import Container from '@components/Container';
import Flex from '@components/Flex';
import Langs from '@typings/Langs';

interface PlayerProps {
  lang: Langs
  bpm: number
  progress: number
  setBPM: React.FormEventHandler<HTMLInputElement>
  isBlocked?: boolean
  withRecording?: boolean
  stop?: () => void
  play?: () => void
  pause?: () => void
  record?: () => void
  returning?: () => void
}

const Player: FunctionalComponent<PlayerProps> = ({
  lang = 'ru',
  bpm,
  progress,
  setBPM,
  stop,
  play,
  record,
  isBlocked,
  returning,
  pause,
  withRecording
}) => {
  const [isPlaying, setPlayerState] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      _stop();
    };
  });

  const _play = useCallback(() => {
    setPlayerState(true);
    if (typeof play === 'function') {
      play();
    }
  }, [play]);

  const _record = useCallback(() => {
    setPlayerState(true);
    if (typeof record === 'function') {
      record();
    }
  }, [record]);

  const _stop = useCallback(() => {
    setPlayerState(false);
    if (typeof stop === 'function') {
      stop();
    }
  }, [stop]);

  const _pause = useCallback(() => {
    setPlayerState(false);
    if (typeof pause === 'function') {
      pause();
    }
  }, [pause]);

  const _repeat = useCallback(() => {
    _stop();
    _play();
  }, [_play, _stop]);

  const _returning = useCallback(() => {
    if (typeof returning === 'function') {
      setPlayerState(false);
      returning();
    }
  }, [returning]);

  return (
    <Container>
      <Flex justify="space-between">
        <div>
          {!isPlaying && (
            <Button
              _rounded
              _transparent
              disabled={isBlocked}
              type="button"
              onClick={_play}
              title={translations[lang].PLAY}>
              <PlayIcon _big />
            </Button>
          )}
          {isPlaying && (
            <Button
              _rounded
              _transparent
              disabled={isBlocked}
              type="button"
              onClick={_pause}
              title={translations[lang].STOP}>
              <PauseIcon _big />
            </Button>
          )}
          <Button
            _rounded
            _transparent
            type="button"
            disabled={isBlocked}
            onClick={_repeat}
            title={translations[lang].REPEAT}>
            <Return _big />
          </Button>
          <Button
            _rounded
            _transparent
            type="button"
            disabled={isBlocked}
            onClick={_returning}
            title={translations[lang].RETURN}>
            <ReplayIcon _big />
          </Button>
          {withRecording && <Button
            _rounded
            _transparent
            type="button"
            disabled={isBlocked}
            onClick={_record}
            title={translations[lang].RECORD}>
            <Container top="-10px" height="0px">REC</Container>
          </Button>}
        </div>
        <div>
          {translations[lang].TEMPO}
          <Range
            value={bpm}
            min="20"
            max="200"
            onChange={setBPM}
          />
        </div>
      </Flex>
      <div>
        <Range
          hideThumb
          value={progress}
          min="0"
          max="100"
          disabled
        />
      </div>
    </Container>
  );
};

export default Player;
