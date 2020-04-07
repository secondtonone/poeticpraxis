import { h, Component } from 'preact';

import Textarea from '@components/Textarea';

import Marks from './Marks';
import HiddenMarks from './HiddenMarks';
import InfoMarks from './InfoMarks';

import {translations} from './translations';

import hashFunction from '@utils/hashFunction';
import fontReady from '@utils/fontReady';
import AnalizeWorker from 'worker-loader!./analize-worker';

import {
    structure,
    textAnalizator,
    tagMaker,
    makeCaesura,
    makeAccent,
    rhythmPresets,
    accents
} from './module';


import { copyFrom } from '@modules/copying';

import { FieldEditableArea } from '@styles/components';

import {
    FakeField,
    WorkField,
    PaintField
} from './styled';

/* парсить по словам, сравнивать с предыдущим деревом */

export default class Workfield extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...structure,
            zoomIn: false
        };

        this.timerLinting = 0;

        this.timerPaintFieldHandler = 0;
        this.preventPaintFieldHandler = false;

        this.textAnalizingWorker = null;

        this.mainField = null;
        this.lineHeight = 1;

        this.accents = accents;
    }

    componentDidMount() {
        this.lineHeight =
            parseInt(
                window.getComputedStyle(this.mainField, null).lineHeight,
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
            fontReady(() => {
                this.textLinting(text);
            });
        }

        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        if (this.textAnalizingWorker) {
            this.textAnalizingWorker.terminate();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.text !== prevProps.text) {
            if (this.timerLinting) {
                cancelAnimationFrame(this.timerLinting);
            }

            this.timerLinting = requestAnimationFrame(() => {
                this.textLinting(this.props.text);
            });
        }
    }

    getAnalizedText = ({ text, stringsDictionary, wordsDictionary }) =>
        new Promise((resolve, reject) => {
            this.textAnalizingWorker.postMessage({
                text,
                stringsDictionary,
                wordsDictionary
            });

            this.textAnalizingWorker.onmessage = (e) => {
                let analizedText = e.data;
                resolve(analizedText);
            };

            this.textAnalizingWorker.onerror = (e) => {
                reject(e);
            };
        });

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

    updateDimensions = () => {
        this.textLinting(this.props.text);
    };

    getMeasureField = (field) => {
        this.setState({
            field
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
                analizedText = await this.getAnalizedText({
                    text,
                    stringsDictionary,
                    wordsDictionary
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

            const children = this.fakeField.children;

            const stringsLinted = tagMaker(children, analizedText);

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

    makeCaesura = () => {
        makeCaesura(this.mainField, (text) => {
            this.props.onUpdate && this.props.onUpdate({
                text
            });
        });
        this.mainField.focus();
    };

    copyToClipboard = () => {
        copyFrom(this.fakeField);
    };

    getSelection = () => {
        const start = this.mainField.selectionStart;

        const end = this.mainField.selectionEnd;

        const hashTable = this.state.hashTable;

        const elements = this.state.elements;

        console.log('begin: ', start, ' end: ', end);

        const textSelected = this.props.text.substring(start, end);

        /* hashTokenId = hashFunction(token,++interator);*/

        textSelected.split('').forEach((char, index) => {
            let hashTokenId = hashFunction(char, index + start + 1);

            let elementId = hashTable[hashTokenId].idSymbol;

            console.log(elements[elementId]);
        });

        /* здесь мы высчитываем и сразу корректируем state.elements*/
    };

    /* анализ строк */
    getSugesstions = (string) => {
        if (string) {
            return {
                stroke: 'all',
                rhythm: {
                    size: 2,
                    accent: 1
                }
            };
        }
    };
    /* применение */
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

    changeZoomMode = async (zoomIn) => {
        try {
            await this.setStateAsync({
                zoomIn
            });

            const text = this.props.text;
            this.textLinting(text);
        } catch (e) {
            if (this.props.onError) {
                const translation = translations[this.props.lang];
                this.props.onError(translation['ERROR_WHAT']);
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

        if (this.props.viewOnly) {
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

    fakeFieldRef = (ref) => {
        this.fakeField = ref;
    };

    textareaRef = (ref) => {
        this.mainField = ref;
    };

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
            placeHolder,
            onMouseMove,
            lang,
            syllableOff,
            stringNumberOff
        } = this.props;

        const {
            strings,
            elements,
            orderStrings,
            tags,
            zoomIn
        } = this.state;

        return (
            <WorkField>
                <FakeField
                    data-id-comp="fakeField"
                    zoomIn={zoomIn}
                    ref={this.fakeFieldRef}>
                    <HiddenMarks
                        strings={strings}
                        orderStrings={orderStrings}
                        elements={elements}
                    />
                </FakeField>

                <PaintField
                    data-id-comp="paintField"
                    zoomIn={zoomIn}
                    onClick={this.paintFieldHandler}
                    onDoubleClick={this.doubleClickPaintFieldHandler}>
                    <Marks tags={tags} lang={lang} />
                    <InfoMarks
                        lang={lang}
                        strings={strings}
                        orderStrings={orderStrings}
                        lineHeight={this.lineHeight}
                        elements={elements}
                        syllableOff={syllableOff}
                        stringNumberOff={stringNumberOff}
                    />
                </PaintField>
                <Textarea
                    onInput={this.handleTextInput}
                    value={text}
                    Textarea={FieldEditableArea}
                    getMeasure={this.getMeasureField}
                    readOnly={readOnly}
                    zoomIn={zoomIn}
                    onMouseMove={onMouseMove}
                    onFocus={this.workfieldFocusHandler}
                    onBlur={this.workfieldBlurHandler}
                    placeHolder={placeHolder || ''}
                    getRef={this.textareaRef}
                />
            </WorkField>
        );
    }
}
