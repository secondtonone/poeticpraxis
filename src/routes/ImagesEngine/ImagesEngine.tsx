import { FunctionalComponent } from 'preact';
import { lazy, Suspense } from 'preact/compat';
import { useContext, useEffect, useState, useCallback } from 'preact/hooks';
import { useHistory } from 'react-router-dom';

import StateContext from '@contexts/stateContext';
import useImagineEngineActions from '@hooks/useImagineEngineActions';
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

import Widgets from '@icons/Widgets';
import Delete from '@icons/Delete';
import WordsIcon from '@icons/Words';

import { LeftedLayout, ActionBar } from '@styles/components';

import Help from './Help';
import Menu from './Menu';
import Material from './Material';

const PairsBench = lazy(
  () =>
    import(
      /* webpackChunkName: "PairsBench" */
      './PairsBench'
    )
);

import { MainButton } from './styled';

let clearCount = false;
const initHeight = window.innerHeight;
const translation = enginePage;

const ImagesEngine: FunctionalComponent = () => {
  const {
    Layout: { lang },
    Rhythmic: {
      currentRhythmicState: { text: rhythmicText },
    },
    ImagesEngine: {
      currentEngineState: {
        result,
        text,
        pinned,
        currentView = 'material',
        wordsNumber,
      },
    },
  } = useContext(StateContext);

  const history = useHistory();

  const { setEngineState } = useImagineEngineActions();

  const [words, setWords] = useState<string[]>(stringToWords(text));
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
      const newWords = await getWords(text.trim(), stringToWords(text).length);

      setEngineState({
        text: newWords,
      });
    } catch (error) {
      showMessage('Слова не хотят подбираться, попробуйте снова.');
    }
  }, [text, setEngineState, showMessage]);

  const handleTextInput = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) =>
      setEngineState({
        text: (e.target as HTMLTextAreaElement).value,
      }),
    [setEngineState]
  );

  const changeView = useCallback(
    (nextView: typeof currentView) =>
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
  }, [text, words, wordsNumber, showMessage, lang, changeView, setEngineState]);

  const menuHandler = useCallback(
    (nextView: typeof currentView) => {
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
  }, [showMessage, lang, setEngineState]);

  const pushToHistory = useCallback(
    (location: string) => history.push(location),
    [history]
  );

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
                text={text}
                transmitState={setEngineState}
                showMessage={showMessage}
              />
            }
            textarea={
              <Textarea
                onInput={handleTextInput}
                value={text}
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
