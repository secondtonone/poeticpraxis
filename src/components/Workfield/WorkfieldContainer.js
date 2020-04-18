import { h, createRef } from 'preact';
import { PureComponent } from 'preact/compat';

import Workfield from './Workfield';
import { Overflowed } from './styled';
import {translations} from './translations';

/* import hashFunction from '@utils/hashFunction'; */
import fontReady from '@utils/fontReady';
import { copyFrom } from '@modules/copying';

import AnalizeWorker from 'worker-loader!./analize-worker';

import {
    structure,
    textAnalizator,
    tagMaker,
    tagMakerPromise,
    makeCaesura,
    makeAccent,
    rhythmPresets,
    accents,
    getAnalizedTextFromWorker
} from './module';


/* парсить по словам, сравнивать с предыдущим деревом */
export default class WorkfieldContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            ...structure,
            orderStrings: props.text.split('\n').map((string) => string.length)
        };

        this.timerLintingRAF = 0;
        this.timerLinting = 0;

        this.timerPaintFieldHandler = 0;
        this.preventPaintFieldHandler = false;

        this.textAnalizingWorker = null;

        this.mainField = createRef();
        this.fakeField = createRef();
        this.lineHeight = 1;

        this.accents = accents;
    }

    componentDidMount() {
        this.setHandlers();
        this.lineHeight =
            parseInt(
                window.getComputedStyle(this.mainField.current, null).lineHeight,
                10
            ) || 1;

        let text = this.props.text;

        if (window.Worker) {
            this.textAnalizingWorker = new AnalizeWorker();
        }

        if (Array.isArray(text)) {
            text = text.join('\n');
        }

        if (text) {
            fontReady(this.textLintingHandler);
        }

        window.addEventListener('resize', this.textLintingHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.textLintingHandler);
        if (this.textAnalizingWorker) {
            this.textAnalizingWorker.terminate();
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.text !== prevProps.text ||
            this.props.zoomIn !== prevProps.zoomIn
        ) {
            this.textLintingHandler(true);
        }
    }

    setHandlers = () => {
        this.props.setMakeCaesuraHandler && this.props.setMakeCaesuraHandler(this.makeCaesura);
        this.props.setCopyToClipboardHandler &&
            this.props.setCopyToClipboardHandler(this.copyToClipboard);
    }

    onUpdate = () => {
        if (this.props.onUpdate) {
            const translation = translations[this.props.lang];
            const { strings, elements, orderStrings, wordsCount, mainMeter: {title, inPercent} } = this.state;
            this.props.onUpdate({
                strings,
                elements,
                orderStrings,
                wordsCount,
                mainMeter: {
                    title: translation[title],
                    inPercent
                }
            });
        }
    };

    setStateAsync = (newState) => {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve();
            });
        });
    };

    handleTextInput = (e) => {
        const text = e.target.value;
        this.props.onUpdate && this.props.onUpdate({ text });
    };

    textLinting = async (text) => {
        try {
            this.props.onTextLintingStart && this.props.onTextLintingStart();

            let stringsDictionary = this.props.stringsDictionary || {};

            let wordsDictionary = this.props.wordsDictionary || {};

            let analizedText = {};

            if (this.textAnalizingWorker) {
                analizedText = await getAnalizedTextFromWorker({
                    worker: this.textAnalizingWorker,
                    text,
                    stringsDictionary,
                    wordsDictionary,
                });
            } else { 
                analizedText = textAnalizator(
                    text,
                    stringsDictionary,
                    wordsDictionary
                );
            }

            await this.setStateAsync({
                ...analizedText
            });

            const children = this.fakeField.current.children;

            const stringsLinted = await tagMakerPromise(children, analizedText);

            await this.setStateAsync({
                ...stringsLinted
            });

            this.onUpdate();
            this.props.onTextLintingEnd &&
                this.props.onTextLintingEnd();
        } catch (e) {
            if (this.props.onError) {
                const translation = translations[this.props.lang];
                this.props.onError(translation['ERROR_INSTR']);
            }
        }
    };

    textLintingHandler = (withoutRAF) => {
        if (withoutRAF) {
            if (this.timerLinting) {
                clearTimeout(this.timerLinting);
            }
            this.timerLinting = setTimeout(
                this.textLinting,
                500,
                this.props.text
            ); 
        } else {
            if (this.timerLintingRAF) { 
                cancelAnimationFrame(this.timerLintingRAF);  
            }
            this.timerLintingRAF = requestAnimationFrame(() =>
                this.textLinting(this.props.text)
            );
        }
    };

    makeCaesura = () => {
        makeCaesura(this.mainField.current, (text) => {
            this.props.onUpdate && this.props.onUpdate({
                text
            });
        });
        this.mainField.current.focus();
    };

    copyToClipboard = () => {
        copyFrom(this.fakeField.current);
    };

    /*getSelection = () => {
        const start = this.mainField.current.selectionStart;

        const end = this.mainField.current.selectionEnd;

        const hashTable = this.state.hashTable;

        const elements = this.state.elements;

        console.log('begin: ', start, ' end: ', end);

        const textSelected = this.props.text.substring(start, end);

        // hashTokenId = hashFunction(token,++interator);

        textSelected.split('').forEach((char, index) => {
            let hashTokenId = hashFunction(char, index + start + 1);

            let elementId = hashTable[hashTokenId].idSymbol;

            console.log(elements[elementId]);
        });

        // здесь мы высчитываем и сразу корректируем state.elements
    };*/

    changeRhythmHandler = async (stringId) => {
        const strings = this.state.strings;
        const string = strings[stringId];

        if (string.rhythmPreset < rhythmPresets.length - 1) {
            strings[stringId].rhythmPreset = string.rhythmPreset + 1;
        } else {
            strings[stringId].rhythmPreset = 0;
        }

        await this.setStateAsync({
            strings
        });

        this.onUpdate();

        const rhythmPresetIndex = this.state.strings[stringId].rhythmPreset;

        const scheme = rhythmPresets[rhythmPresetIndex];

        const elements = this.state.elements;

        let indexAccented = scheme.accent - 1;

        const soundGramma = this.state.strings[stringId].soundGramma;

        const soundGrammaLength = soundGramma.length;

        for (let index = 0; index < soundGrammaLength; index++) {
            const signId = soundGramma[index];

            let accent = 0;

            if (index === indexAccented) {
                accent = 1;

                indexAccented = indexAccented + scheme.size;
            }

            if (elements[signId].accent !== accent) {
                this.accentHandler(signId, accent);
            }
        }
    };

    accentHandler = async (signId, accent) => {
        let wordsDictionary = this.props.wordsDictionary || {};

        let stringsDictionary = this.props.stringsDictionary || {};

        let { elements, strings, stringLinks, wordLinks } = this.state;

        const result = makeAccent({
            signId,
            elements,
            strings,
            stringLinks,
            wordLinks,
            wordsDictionary,
            stringsDictionary,
            accent
        });

        await this.setStateAsync({
            elements: result.elements,
            strings: result.strings
        });

        if (!this.props.readOnly) {
            this.props.setWordsDictionary(result.wordsDictionary);
        }

        this.onUpdate();
    };

    paintFieldHandler = (e) => {
        e.persist();
        e.preventDefault();

        if (this.props.viewOnly) {
            return false;
        }

        this.timerPaintFieldHandler = setTimeout(() => {
            if (!this.preventPaintFieldHandler) {
                switch (e.target.dataset.type) {
                case 'v':
                    this.accentHandler(e.target.id);
                    break;
                case 'a/q':
                    this.changeRhythmHandler(e.target.id);
                    break;
                }
            }
            this.preventPaintFieldHandler = false;
        }, 200);
    };

    doubleClickPaintFieldHandler = (e) => {
        e.preventDefault();

        if (this.props.viewOnly || e.target.dataset.type === 'stub') {
            return false;
        }

        clearTimeout(this.timerPaintFieldHandler);
        this.preventPaintFieldHandler = true;

        switch (e.target.dataset.accent) {
        case this.accents[0]:
            this.changeAccentInWord(e.target.id);
            break;
        default:
            this.accentHandler(e.target.id, 0);
            break;
        }
    };

    changeAccentInWord = async (idSymbol) => {
        let wordsDictionary = this.props.wordsDictionary || {};

        let stringsDictionary = this.props.stringsDictionary || {};

        let { elements, strings, stringLinks, wordLinks } = this.state;

        const idWord = elements[idSymbol].idToken;
        const idString = elements[idSymbol].idString;
        const accentsIds = elements[`${idString}${idWord}`].orderToken.filter(
            (token) => token.includes('v')
        );

        let result = {};

        accentsIds.forEach((signId) => {
            let accent = 0;

            if (idSymbol === signId) {
                accent = 1;
            }

            result = makeAccent({
                signId,
                elements: result.elements || elements,
                strings: result.strings || strings,
                stringLinks,
                wordLinks,
                wordsDictionary: result.wordsDictionary || wordsDictionary,
                stringsDictionary:
                    result.stringsDictionary || stringsDictionary,
                accent
            });
        });

        await this.setStateAsync({
            elements: result.elements,
            strings: result.strings
        });

        if (!this.props.readOnly) {
            this.props.setWordsDictionary(result.wordsDictionary);
        }

        this.onUpdate();
    };

    getRef = (ref) => this.mainField.current = ref
    workfieldFocusHandler = () => {
        if (this.props.onFocus) {
            this.props.onFocus(true);
        }
    }

    workfieldBlurHandler = () => {
        if (this.props.onFocus) {
            this.props.onFocus(false);
        }
    }

    render() {
        const {
            readOnly,
            text,
            placeHolder = '',
            onMouseMove,
            lang,
            zoomIn,
            syllableOff,
            stringNumberOff
        } = this.props;

        const {
            strings,
            elements,
            orderStrings,
            tags
        } = this.state;

        return (
            <Overflowed>
                <Workfield
                    lang={lang}
                    placeHolder={placeHolder}
                    value={text}
                    zoomIn={zoomIn}
                    readOnly={readOnly}
                    lineHeight={this.lineHeight}
                    syllableOff={syllableOff}
                    stringNumberOff={stringNumberOff}
                    strings={strings}
                    orderStrings={orderStrings}
                    tags={tags}
                    elements={elements}
                    onClick={this.paintFieldHandler}
                    onDoubleClick={this.doubleClickPaintFieldHandler}
                    onInput={this.handleTextInput}
                    onMouseMove={onMouseMove}
                    onFocus={this.workfieldFocusHandler}
                    onBlur={this.workfieldBlurHandler}
                    fakeFieldRef={this.fakeField}
                    getRef={this.getRef}
                />
            </Overflowed>
        );
    }
}
