import { createRef, type FunctionalComponent } from 'preact';
import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'preact/hooks';

import Workfield, { type WorkfieldProps } from './Workfield';
import { Overflowed } from './styled';
import { translations } from './translations';

/* import hashFunction from '@utils/hashFunction'; */
import fontReady from '@utils/fontReady';
import { copyFrom } from '@modules/copying';

import {
  structure,
  textAnalyzer,
  tagMakerPromise,
  makeCaesura,
  makeAccent,
  rhythmPresets,
  accents,
  getAnalyzedTextFromWorker,
} from '@modules/workfield';
import type {
  ILetterElement,
  IStructure,
  IWordElement,
} from '@modules/workfield/structure';
import type { IDictionary } from '@modules/workfield/dictionary';
import useRhythmicActions from '@hooks/useRhythmicActions';
import type { TextAnalyzerResult } from '@modules/workfield/textAnalyzer';
import type { MakeAccentResult } from '@modules/workfield/makeAccent';
import type { AccentTypes } from '@modules/workfield/accents';
import useEffectOnce from '@hooks/useEffectOnce';

let timerLintingRAF = 0;
let timerLinting = 0;
let timerPaintFieldHandler = 0;

let preventPaintFieldHandler = false;
let lineHeight = 1;
let textAnalyzingWorker: Worker | null = null;

type State = IStructure & { stage: 'lint' | 'children' };

interface WorkfieldContainerProps extends WorkfieldProps {
  text: string;
  isNotStandAlone?: boolean;
  viewOnly?: boolean;
  readOnly?: boolean;
  onFocusing?: (isFocus: boolean) => void;
  setMakeCaesuraHandler?: (handler: () => void) => void;
  setCopyToClipboardHandler?: (handler: () => void) => void;
  onTextLintingStart?: () => void;
  onTextLintingEnd?: () => void;
  onError?: (message: string) => void;
  wordsDictionary?: IDictionary;
  stringsDictionary?: IDictionary;
}

/* парсить по словам, сравнивать с предыдущим деревом */
const WorkfieldContainer: FunctionalComponent<WorkfieldContainerProps> = ({
  readOnly,
  text,
  placeHolder = '',
  onMouseMove,
  lang,
  zoomIn,
  syllableOff,
  stringNumberOff,
  viewOnly,
  setMakeCaesuraHandler,
  setCopyToClipboardHandler,
  isNotStandAlone,
  onFocusing,
  onTextLintingEnd,
  onTextLintingStart,
  onError,
  wordsDictionary = {},
  stringsDictionary = {},
}) => {
  const [
    {
      strings,
      tags,
      elements,
      orderStrings,
      wordsCount,
      mainMeter: { title, inPercent },
      stringLinks,
      wordLinks,
      hashTable,
      stage,
    },
    setState,
  ] = useState<State>({
    ...structure,
    stage: 'lint',
    orderStrings: text.split('\n').map((string) => `${string.length}`),
  });

  const { setRhythmicState, setWordsDictionary } = useRhythmicActions();

  const mainField = createRef<HTMLTextAreaElement>();
  const fakeField = createRef<HTMLDivElement>();

  useEffectOnce(() => {
    setHandlers();

    if (mainField.current) {
      lineHeight =
        parseInt(
          window.getComputedStyle(mainField.current, null).lineHeight,
          10
        ) || 1;
    }

    if (window.Worker) {
      textAnalyzingWorker = new Worker(
        /* webpackChunkName: "analyze-worker" */ new URL(
          './analyze-worker',
          import.meta.url
        ),
        { type: 'module' }
      );
    }
    // if (Array.isArray(text)) text = text.join('\n');

    if (text) fontReady(textLintingHandler);

    const resizeHandler = () => textLintingHandler(true);
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (textAnalyzingWorker) textAnalyzingWorker.terminate();
    };
  });

  useLayoutEffect(() => {
    textLintingHandler(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, zoomIn]);

  useLayoutEffect(() => {
    if (stage === 'children' && fakeField.current) {
      (async () => {
        const { children } = fakeField.current as HTMLDivElement;

        const stringsLinted = await tagMakerPromise(children, {
          strings,
          orderStrings,
          elements,
          hashTable,
          wordLinks,
          stringLinks,
          wordsCount,
          mainMeter: { title, inPercent },
        });

        setState((prevState) => ({
          ...prevState,
          ...stringsLinted,
          stage: 'lint',
        }));

        if (typeof onTextLintingEnd === 'function') onTextLintingEnd();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const makeCaesuraHandler = useCallback(() => {
    if (mainField.current) {
      makeCaesura(mainField.current, (text: string) => {
        isNotStandAlone &&
          setRhythmicState({
            text,
          });
      });
      mainField.current.focus();
    }
  }, [isNotStandAlone, mainField, setRhythmicState]);

  const copyToClipboard = useCallback(() => {
    if (fakeField.current) copyFrom(fakeField.current);
  }, [fakeField]);

  const setHandlers = useCallback(() => {
    if (typeof setMakeCaesuraHandler === 'function')
      setMakeCaesuraHandler(makeCaesuraHandler);
    if (typeof setCopyToClipboardHandler === 'function')
      setCopyToClipboardHandler(copyToClipboard);
  }, [
    setMakeCaesuraHandler,
    makeCaesuraHandler,
    setCopyToClipboardHandler,
    copyToClipboard,
  ]);

  useEffect(() => {
    if (isNotStandAlone) {
      setRhythmicState({
        strings,
        elements,
        orderStrings,
        wordsCount,
        mainMeter: {
          title: title ? title : '',
          inPercent,
        },
      });
    }
  }, [
    lang,
    title,
    inPercent,
    strings,
    elements,
    orderStrings,
    wordsCount,
    isNotStandAlone,
    setRhythmicState,
  ]);

  const setStateAsync = (newState: Partial<State>) => {
    return new Promise((resolve) => {
      setState((prevState) => {
        resolve(null);
        return { ...prevState, ...newState };
      });
    });
  };

  const handleTextInput: React.FormEventHandler<HTMLTextAreaElement> =
    useCallback(
      (e) => {
        const text = (e.target as HTMLTextAreaElement).value;
        isNotStandAlone && setRhythmicState({ text });
      },
      [isNotStandAlone, setRhythmicState]
    );

  const textLinting = useCallback(
    async (text: string) => {
      try {
        if (typeof onTextLintingStart === 'function') onTextLintingStart();

        let analyzedText = {} as TextAnalyzerResult;

        if (textAnalyzingWorker) {
          analyzedText = await getAnalyzedTextFromWorker({
            worker: textAnalyzingWorker,
            text,
            stringsDictionary,
            wordsDictionary,
          });
        } else {
          analyzedText = textAnalyzer(text, stringsDictionary, wordsDictionary);
        }

        setState((prevState) => ({
          ...prevState,
          ...analyzedText,
          stage: 'children',
        }));
      } catch (e) {
        if (typeof onError === 'function') {
          const translation = translations[lang];
          onError(translation['ERROR_INSTR']);
        }
      }
    },
    [onTextLintingStart, stringsDictionary, wordsDictionary, onError, lang]
  );

  const textLintingHandler = useCallback(
    (withoutRAF?: boolean) => {
      if (withoutRAF) {
        if (timerLinting) clearTimeout(timerLinting);

        timerLinting = window.setTimeout(textLinting, 500, text);
      } else {
        if (timerLintingRAF) {
          cancelAnimationFrame(timerLintingRAF);
        }
        timerLintingRAF = requestAnimationFrame(() => textLinting(text));
      }
    },
    [text, textLinting]
  );

  /*getSelection = () => {
        const start = mainField.current.selectionStart;

        const end = mainField.current.selectionEnd;

        const hashTable = this.state.hashTable;

        const elements = this.state.elements;

        console.log('begin: ', start, ' end: ', end);

        const textSelected = this.props.text.substring(start, end);

        // hashTokenId = hashFunction(token,++iterator);

        textSelected.split('').forEach((char, index) => {
            let hashTokenId = hashFunction(char, index + start + 1);

            let elementId = hashTable[hashTokenId].idSymbol;

            console.log(elements[elementId]);
        });

        // здесь мы высчитываем и сразу корректируем state.elements
    };*/

  const accentHandler = useCallback(
    async (signId: string, accent?: AccentTypes) => {
      const result = makeAccent({
        signId,
        elements,
        strings,
        stringLinks,
        /* wordLinks, */
        wordsDictionary,
        stringsDictionary,
        accent,
      });

      await setStateAsync({
        elements: result.elements,
        strings: result.strings,
        stage: 'children',
      });

      if (!readOnly && isNotStandAlone) {
        setWordsDictionary(result.wordsDictionary);
      }
    },
    [
      elements,
      strings,
      stringLinks,
      wordsDictionary,
      stringsDictionary,
      readOnly,
      isNotStandAlone,
      setWordsDictionary,
    ]
  );

  const changeRhythmHandler = useCallback(
    async (stringId: string) => {
      const string = strings[stringId];
      const clonedStrings = structuredClone(strings);

      if (string.rhythmPreset < rhythmPresets.length - 1) {
        clonedStrings[stringId].rhythmPreset = string.rhythmPreset + 1;
      } else {
        clonedStrings[stringId].rhythmPreset = 0;
      }

      /* await setStateAsync({
        strings: clonedStrings,
      }); */

      const rhythmPresetIndex = clonedStrings[stringId].rhythmPreset;

      const scheme = rhythmPresets[rhythmPresetIndex];

      let indexAccented = scheme.accent - 1;

      const soundGramma = clonedStrings[stringId].soundGramma;

      const soundGrammaLength = soundGramma.length;

      let result = {
        strings: clonedStrings,
        elements,
        wordsDictionary,
        stringsDictionary,
      } as MakeAccentResult;

      for (let index = 0; index < soundGrammaLength; index++) {
        const signId = soundGramma[index];

        let accent: AccentTypes = 0;

        if (index === indexAccented) {
          accent = 1;

          indexAccented = indexAccented + scheme.size;
        }

        if (elements[signId].accent !== accent) {
          // accentHandler(signId, accent);

          result = makeAccent({
            signId,
            ...result,
            stringLinks,
            accent,
          });
        }
      }

      await setStateAsync({
        elements: result.elements,
        strings: result.strings,
        stage: 'children',
      });

      if (!readOnly && isNotStandAlone) {
        setWordsDictionary(result.wordsDictionary);
      }
    },
    [
      elements,
      isNotStandAlone,
      readOnly,
      setWordsDictionary,
      stringLinks,
      strings,
      stringsDictionary,
      wordsDictionary,
    ]
  );

  const paintFieldHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.persist();
    e.preventDefault();

    if (!viewOnly) {
      timerPaintFieldHandler = window.setTimeout(() => {
        const target = e.target as HTMLDivElement;
        if (!preventPaintFieldHandler) {
          switch (target.dataset.type) {
          case 'v':
            accentHandler(target.id);
            break;
          case 'a/q':
            changeRhythmHandler(target.id);
            break;
          }
        }
        preventPaintFieldHandler = false;
      }, 200);
    }
  };

  const changeAccentInWord = useCallback(
    async (idSymbol: string) => {
      const idWord = (elements[idSymbol] as ILetterElement).idToken;
      const idString = elements[idSymbol].idString;
      const accentsIds = (
        elements[`${idString}${idWord}`] as IWordElement
      ).orderToken.filter((token) => token.includes('v'));

      const result: MakeAccentResult = accentsIds.reduce(
        (prevResult, signId) => {
          const accent: AccentTypes = idSymbol === signId ? 1 : 0;

          return makeAccent({
            signId,
            elements: prevResult.elements || elements,
            strings: prevResult.strings || strings,
            stringLinks,
            /* wordLinks, */
            wordsDictionary: prevResult.wordsDictionary || wordsDictionary,
            stringsDictionary:
              prevResult.stringsDictionary || stringsDictionary,
            accent,
          });
        },
        {} as MakeAccentResult
      );

      await setStateAsync({
        elements: result.elements,
        strings: result.strings,
        stage: 'children',
      });

      if (!readOnly && isNotStandAlone) {
        setWordsDictionary(result.wordsDictionary);
      }
    },
    [
      elements,
      readOnly,
      isNotStandAlone,
      strings,
      stringLinks,
      wordsDictionary,
      stringsDictionary,
      setWordsDictionary,
    ]
  );

  const doubleClickPaintFieldHandler: React.MouseEventHandler<HTMLDivElement> =
    useCallback(
      (e) => {
        e.preventDefault();

        const target = e.target as HTMLDivElement;

        if (!(viewOnly || target.dataset.type === 'stub')) {
          clearTimeout(timerPaintFieldHandler);
          preventPaintFieldHandler = true;

          switch (target.dataset.accent) {
          case accents[0]:
            changeAccentInWord(target.id);
            break;
          default:
            accentHandler(target.id, 0);
            break;
          }
        }
      },
      [changeAccentInWord, accentHandler, viewOnly]
    );

  const getRef = (ref: HTMLTextAreaElement) => (mainField.current = ref);

  const workfieldFocusHandler: React.FocusEventHandler<
    HTMLTextAreaElement
  > = () => {
    if (onFocusing) {
      onFocusing(true);
    }
  };

  const workfieldBlurHandler: React.FocusEventHandler<
    HTMLTextAreaElement
  > = () => {
    if (onFocusing) {
      onFocusing(false);
    }
  };

  return (
    <Overflowed>
      <Workfield
        lang={lang}
        placeHolder={placeHolder}
        value={text}
        zoomIn={zoomIn}
        readOnly={readOnly}
        lineHeight={lineHeight}
        syllableOff={syllableOff}
        stringNumberOff={stringNumberOff}
        strings={strings}
        orderStrings={orderStrings}
        tags={tags}
        elements={elements}
        onClick={paintFieldHandler}
        onDoubleClick={doubleClickPaintFieldHandler}
        onInput={handleTextInput}
        onMouseMove={onMouseMove}
        onFocus={workfieldFocusHandler}
        onBlur={workfieldBlurHandler}
        fakeFieldRef={fakeField}
        getRef={getRef}
      />
    </Overflowed>
  );
};

export default WorkfieldContainer;
