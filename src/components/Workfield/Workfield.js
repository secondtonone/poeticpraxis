import { h, Component } from 'preact';
import Textarea from '../Textarea';
import { hashFunction, fontReady } from '../../utils';

import {
    structure,
    textAnalizator,
    tagMaker,
    makeCaesura,
    makeAccent,
    rhythmPresets
} from './module';

import { copyFrom } from '../../modules/copying';

import { FieldEditableArea } from '../../styles/components';

import {
    Accent,
    StringPauseRelative,
    StringPause,
    StringField,
    Syllable,
    StringNumber,
    FakeField,
    AccentRelative,
    WorkField,
    PaintField,
    TriangleElement,
    CircleElement
} from './styled';

/* парсить по словам, сравнивать с предыдущим деревом */

export default class Workfield extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...structure,
            field: {},
            fontSizeStyle: {
                fontSize: 18
            },
            zoomIn: false
        };

        this.timerLinting = 0;

        this.accents = ['black', 'red', 'red_secondary', 'gray'];

        this.decription = [
            'Слабая доля',
            'Сильная доля',
            'Побочное ударение',
            'Непроизносимый звук'
        ];
    }

    componentDidMount() {
        this.mainField = this.textarea.field;

        let text = this.props.text;

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
    }

    componentWillUpdate(prevProps) {
        if (prevProps.text !== this.props.text) {
            if (this.timerLinting) {
                clearTimeout(this.timerLinting);
            }

            this.timerLinting = setTimeout(() => {
                this.textLinting(prevProps.text);
            }, 50);
        }
    }

    shouldComponentUpdate(prevProps, nextState) {
        /* if (
            Object.keys(nextState.elements).length &&
            JSON.stringify(this.state.elements) ===
                JSON.stringify(nextState.elements)
        ) {
            console.log(this.state.elements);

            return false;
        } */
    }

    getData = () => {
        return this.state;
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
        this.props.transmitState({
            text: e.target.value
        });
    };

    textLinting = async (text) => {
        let stringsDictionary = this.props.stringsDictionary || {};

        let wordsDictionary = this.props.wordsDictionary || {};

        let analizedText = textAnalizator(
            text,
            stringsDictionary,
            wordsDictionary
        );
        // this.setState({
        //     text,
        //     tag: {}
        // });

        // if (this.timerLinting) {
        //     clearTimeout(this.timerLinting);
        // }

        // this.timerLinting = setTimeout(() => {
        await this.setStateAsync({
            ...analizedText
        });

        const children = this.fakeField.children;

        let stringsLinted = tagMaker(children, analizedText);

        this.setState({
            ...stringsLinted
        });
        // }, 50);
    };

    makeCaesura = () => {
        makeCaesura(this.mainField, (text) => {
            this.props.transmitState({
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
    getSugesstions = (strings) => {
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
    onSuggestion = (stroke, rhythm) => {
        if (stroke === 'all') {
        } else {
        }
    };

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

        const rhythmPresetIndex = this.state.strings[stringId].rhythmPreset;

        const scheme = rhythmPresets[rhythmPresetIndex];

        const elements = this.state.elements;

        let indexAccented = scheme.accent - 1;

        this.state.strings[stringId].soundGramma.forEach((signId, index) => {
            let accent = 0;

            if (index === indexAccented) {
                accent = 1;

                indexAccented = indexAccented + scheme.size;
            }

            if (elements[signId].accent !== accent) {
                this.accentHandler(signId, accent);
            }
        });
    };

    changeZoomMode = async (zoomIn) => {
        await this.setStateAsync({
            zoomIn
        });

        const text = this.props.text;
        this.textLinting(text);
    };

    makeMarkingTags = (strings, orderStrings, elements) => {
        let stringsOrders = [];

        let symbolsTags = {};

        orderStrings.forEach((id) => {
            const string = strings[id];

            stringsOrders = [...stringsOrders, ...string.order];
        });

        stringsOrders.forEach((id) => {
            const symbol = elements[id];

            let char = symbol.char;

            const idString = symbol.idString;

            const accent = symbol.accent;

            let tag = char;

            if (!symbolsTags[idString]) {
                symbolsTags[idString] = [];
            }

            if (symbol.type === 'v') {
                tag = (
                    <Accent
                        data-type={this.accents[accent]}
                        accent={this.accents[accent]}
                        key={id}
                        id={id}>
                        {char}
                    </Accent>
                );
            }
            if (symbol.type === 'p') {
                tag = (
                    <StringPause key={id} id={id} data-type="string-pause">
                        {char}
                    </StringPause>
                );
            }

            symbolsTags[idString].push(tag);
        });

        return orderStrings.map((id) => {
            const symbols = symbolsTags[id] || [];

            return (
                <StringField key={id} id={id}>
                    {symbols.length ? symbols : ' '}
                </StringField>
            );
        });
    };

    makeRenderedTags = (tags) => {
        return tags.map((sign) => {
            const style = {
                top: sign.tag.top,
                left: sign.tag.left,
                height: sign.tag.height,
                width: sign.tag.width
            };

            if (sign.type === 'p') {
                return (
                    <StringPauseRelative
                        key={sign.id}
                        id={sign.id}
                        style={style}
                        data-type={sign.type}
                        title="Однодольная пауза">
                        &#8896;
                    </StringPauseRelative>
                );
            }

            return (
                <AccentRelative
                    accent={this.accents[sign.accent]}
                    key={sign.id}
                    id={sign.id}
                    style={style}
                    data-type={sign.type}
                    title={this.decription[sign.accent]}
                />
            );
        });
    };

    makeAccentSizeIdicator = (size, accent) => {
        let scheme = [];

        for (let i = 1; i <= size; i++) {
            if (i === accent) {
                scheme.push(<TriangleElement />);
            } else {
                scheme.push(<CircleElement />);
            }
        }

        return scheme;
    };

    makeInfoTags = (strings, orderStrings, field, elements) => {
        let stringCounter = 0;

        const dataTypeAQ = 'a/q';

        return orderStrings.map((stringId) => {
            const string = strings[stringId];
            if (string.tag) {
                const tag = string.tag;

                const size = rhythmPresets[string.rhythmPreset].size;

                const accent = rhythmPresets[string.rhythmPreset].accent;

                const vowels = string.vowel;

                const delta = tag.height - field.lineHeight;

                const vowelAccentCount = vowels.filter(
                    (id) =>
                        elements[id].accent === 1 || elements[id].accent === 2
                ).length;

                return [
                    this.props.syllableOff || !vowels.length ? null : (
                        <Syllable
                            id={stringId}
                            data-type={dataTypeAQ}
                            key={`s-${tag.top}`}
                            style={{ top: tag.top + delta }}
                            title="Ударение/количество слогов">
                            {vowelAccentCount ? (
                                <Syllable.Accent>
                                    {vowelAccentCount}
                                </Syllable.Accent>
                            ) : null}
                            {string.soundGramma.length}
                            <Syllable.AccentType>
                                {this.makeAccentSizeIdicator(size, accent)}
                            </Syllable.AccentType>
                        </Syllable>
                    ),
                    this.props.stringNumberOff ||
                    !string.words.length ? null : (
                        <StringNumber
                            key={`n-${tag.top}`}
                            style={{ top: tag.top }}
                            title="Номер строки">
                            {++stringCounter}
                        </StringNumber>
                    )
                ];
            }
        });
    };

    accentHandler = (signId, accent) => {
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

        this.setState({
            elements: result.elements,
            strings: result.strings
        });

        if (!this.props.readOnly) {
            this.props.setWordsDictionary(result.wordsDictionary);

            this.props.transmitState({
                stringsDictionary: result.stringsDictionary
            });
        }
    };

    paintFieldHandler = (e) => {
        e.preventDefault();

        if (this.props.viewOnly) {
            return false;
        }

        if (e.target.dataset.type === 'v') {
            this.accentHandler(e.target.id);
        }
        if (e.target.dataset.type === 'a/q') {
            this.changeRhythmHandler(e.target.id);
        }
    };

    render(
        { readOnly, focusHandler, text, placeHolder, onMouseMove },
        { strings, field, elements, orderStrings, tags, zoomIn }
    ) {
        const renderedTags = this.makeRenderedTags(tags);

        const marckupTags = this.makeMarkingTags(
            strings,
            orderStrings,
            elements
        );

        const infoTags = this.makeInfoTags(
            strings,
            orderStrings,
            field,
            elements
        );

        let props = {
            onInput: this.handleTextInput,
            value: text,
            Textarea: FieldEditableArea,
            getMeasure: this.getMeasureField,
            readOnly: readOnly,
            zoomIn: zoomIn,
            onMouseMove: onMouseMove,
            onFocus: () => {
                if (focusHandler) {
                    focusHandler(true);
                }
            },
            onBlur: () => {
                if (focusHandler) {
                    focusHandler(false);
                }
            },
            placeHolder: placeHolder || ''
        };

        return (
            <WorkField>
                <FakeField
                    data-id-comp="fakeField"
                    zoomIn={zoomIn}
                    innerRef={(ref) => {
                        this.fakeField = ref;
                    }}>
                    {marckupTags}
                </FakeField>

                <PaintField
                    data-id-comp="paintField"
                    zoomIn={zoomIn}
                    onClick={this.paintFieldHandler}>
                    {renderedTags}
                    {infoTags}
                </PaintField>
                <Textarea
                    {...props}
                    ref={(ref) => {
                        this.textarea = ref;
                    }}
                />
            </WorkField>
        );
    }
}
