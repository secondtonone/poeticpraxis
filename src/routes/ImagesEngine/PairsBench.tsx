import { h, FunctionalComponent } from 'preact';
import { useCallback } from 'preact/hooks';

import { copying } from '@modules/copying';

import isTouchDevice from '@utils/isTouchDevice';

import { messages, enginePage as translations } from '@translations/index';

import Langs from '@typings/Langs';
import { Result } from '@typings/ImagesEngineModel';

import useImagineEngineActions from '@hooks/useImagineEngineActions';
import useRhythmicActions from '@hooks/useRhythmicActions';

import MatchList from '@components/MatchList';
import Button from '@components/Button';
import Flex from '@components/Flex';
import Container from '@components/Container';

import ArrowBack from '@icons/ArrowBack';
import Widgets from '@icons/Widgets';
import ContentCopy from '@icons/ContentCopy';
import List from '@components/List';

import {
    Hint,
    SecondaryTitle,
    TextMinor,
} from '@styles/components';

import { ButtonContainer } from './styled';

interface PairsBenchProps {
    result: Result, 
    pinned: string[],
    lang: Langs,
    showMessage: (textMessage: string) => void,
    pushToHistory: (location: string) => void
    toTheTop: () => void
    rhythmicText: string
}

const PairsBench: FunctionalComponent<PairsBenchProps> = ({
    result, 
    pinned,
    lang,
    showMessage,
    pushToHistory,
    toTheTop,
    rhythmicText
}) => {
    const { setEngineState } = useImagineEngineActions();
    const { setRhythmicState: sharingText } = useRhythmicActions();

    const pinMatch: React.MouseEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            const { index } = (e.target as HTMLButtonElement).dataset;

            if (index) {
                const words = result.splice(parseInt(index, 10), 1);

                const match = words[0].join(' ');

                pinned.push(match);

                showMessage(messages[lang].PAIR_ADDED);

                setEngineState({
                    pinned,
                    result
                });
                }
        },
        [result, pinned, showMessage, setEngineState, lang]
    );

    const changePin = useCallback(
        (index: number, value: string) => {
            pinned[index] = value;

            setEngineState({
                pinned
            });
        },
        [pinned, setEngineState]
    );

    const deleteMatch: React.MouseEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            const { index } = (e.target as HTMLButtonElement).dataset;

            if (index) {
                pinned.splice(parseInt(index, 10), 1);

                setEngineState({
                    pinned
                });
            }
        },
        [pinned, setEngineState]
    );

    const copyToClipboard = useCallback(() => {
        copying(pinned.join('\n'));
        showMessage(messages[lang].PAIRS_COPIED);
    }, [pinned, showMessage, lang]);

    const toRhythmic = useCallback(() => {
        const sharedText = pinned.join('\n');
        sharingText({ text: `${rhythmicText}\n${sharedText}`});
        pushToHistory('/rhythmic');
    }, [pinned, sharingText, pushToHistory, rhythmicText]);

    const pairsCountByPlatform = isTouchDevice() ? 30 : 90;

    return (
        <List _animated>
            <Container margin="0 0 32px">
                <SecondaryTitle>
                    {translations[lang].matchList['FAVORITES']}{' '}
                    <TextMinor>({pinned.length})</TextMinor>
                </SecondaryTitle>

                <MatchList
                    handler={deleteMatch}
                    list={pinned}
                    type={'cancel'}
                    changeItem={changePin}
                />

                {pinned.length ? null : (
                    <Hint>{translations[lang].matchList['FAVOR_HINT']}</Hint>
                )}
                {pinned.length ? (
                    <ButtonContainer>
                        <Button
                            _flat
                            _transparent
                            type="button"
                            margin="8px 8px"
                            onClick={copyToClipboard}>
                            {translations[lang].matchList['COPY']}{' '}
                            <ContentCopy _small padding="0 0 0 8px" />
                        </Button>
                        <Button
                            _flat
                            _transparent
                            _light-gray
                            type="button"
                            margin="8px 8px"
                            onClick={toRhythmic}>
                            {translations[lang].matchList['SEE_RHYTHM']}{' '}
                            <ArrowBack
                                _small
                                _rotate-left
                                padding="0 8px 0 0"
                            />
                        </Button>
                    </ButtonContainer>
                ) : null}
            </Container>

            <Container margin="0 0 32px">
                <SecondaryTitle>
                    {translations[lang].matchList['PAIRS']}{' '}
                    <TextMinor>({result.length})</TextMinor>
                </SecondaryTitle>
                {result.length ? null : (
                    <Hint>
                        {translations[lang].matchList['PAIRS_HINT'][0]}{' '}
                        <Widgets _small />,<br />{' '}
                        {translations[lang].matchList['PAIRS_HINT'][1]}
                    </Hint>
                )}
                <MatchList
                    handler={pinMatch}
                    list={result}
                    type={'add'}
                    compact
                />

                {result.length > pairsCountByPlatform ? (
                    <Flex justify={'center'} margin="8px 0 0">
                        <Button
                            _flat
                            _transparent
                            _light-gray
                            type="button"
                            onClick={toTheTop}>
                            {translations[lang].matchList['RETURN']}{' '}
                            <ArrowBack _small _rotate-right />
                        </Button>
                    </Flex>
                ) : null}
            </Container>
        </List>
    );
};

export default PairsBench;
