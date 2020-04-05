import { h } from 'preact';
import { useState, useCallback, useEffect } from 'preact/compat';

import { translations } from './translations';

import Button from '@components/Button';
import Range from '@components/Range';

import PlayIcon from '@icons/PlayIcon';
import ReplayIcon from '@icons/ReplayIcon';
import PauseIcon from '@icons/PauseIcon';

import Container from '@components/Container';
import Flex from '@components/Flex';

export default function Player({
    lang = 'ru',
    bpm,
    progress,
    setBPM,
    stop,
    play,
    pause
}) {
    const [isPlaying, setPlayerState] = useState(false);

    useEffect(() => {
        return () => {
            _stop();
        };
    }, []);

    const _play = useCallback(() => {
        setPlayerState(true);
        if (play) {
            play();
        }
    }, [play]);

    const _stop = useCallback(() => {
        setPlayerState(false);
        if (stop) {
            stop();
        }
    }, [stop]);

    const _pause = useCallback(() => {
        setPlayerState(false);
        if (pause) {
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
                        type="range"
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
                    type="range"
                    value={progress}
                    min="0"
                    max="100"
                    disabled
                />
            </div>
        </Container>
    );
}
