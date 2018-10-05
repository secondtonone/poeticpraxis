import { h, Component } from 'preact';
import Textarea from '../Textarea';
import { randomize, hashFunction, fontReady } from '../../utils';

import {
    isLetter,
    isPause,
    isSpace,
    isVowel,
    isAccented,
    makeListLinks
} from '../../modules/rhythmic';

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
    PaintField
} from './styled';

/* парсить по словам, сравнивать с предыдущим деревом */

export default class Workfield extends Component {
    constructor(props) {
        super(props);

        this.state = {
            strings: {},
            orderStrings: [],
            elements: {},
            tags: [],
            hashTable: {},
            stringLinks: {},
            wordLinks: {},
            field: {},
            fontSizeStyle: {
                fontSize: 18
            },
            zoomIn: false
        };

        this.strings = {};

        this.caretPosition = 0;

        this.symbolCounter = 0;

        this.timerLinting = 0;
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

    componentWillReceiveProps(prevProps) {
        if (prevProps.text !== this.props.text) {
            if (this.timerLinting) {
                clearTimeout(this.timerLinting);
            }

            this.timerLinting = setTimeout(() => {
                this.textLinting(prevProps.text);
            }, 50);
        }
    }

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

    tagMaker = (node, textAnalized) => {
        const stringNodes = [...node];

        let tags = [];

        let symbols = [];

        const { elements, strings } = textAnalized;

        const symbolsSet = stringNodes.map((string) => {
            const symbols = [...string.children];

            strings[string.id].tag = {
                left: string.offsetLeft,
                top: string.offsetTop,
                height: string.offsetHeight,
                width: string.offsetWidth
            };

            return symbols;
        });

        symbolsSet.forEach((set) => {
            symbols = [...symbols, ...set];
        });

        if (symbols.length) {
            symbols.forEach((symbol) => {
                const type = symbol.dataset.type;
                if (
                    type === 'black' ||
                    type === 'red' ||
                    type === 'red_secondary' ||
                    type === 'gray' ||
                    type === 'string-pause'
                ) {
                    const offsetLeft = symbol.parentNode.offsetLeft;
                    const offsetTop = symbol.parentNode.offsetTop;

                    elements[symbol.id].tag = {
                        left: symbol.offsetLeft + offsetLeft,
                        top: symbol.offsetTop + offsetTop,
                        height: symbol.offsetHeight,
                        width: symbol.offsetWidth
                    };

                    tags.push(elements[symbol.id]);
                }
            });
        }

        return {
            elements,
            strings,
            tags
        };
    };
    /* убрать знаки припенания, для выявления слов*/

    /* str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');*/

    /* let stringWords = string.match(/[a-zA-ZА-Яа-яёЁ]+/g) || [];

        words = [...words, ...stringWords];*/
    textAnalizator(text, stringsDictionary, wordsDictionary) {
        const fieldStrings = text.split('\n');

        let strings = {};

        let elements = {};

        let hashTable = {};

        let interator = 0;

        let wordLinks = {};

        let stringLinks = {};

        /* Строка */
        const orderStrings = fieldStrings.map((string, index) => {
            interator += index;

            let idString = `s${index}${randomize()}`;

            let vowel = [];

            let soundGramma = [];

            let words = [];

            let tokens = string
                .split(/(\s|[a-zA-ZА-Яа-яёЁ-]+|[\.,\/#!$%\^&\*;:{}=\-_`~()⋀])/)
                .filter((n) => n);

            let order = [];

            let stringIndex = 0;

            /* Слово */
            tokens.forEach((token, index) => {
                let type = 't';

                let idToken = `t${index}${randomize()}`;

                let accent = 0;

                let accents = [];

                let orderToken = [];

                let hashTokenId = '';

                if (isLetter(token)) {
                    idToken = `w${index}${randomize()}`;

                    type = 'w';

                    /* Буквы */
                    orderToken = [...token].map((char, index, array) => {
                        hashTokenId = hashFunction(char, ++interator);

                        const isLast = index === array.length - 1;

                        let idSymbol = `c${index}${randomize()}`;

                        let type = 'c';

                        accent = 0;

                        if (isVowel(char)) {
                            idSymbol = `v${index}${randomize()}`;

                            type = 'v';

                            if (stringsDictionary) {
                                accent =
                                    isAccented(
                                        string,
                                        stringIndex,
                                        stringsDictionary
                                    ) ||
                                    isAccented(token, index, wordsDictionary);
                            }

                            const idVowel = `${idString}${idToken}${idSymbol}`;

                            vowel.push(idVowel);

                            if (accent !== 3) {
                                soundGramma.push(idVowel);
                            }
                        }

                        idSymbol = `${idString}${idToken}${idSymbol}`;

                        elements[idSymbol] = {
                            isLast,
                            type,
                            char,
                            accent,
                            index,
                            id: idSymbol,
                            idString,
                            idToken,
                            stringIndex,
                            hashTokenId
                        };

                        hashTable[hashTokenId] = {
                            idSymbol
                        };

                        order.push(idSymbol);

                        ++stringIndex;

                        return idSymbol;
                    });

                    idToken = `${idString}${idToken}`;

                    words.push(idToken);

                    wordLinks = makeListLinks(token, idToken, wordLinks);

                    elements[idToken] = {
                        type,
                        token,
                        accent,
                        accents,
                        orderToken,
                        id: idToken,
                        idString
                    };
                } else {
                    hashTokenId = hashFunction(token, ++interator);

                    if (isSpace(token)) {
                        type = 'sp';

                        idToken = `sp${index}${randomize()}`;
                    }

                    if (isPause(token)) {
                        type = 'p';

                        idToken = `p${index}${randomize()}`;

                        soundGramma.push(idToken);
                    }

                    idToken = `${idString}${idToken}`;

                    elements[idToken] = {
                        type,
                        char: token,
                        id: idToken,
                        idString,
                        hashTokenId
                    };

                    hashTable[hashTokenId] = {
                        idToken
                    };

                    order.push(idToken);

                    ++stringIndex;
                }
            });

            stringLinks = makeListLinks(string, idString, stringLinks);

            strings[idString] = {
                order,
                string,
                words,
                vowel,
                soundGramma,
                id: idString
            };

            return idString;
        });

        return {
            strings,
            orderStrings,
            elements,
            hashTable,
            wordLinks,
            stringLinks
        };
    }

    handleTextInput = (e) => {
        this.props.transmitState({
            text: e.target.value
        });
    };

    textLinting = (text) => {
        let stringsDictionary = this.props.stringsDictionary || {};

        let wordsDictionary = this.props.wordsDictionary || {};

        let analizedText = this.textAnalizator(
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
        this.setStateAsync({
            ...analizedText
        }).then(() => {
            let stringsLinted = this.tagMaker(
                this.fakeField.children,
                analizedText
            );

            this.setState({
                ...stringsLinted
            });
        });
        // }, 50);
    };

    makeCaesura = () => {
        this.insertionToPosition('⋀', this.mainField);
        this.mainField.focus();
    };

    insertionToPosition = (str, textarea) => {
        const value = textarea.value;
        const before = value.substring(0, textarea.selectionStart);
        const after = value.substring(textarea.selectionEnd, value.length);

        const text = `${before}${str}${after}`;

        this.textLinting(text);

        this.props.transmitState({
            text
        });

        this.setCursor(textarea, before.length + str.length);
    };

    setCursor = (elem, pos) => {
        elem.focus();

        setTimeout(() => {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                const range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }, 50);

        this.caretPosition = pos;
    };

    copyToClipboard = () => {
        const field = this.fakeField;

        let range = {};

        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(field);
            range.select().createTextRange();
            document.execCommand('Copy');
            console.log('range');
        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNodeContents(field);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('Copy');
        }
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
        if(string) {
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
        if(stroke === 'all') {

        } else {

        }
    };

    changeZoomMode = (zoomIn) => {
        this.setStateAsync({
            zoomIn
        }).then(() => {
            let text = this.props.text;
            this.textLinting(text);
        });
    };

    paintFieldHandler = (e) => {
        e.preventDefault();

        if (this.props.viewOnly || e.target.dataset.type !== 'v') {
            return false;
        }

        const signId = e.target.id;

        let { elements, strings, stringLinks, wordLinks } = this.state;

        let wordsDictionary = this.props.wordsDictionary || {};

        let stringsDictionary = this.props.stringsDictionary || {};

        const element = elements[signId];

        const idWord = `${element.idString}${element.idToken}`;

        const word = elements[idWord];

        const wordLowerCased = word.token.toLowerCase();

        let string = strings[element.idString];

        const stringLowerCased = string.string.toLowerCase();

        let accent = element.accent;

        //let stringLinksTriggered = false;

        if (accent < 3) {
            ++accent;
        } else {
            accent = 0;
        }

        elements[signId].accent = accent;

        /* Работа со словом */

        const wordAccents = word.orderToken.map((id) => {
            return {
                type: elements[id].accent
            };
        });

        wordsDictionary[wordLowerCased] = {
            accents: wordAccents
        };

        /* Работа со строкой */
        const stringAccents = string.order.map((id) => {
            return {
                type: elements[id].accent
            };
        });

        stringsDictionary[stringLowerCased] = {
            accents: stringAccents
        };

        const indexSoundGramma = string.soundGramma.indexOf(signId);        

        if (accent === 3 && indexSoundGramma !== -1) {
            strings[element.idString].soundGramma.splice(indexSoundGramma, 1);
        } 
        if (accent === 0 && indexSoundGramma === -1) {
            strings[element.idString].soundGramma.push(signId);
        }
        /* баги*/

        if (stringLinks[stringLowerCased]) {
            stringLinks[stringLowerCased].forEach((idString) => {
                if (strings[idString]) {
                    let idElement =
                        strings[idString].order[element.stringIndex];

                    if (element.id !== idElement) {
                        elements[idElement].accent =
                            elements[element.id].accent;

                        stringLinksTriggered = true;
                    }
                }
            });
        }

        /* if(!stringLinksTriggered && wordLinks[wordLowerCased]) {
            wordLinks[wordLowerCased].forEach( idWord => {

                if(elements[idWord]) {

                    let idElement = elements[idWord].orderToken[element.index];

                    if(element.id != idElement) {
                        elements[idElement].accent = elements[element.id].accent;
                    }

                }
            });
        }*/

        this.setState({
            elements,
            strings
        });

        if (!this.props.readOnly) {
            this.props.setWordsDictionary(wordsDictionary);

            this.props.transmitState({
                stringsDictionary
            });
        }
    };

    render(
        {
            readOnly,
            syllableOff,
            stringNumberOff,
            focusHandler,
            text,
            placeHolder
        },
        { strings, field, elements, orderStrings, tags, zoomIn }
    ) {
        const accents = ['black', 'red', 'red_secondary', 'gray'];

        const decription = [
            'Слабая доля',
            'Сильная доля',
            'Побочное ударение',
            'Непроизносимый звук'
        ];

        let stringCounter = 0;

        const renderedTags = tags.map((sign) => {
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
                    accent={accents[sign.accent]}
                    key={sign.id}
                    id={sign.id}
                    style={style}
                    data-type={sign.type}
                    title={decription[sign.accent]}
                />
            );
        });

        const markingTags = orderStrings.map((id) => {
            const string = strings[id];

            let symbols = string.order.map((id) => {
                const symbol = elements[id];

                let char = symbol.char;

                if (symbol.type === 'v') {
                    return (
                        <Accent
                            data-type={accents[symbol.accent]}
                            accent={accents[symbol.accent]}
                            key={id}
                            id={id}>
                            {char}
                        </Accent>
                    );
                }
                if (symbol.type === 'p') {
                    return (
                        <StringPause key={id} id={id} data-type="string-pause">
                            {char}
                        </StringPause>
                    );
                }

                return char;
            });

            return (
                <StringField key={id} id={id}>
                    {symbols.length ? symbols : ' '}
                </StringField>
            );
        });

        const infoTags = orderStrings.map((id) => {
            if (strings[id].tag) {
                const tag = strings[id].tag;

                const delta = tag.height - field.lineHeight;

                let vowelAccentCount = 0;

                strings[id].vowel.forEach((id) => {
                    if (
                        elements[id].accent === 1 ||
                        elements[id].accent === 2
                    ) {
                        ++vowelAccentCount;
                    }
                });

                return [
                    syllableOff || !strings[id].vowel.length ? null : (
                        <Syllable
                            key={`s-${tag.top}`}
                            style={{ top: tag.top + delta }}
                            title="Ударение/количество слогов">
                            {vowelAccentCount ? (
                                <Syllable.Accent>
                                    {vowelAccentCount}
                                </Syllable.Accent>
                            ) : null}
                            {strings[id].soundGramma.length}
                        </Syllable>
                    ),
                    stringNumberOff || !strings[id].words.length ? null : (
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

        let props = {
            onInput: this.handleTextInput,
            value: text,
            Textarea: FieldEditableArea,
            getMeasure: this.getMeasureField,
            readOnly: readOnly,
            zoomIn: zoomIn,
            onFocus: () => {
                if (focusHandler) {
                    focusHandler(true);
                }
            },
            onBlur: () => {
                if (focusHandler) {
                    focusHandler(true);
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
                    {markingTags}
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
