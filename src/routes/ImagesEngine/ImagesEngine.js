import { h } from 'preact';
import { lazy, Suspense, useState, useCallback } from 'preact/compat';

import useTitlePage from '@hooks/useTitlePage';
import useMessage from '@hooks/useMessage';
import useScrollToTop from '@hooks/useScrollToTop';

import { imaged, stringToWords } from '@modules/imaged';
import { getWords } from '@modules/dictionary';

import isTouchDevice from '@utils/isTouchDevice';

import { translations } from './translations';

import Recorder from '@components/Recorder';
import Textarea from '@components/Textarea';
import Button from '@components/Button';
import MessageBox from '@components/MessageBox';
import Loader from '@components/Loader';

import Widgets from '@icons/Widgets';
import Delete from '@icons/Delete';
import WordsIcon from '@icons/Words';

import {
    FieldEditableArea,
    LeftedLayout,
    ActionBar
} from '@styles/components';

import Help from './Help';
import Menu from './Menu';
import Material from './Material';

const PairsBench = lazy(() =>
    import(
        /* webpackChunkName: "PairsBench" */
        /* webpackPreload: true */
        './PairsBench'
    )
);

import { MainButton } from './styled';

let clearCount = false;
const initHeight = window.innerHeight;

const ImagesEngine = ({
    setEngineState,
    engineState: {
        result,
        text,
        pinned,
        currentView = 'material',
        wordsNumber
    },
    lang = 'ru',
    sharingText,
    history
}) => {
    /* для апдейта страницы */
    const [field, setField] = useState({});
    const [words, setWords] = useState(stringToWords(text));
    const [textMessage, showMessage] = useMessage();
    const [isDisabledWordsview, setIsDisabledWordsview] = useState(
        !result.length
    );

    const title = `${lang === 'ru' ? 'МАШИНА ОБРАЗОВ' : 'EMAGES ENGINE'}${
        text ? ` - ${text.substring(0, 30)}...` : ''
    }`;

    useTitlePage(title);
    useScrollToTop();

    const getDictionaryWords = useCallback(async () => {
        try {
            const prevText = text;
            const wordsLength = words.length;

            const newText = await getWords(prevText, wordsLength);

            setEngineState({
                text: newText
            });
        } catch (error) {
            showMessage('Слова не хотят подбираться, попробуйте снова.');
        }
    }, [text, setEngineState]);

    const handleTextInput = useCallback((e) => {
        let text = e.target.value;

        setEngineState({
            text
        });

        setWords(stringToWords(text));
    }, [setEngineState]);

    const changeView = useCallback((currentView) => {
        setEngineState({
            currentView
        });
    }, [setEngineState]);

    const getResult = useCallback(() => {
        /*let words = this.state.text.toLowerCase().match(/[a-zA-ZА-Яа-яёЁ\-]+/g) || [];*/
        let words = stringToWords(text);

        const result = imaged(words, wordsNumber);

        toTheTop();

        showMessage(translations[lang].messages['PAIRS_READY']);

        changeView('words');

        setIsDisabledWordsview(false);

        setEngineState({
            result
        });
    }, [text, wordsNumber, lang, setEngineState]);

    /* const setWordsNumber = (e) => {
        const wordsNumber = e.target.value;

        setEngineState({
            wordsNumber
        });
    }; */

    const clearInput = useCallback(() => {
        if (!clearCount) {
            clearCount = true;
            showMessage(translations[lang].messages['CLICK_MORE']);
        } else {
            clearCount = false;
            toTheTop();

            setEngineState({
                text: ''
            });

            setWords([]);
        }
    }, [setEngineState, lang]);

    const pushToHistory = useCallback((location) => history.push(location), [history]);

    const toTheTop = () => {
        window.scrollTo(0, 0);
    };

    const heightForKeyboard = Math.floor(initHeight / 1.3);

    const isDevice = isTouchDevice();

    const isRusLang = lang === 'ru';

    return (
        <section>
            <Menu
                isDisabledWordsview={isDisabledWordsview}
                handler={changeView}
                current={currentView}
                lang={lang}
            />
            <ActionBar minHeight={`${heightForKeyboard}px`}>
                {currentView === 'material' && (
                    <Button
                        _rounded
                        _transparent
                        disabled={!text.length}
                        type="button"
                        onClick={clearInput}
                        title={translations[lang].engine['CLEAR']}>
                        <Delete _middle />
                    </Button>
                )}
                {currentView === 'material' && isRusLang && (
                    <Button
                        _rounded
                        _transparent
                        type="button"
                        onClick={getDictionaryWords}
                        title={translations[lang].engine['GET']}>
                        <WordsIcon _middle />
                    </Button>
                )}
            </ActionBar>
            {isDevice ? (
                <MainButton
                    _rounded
                    _main
                    _animated-up
                    _centred
                    type="button"
                    minHeight={`${heightForKeyboard}px`}
                    onClick={getResult}
                    disabled={!text}
                    title={translations[lang].engine['MONTAGE']}>
                    <Widgets _big />
                </MainButton>
            ) : (
                <MainButton
                    _main
                    _action
                    _animated-up
                    width="160px"
                    size={16}
                    type="button"
                    disabled={!text}
                    onClick={getResult}>
                    <Widgets _small /> {translations[lang].engine['MONTAGE']}
                </MainButton>
            )}

            <LeftedLayout>
                <Help lang={lang} />
                {currentView === 'material' && (
                    <Material
                        text={text}
                        lang={lang}
                        getWords={getDictionaryWords}
                        recorder={
                            <Recorder
                                lang={lang}
                                title={translations[lang].engine['RECORD']}
                                text={text}
                                transmitState={setEngineState}
                                showMessage={showMessage}
                            />
                        }
                        textarea={
                            <Textarea
                                onInput={handleTextInput}
                                value={text}
                                Textarea={FieldEditableArea}
                                getMeasure={setField}
                                placeHolder={`${translations[lang].placeholders['ENGINE']}...`}
                            />
                        }
                    />
                )}

                {currentView === 'words' && (
                    <Suspense fallback={<Loader />}>
                        <PairsBench
                            result={result}
                            pinned={pinned}
                            lang={lang}
                            setEngineState={setEngineState}
                            sharingText={sharingText}
                            showMessage={showMessage}
                            pushToHistory={pushToHistory}
                            toTheTop={toTheTop}
                        />
                    </Suspense>
                )}
            </LeftedLayout>
            <MessageBox text={textMessage} bottom={104} />
        </section>
    );
};

export default ImagesEngine;
