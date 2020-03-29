import { h } from 'preact';
import { useState, useRef, useEffect, useCallback } from 'preact/compat';

import useTitlePage from '@hooks/useTitlePage';
import useMessage from '@hooks/useMessage';

import isTouchDevice from '@utils/isTouchDevice';

import { translations } from './translations';

import {
    getLongLink,
    sharing,
    encodeDictionary,
    linkToStateDecode
} from '@modules/sharing';

import {
    getToneModule,
    Tone,
    getInstrument,
    Instrument
} from '@modules/tone';

import Help from './Help';
import RhythmicMenu from './RhythmicMenu';
import Workbench from './Main';
import ActionBar from './ActionBar';

import Workfield from '@components/Workfield';
import MessageBox from '@components/MessageBox';
import Melody from '@components/Melody';
import Zoom from '@components/Zoom';

import {
    List,
    LeftedLayout
} from '@styles/components';

const Rhythmic = ({
    setRhytmicState,
    setWordsDictionary,
    rhythmicState,
    wordsDictionary,
    lang = 'ru',
    variant = 'light'
}) => {

    const {
        text,
        stringsDictionary
    } = rhythmicState;

    const workfield = useRef();

    const [textMessage, showMessage] = useMessage();
    const [ zoomIn, setZoom ] = useState(false);
    const [ isFocused, setFocus ] = useState(false);
    const [ isEditable, setEditableMode ] = useState(true);
    const [ currentView, setView ] = useState('rhythmic');

    const isDevice = isTouchDevice();
    const title = `${lang === 'ru' ? 'ПРОСОДИЯ' : 'PROSODY'}${
            text
                ? ` - ${text.substring(0, 30)}...`
                : ''}`;

    useTitlePage(title);

    useEffect(async () => {
        window.scrollTo(0, 0);

        if (URLSearchParams) {
            getShared();
        }
        /* для преждевременной загрузки звуков */
        try {
            if (!Tone) {
                await getToneModule();
            }

            if (!Instrument) {
                getInstrument('piano');
                //getInstrument('poly');
            }
        } catch (e) {
            showMessage(translations[lang].messages['NET']);
        }
    }, []);

    const getShared = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);

        let shared = searchParams.get('shared');

        linkToStateDecode(
            shared,
            ({ text, stringsDictionary }) => {
                stringsDictionary = {
                    ...rhythmicState.stringsDictionary,
                    ...stringsDictionary
                };

                setRhytmicState({
                    text,
                    stringsDictionary
                });
            },
            () => {
                showMessage(translations[lang].messages['WRONG']);
            }
        );
    }, [stringsDictionary, lang]);

    const copyToClipboard = useCallback(() => {
        workfield.current.copyToClipboard();
        showMessage(translations[lang].messages['COPIED']);
    }, [lang]);

    const makeCaesura = () => {
        workfield.current.makeCaesura();
    };

    const changeMode = useCallback(() => {
        setEditableMode(!isEditable);

        zoomOutHandler();
    }, [isEditable]);

    const zoomInHandler = () => {
        const zoomIn = true;
        setZoom(zoomIn);
        workfield.current.changeZoomMode(zoomIn);
    }

    const zoomOutHandler = () => {
        const zoomIn = false;
        setZoom(zoomIn);
        workfield.current.changeZoomMode(zoomIn);
    }

    const focusHandler = useCallback((isFocused) => {
        setTimeout(() => {
            setFocus(isEditable ? isFocused : false);
        }, 100);
    }, [isEditable]);

    const shareWithLink = useCallback(() => {
        const sharedText = JSON.stringify([
            text,
            encodeDictionary({ text, stringsDictionary })
        ]);

        let link = getLongLink(sharedText);

        sharing(link);

        showMessage(translations[lang].messages['LINK_COPIED']);
    }, [text, stringsDictionary, lang]);

    const zoomHandler = useCallback(() => {
        if (isEditable) {
            changeMode();
        }
        if (zoomIn) {
            zoomOutHandler();
        } else {
            zoomInHandler();
        }
    }, [isEditable, zoomIn]);

    return (
        <section>
            <MessageBox text={textMessage} bottom={120} />
            <RhythmicMenu
                handler={setView}
                current={currentView}
                lang={lang}
                text={text}
            />
            {currentView === 'rhythmic' && isDevice && !isFocused && (
                <ActionBar
                    text={text}
                    lang={lang}
                    zoomIn={zoomIn}
                    isEditable={isEditable}
                    copyToClipboard={copyToClipboard}
                    shareWithLink={shareWithLink}
                    zoomHandler={zoomHandler}
                    changeMode={changeMode}
                />
            )}
            <LeftedLayout>
                <Help lang={lang} />

                {currentView === 'rhythmic' && (
                    <Zoom onZoomIn={zoomHandler} onZoomOut={zoomHandler}>
                        <Workbench
                            rhythmicState={rhythmicState}
                            lang={lang}
                            copyToClipboard={copyToClipboard}
                            shareWithLink={shareWithLink}
                            makeCaesura={makeCaesura}
                            isFocused={isFocused}
                            workfield={(mouseTracking) => (
                                <Workfield
                                    text={text}
                                    placeHolder={`${translations[lang].placeholders['RHYTHMICS']}...`}
                                    readOnly={!isEditable}
                                    lang={lang}
                                    wordsDictionary={wordsDictionary}
                                    setWordsDictionary={setWordsDictionary}
                                    stringsDictionary={stringsDictionary}
                                    onMouseMove={mouseTracking}
                                    onError={showMessage}
                                    onFocus={focusHandler}
                                    onUpdate={setRhytmicState}
                                    ref={workfield}
                                />
                            )}
                        />
                    </Zoom>
                )}

                {currentView === 'melody' && (
                    <List>
                        <Melody
                            lang={lang}
                            variant={variant}
                            rhythmicState={rhythmicState}
                        />
                    </List>
                )}
            </LeftedLayout>
        </section>
    );
}

export default Rhythmic;
