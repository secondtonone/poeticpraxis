import { h } from 'preact';
import { useRef } from 'preact/compat';

import wordByNumber from '@utils/wordByNumber';
import isTouchDevice from '@utils/isTouchDevice';

import { translations } from './translations';

import Button from '@components/Button';
import Flex from '@components/Flex';

import KeyboardCapslock from '@icons/KeyboardCapslock';
import ContentCopy from '@icons/ContentCopy';
import ShareIcon from '@icons/Share';

import { List, TextMinor } from '@styles/components';

import {
    StringPauseButton,
    StringPauseButtonMobile,
    CopyButton,
    FlexSided
} from './styled';

const Main = ({
    rhythmicState: {
        text,
        wordsCount = 0,
        mainMeter = {
            title: '',
            inPercent: 0
        }
    },
    lang = 'ru',
    copyToClipboard,
    shareWithLink,
    makeCaesura,
    isFocused,
    workfield
}) => {
    const isDevice = isTouchDevice();
    const stringPauseButton = useRef();
    const sectionElement = useRef();

    const mouseTracking = (e) => {
        const sectionGap = sectionElement.current
            ? sectionElement.current.offsetTop
            : 196;

        const beginButtonGap = stringPauseButton.current.offsetTop;

        const buttonHeight = 19;

        let transform = `translateY(${
            e.pageY < sectionGap
                ? 0
                : Math.ceil(
                      e.pageY - sectionGap - beginButtonGap - buttonHeight
                  )
        }px)`;

        if (stringPauseButton.current) {
            requestAnimationFrame(() => {
                stringPauseButton.current.style.transform = transform;
            });
        }
    };

    const wordsNumberString = `${wordsCount} ${wordByNumber(
        lang,
        wordsCount,
        translations[lang].rhythmic['WORDS_AMOUNT']
    )}`;

    const mainMeterString = `, ${mainMeter.title} - ${mainMeter.inPercent}%`;

    return (
        <div>
            {isDevice && isFocused && (
                <StringPauseButtonMobile
                    _rounded
                    _white
                    _big
                    type="button"
                    onClick={makeCaesura}
                    title={translations[lang].rhythmic['CAESURA']}>
                    <KeyboardCapslock _big />
                </StringPauseButtonMobile>
            )}

            <List _animated sidePaddingMobile={'0'} ref={sectionElement}>
                {!isDevice && (
                    <Flex margin="0 0 16px">
                        <CopyButton
                            _rounded
                            type="button"
                            disabled={!text}
                            onClick={copyToClipboard}
                            title={translations[lang].rhythmic['COPY']}>
                            <ContentCopy _middle />
                        </CopyButton>
                        <CopyButton
                            _rounded
                            type="button"
                            disabled={!text}
                            onClick={shareWithLink}
                            title={translations[lang].rhythmic['SHARE']}>
                            <ShareIcon _middle />
                        </CopyButton>
                    </Flex>
                )}

                <StringPauseButton ref={stringPauseButton}>
                    <Button
                        _rounded
                        _middle
                        type="button"
                        onClick={makeCaesura}
                        title={translations[lang].rhythmic['CAESURA']}>
                        <KeyboardCapslock />
                    </Button>
                </StringPauseButton>

                {workfield(mouseTracking)}

                <FlexSided justify="flex-end">
                    <TextMinor>
                        {wordsCount ? wordsNumberString : null}
                        {wordsCount && mainMeter ? mainMeterString : null}
                    </TextMinor>
                </FlexSided>
            </List>
        </div>
    );
};

export default Main;
