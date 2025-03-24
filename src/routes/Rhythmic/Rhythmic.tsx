import type { FunctionalComponent } from 'preact';
import { Suspense, lazy } from 'preact/compat';
import { useContext, useEffect, useState, useCallback } from 'preact/hooks';

import type { RhythmicViews } from '@typings/RhythmicViews';

import StateContext from '@contexts/stateContext';

import useRhythmicActions from '@hooks/useRhythmicActions';
import useTitlePage from '@hooks/useTitlePage';
import useMessage from '@hooks/useMessage';
import useScrollToTop from '@hooks/useScrollToTop';
import useChangeHreflang from '@hooks/useChangeHreflang';

import isTouchDevice from '@utils/isTouchDevice';

import { rhythmicPage as translations, messages } from '@translations';

import {
  getLongLink,
  sharing,
  encodeDictionary,
  linkToStateDecode
} from '@modules/sharing';

import Help from './Help';
import RhythmicMenu from './Menu';
import Workbench from './Main';
import ActionBar from './ActionBar';

import Workfield from '@components/Workfield';
import MessageBox from '@components/MessageBox';
import Zoom from '@components/Zoom';
import Loader from '@components/Loader';
import List from '@components/List';

const Melody = lazy(() =>
  import(
    /* webpackChunkName: "Melody" */
    '@components/Melody'
  )
);

import {
  LeftedLayout
} from '@styles/components';


let makeCaesura = () => {};
let copyToClipboardHandler = () => {};

const Rhythmic: FunctionalComponent = () => {
  const {
    Layout: { lang },
    Rhythmic: {
      currentRhythmicState: rhythmicState,
      wordsDictionary
    }
  } = useContext(StateContext);

  const { setRhythmicState } = useRhythmicActions();

  const { 
    text,
    stringsDictionary
  } = rhythmicState;

  const [ textMessage, showMessage ] = useMessage();
  const [ zoomIn, setZoom ] = useState(false);
  const [ isFocused, setFocus ] = useState(false);
  const [ isEditable, setEditableMode ] = useState(true);
  const [ isAnalyzeReady, setAnalyzeStatus] = useState(false);
  const [ currentView, setView ] = useState<RhythmicViews>('rhythmic');

  const isDevice = isTouchDevice();
  const title = `${translations[lang].main['TITLE']}${
    text ? ` - ${text.substring(0, 30)}...` : ''
  }`;
    
  useChangeHreflang('rhythmic');
  useTitlePage(title);
  useScrollToTop();

  useEffect(() => {
    (async () => {
      if (URLSearchParams) {
        getShared();
      }
    })();
  }, []);

  const getShared = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);

    const shared = searchParams.get('shared');

    linkToStateDecode(
      shared,
      ({ text, stringsDictionary }) => {
        stringsDictionary = {
          ...rhythmicState.stringsDictionary,
          ...stringsDictionary
        };

        setRhythmicState({
          text,
          stringsDictionary
        });
      },
      () => {
        showMessage(messages[lang].WRONG);
      }
    );
  }, [stringsDictionary, lang]);

  const copyToClipboard = useCallback(() => {
    copyToClipboardHandler();
    showMessage(messages[lang].COPIED);
  }, [lang]);

  const setCopyToClipboardHandler = useCallback((handler: () => void) => {
    copyToClipboardHandler = handler;
  }, []);

  const setMakeCaesuraHandler = useCallback((handler: () => void) => {
    makeCaesura = handler;
  },[]);

  const changeMode = useCallback(() => {
    setEditableMode((isEditable) => !isEditable);
    zoomOutHandler();
  }, []);

  const zoomInHandler = () => {
    const zoomIn = true;
    setZoom(zoomIn);
  };

  const zoomOutHandler = () => {
    const zoomIn = false;
    setZoom(zoomIn);
  };

  const focusHandler = useCallback((isFocused: boolean) => {
    setTimeout(() => {
      setFocus(isEditable ? isFocused : false);
    }, 100);
  }, [isEditable]);

  const shareWithLink = useCallback(() => {
    const sharedText = JSON.stringify([
      text,
      encodeDictionary({ text, stringsDictionary })
    ]);

    const link = getLongLink(sharedText);

    sharing(link);

    showMessage(messages[lang].LINK_COPIED);
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

  const onTextLintingStart = useCallback(() => {
    setAnalyzeStatus(false);
  }, []);

  const onTextLintingEnd = useCallback(() => {
    if (text && text.length > 0) {
      setAnalyzeStatus(true);
    } else {
      setAnalyzeStatus(false);
    }
  }, [text]);

  return (
    <section>
      <MessageBox text={textMessage} bottom={120} />
      <RhythmicMenu
        handler={setView}
        current={currentView}
        lang={lang}
        isAnalyzeReady={isAnalyzeReady}
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
        <Help />

        {currentView === 'rhythmic' && (
          <Zoom onZoomIn={zoomHandler} onZoomOut={zoomHandler}>
            <Workbench
              copyToClipboard={copyToClipboard}
              shareWithLink={shareWithLink}
              makeCaesura={makeCaesura}
              isFocused={isFocused}
              workfield={(mouseTracking: React.MouseEventHandler<HTMLTextAreaElement>) => (
                <Workfield
                  text={text}
                  placeHolder={`${translations[lang].placeholders['RHYTHMICS']}...`}
                  zoomIn={zoomIn}
                  readOnly={!isEditable}
                  lang={lang}
                  wordsDictionary={wordsDictionary}
                  stringsDictionary={stringsDictionary}
                  onMouseMove={mouseTracking}
                  onError={showMessage}
                  onFocusing={focusHandler}
                  isNotStandAlone
                  onTextLintingStart={onTextLintingStart}
                  onTextLintingEnd={onTextLintingEnd}
                  setMakeCaesuraHandler={
                    setMakeCaesuraHandler
                  }
                  setCopyToClipboardHandler={
                    setCopyToClipboardHandler
                  }
                />
              )}
            />
          </Zoom>
        )}

        {currentView === 'melody' && (
          <List>
            <Suspense fallback={<Loader />}>
              <Melody
                showMessage={showMessage}
              />
            </Suspense>
          </List>
        )}
      </LeftedLayout>
    </section>
  );
};

export default Rhythmic;
