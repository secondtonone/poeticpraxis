import { h } from 'preact';
import {
    lazy,
    Suspense,
    useState,
    useCallback,
    useEffect,
} from 'preact/compat';

import useTitlePage from '@hooks/useTitlePage';
import useMessage from '@hooks/useMessage';
import useScrollToTop from '@hooks/useScrollToTop';
import useChangeHreflang from '@hooks/useChangeHreflang';

import { imaged, stringToWords } from '@modules/imaged';
import { getWords } from '@modules/dictionary';

import isTouchDevice from '@utils/isTouchDevice';

import { enginePage, messages } from '@translations';

import Recorder from '@components/Recorder';
import Textarea from '@components/Textarea';
import Button from '@components/Button';
import MessageBox from '@components/MessageBox';
import Loader from '@components/Loader';
import FieldEditableArea from '@components/FieldEditableArea';

import Widgets from '@icons/Widgets';
import Delete from '@icons/Delete';
import WordsIcon from '@icons/Words';

import { LeftedLayout, ActionBar } from '@styles/components';

import Help from './Help';
import Menu from './Menu';
import Material from './Material';

const PairsBench = lazy(() =>
    import(
        /* webpackChunkName: "PairsBench" */
        './PairsBench'
    )
);

import { MainButton } from './styled';

let clearCount = false;
const initHeight = window.innerHeight;
const translation = enginePage;

const ImagesEngine = ({
    setEngineState,
    engineState: {
        result,
        text,
        pinned,
        currentView = 'material',
        wordsNumber,
    },
    rhythmicText,
    lang = 'ru',
    sharingText,
    history,
}) => {
    const [words, setWords] = useState(stringToWords(text));
    const [textMessage, showMessage] = useMessage();
    /* const [isDisabledWordsview, setIsDisabledWordsview] = useState(
        !result.length
    ); */
    const title = `${translation[lang].main['TITLE']}${
        text ? ` - ${text.substring(0, 30)}...` : ''
    }`;

    useChangeHreflang('images-engine');
    useTitlePage(title);
    useScrollToTop();

    useEffect(() => setWords(stringToWords(text)), [text]);

    const getDictionaryWords = useCallback(async () => {
        try {
            const newWords = await getWords(text.trim(), stringToWords(text));

            setEngineState({
                text: newWords,
            });
        } catch (error) {
            showMessage('Слова не хотят подбираться, попробуйте снова.');
        }
    }, [text, setEngineState]);

    const handleTextInput = useCallback(
        (e) =>
            setEngineState({
                text: e.target.value,
            }),
        [setEngineState]
    );

    const changeView = useCallback(
        (nextView) =>
            setEngineState({
                currentView: nextView,
            }),
        [setEngineState]
    );

    const getResult = useCallback(() => {
        /*let words = this.state.text.toLowerCase().match(/[a-zA-ZА-Яа-яёЁ\-]+/g) || [];*/
        console.log(text, words);
        const result = imaged(stringToWords(text), wordsNumber);
        
        toTheTop();
        
        showMessage(messages[lang].PAIRS_READY);
        
        changeView('words');
        
        //setIsDisabledWordsview(false);
        
        setEngineState({
            result,
        });
    }, [text, wordsNumber, lang, setEngineState]);
    
    const menuHandler = useCallback(
        (nextView) => {
            if (nextView === 'words' && !result.length) {
                getResult();
            } else {
                changeView(nextView);
            }
        },
        [changeView, getResult, result]
    );
    /* const setWordsNumber = (e) => {
        const wordsNumber = e.target.value;

        setEngineState({
            wordsNumber
        });
    }; */

    const clearInput = useCallback(() => {
        if (!clearCount) {
            clearCount = true;
            showMessage(messages[lang].CLICK_MORE);
        } else {
            clearCount = false;
            toTheTop();

            setEngineState({
                text: '',
            });
        }
    }, [setEngineState, lang]);

    const pushToHistory = useCallback((location) => history.push(location), [
        history,
    ]);

    const toTheTop = () => {
        window.scrollTo(0, 0);
    };

    const heightForKeyboard = Math.floor(initHeight / 1.3);

    const isDevice = isTouchDevice();

    const isRusLang = lang === 'ru';

    return (
        <section>
            <Menu
                isDisabledWordsview={
                    words.length < 4 && !result.length && !pinned.length
                }
                isResultReady={
                    words.length > 3 && !result.length && !pinned.length
                }
                handler={menuHandler}
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
                        title={translation[lang].engine['CLEAR']}>
                        <Delete _middle />
                    </Button>
                )}
                {currentView === 'material' && isRusLang && (
                    <Button
                        _rounded
                        _transparent
                        type="button"
                        onClick={getDictionaryWords}
                        title={translation[lang].engine['GET']}>
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
                    title={translation[lang].engine['MONTAGE']}>
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
                    <Widgets _small /> {translation[lang].engine['MONTAGE']}
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
                                title={translation[lang].engine['RECORD']}
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
                                placeHolder={`${translation[lang].placeholders['ENGINE']}...`}
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
                            rhythmicText={rhythmicText}
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
