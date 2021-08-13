import { h, FunctionalComponent } from 'preact';
import { useState, useCallback, useEffect } from 'preact/compat';

import { translations } from './translations';

import Button from '@components/Button';
import Range from '@components/Range';

import PlayIcon from '@icons/PlayIcon';
import ReplayIcon from '@icons/ReplayIcon';
import PauseIcon from '@icons/PauseIcon';

import Container from '@components/Container';
import Flex from '@components/Flex';

interface PlayerProps {
    lang: string
    bpm: number
    progress: number
    setBPM: React.FormEventHandler<HTMLInputElement>
    stop: () => void
    play: () => void
    pause: () => void
}

const Player: FunctionalComponent<PlayerProps> = ({
    lang = 'ru',
    bpm,
    progress,
    setBPM,
    stop,
    play,
    pause
}) => {
    const [isPlaying, setPlayerState] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            _stop();
        };
    }, []);

    const _play = useCallback(() => {
        setPlayerState(true);
        if (typeof play === 'function') {
            play();
        }
    }, [play]);

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

    const repeat = useCallback(() => {
        _stop();
        _play();
    }, [_play, _stop]);

    return (
        <Container>
            <Flex justify="space-between">
                <div>
                    {!isPlaying && (
                        <Button
                            _rounded
                            _transparent
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
                        onClick={repeat}
                        title={translations[lang].REPEAT}>
                        <ReplayIcon _big />
                    </Button>
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
}

export default Player;
