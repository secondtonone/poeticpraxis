import React from 'react';
import Textarea from '../Textarea';
import {randomize} from '../../utils';

/*парсить по словам, сравнивать с предыдущим деревом*/

export default class Workfield extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text:'',
            strings:{},
            orderStrings: [],
            elements: {},
            tags: [],
            stringsDictionary: {},
            stringLinks: {},
            vowel: [],
            wordsDictionary: {},
            wordLinks: {},
            field: {},
            selectedText: []
        };

        this.mainTimer = 0;
    }



    componentDidMount(){

        let text = this.props.text;

        if(Array.isArray(this.props.text)){
            text = this.props.text.join('\n');
        }

        this.setStateAsync({
            stringsDictionary: this.getStringsDictionary(),
            wordsDictionary: this.getWordsDictionary()
        }).then(() => {
            if(text) {
                this.textLinting(text);
            }
        });

        window.addEventListener("resize", this.updateDimensions);

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    setStateAsync = (newState) => {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve();
            });
        });
    }

    delay = (ms) => {
        return new Promise(function(resolve) {
            if (ms <= 0) {
                resolve();
            } else {
                setTimeout(resolve, ms);
            }
        });
    }

    updateDimensions = () => {
        this.textLinting(this.state.text);
    }

    getWordsDictionary = () => {

        let wordsDictionary = {};

        if(!window.localStorage) {
            return wordsDictionary;
        }

        if(localStorage.getItem('wordsDictionary')) {
            wordsDictionary = JSON.parse(localStorage.getItem('wordsDictionary'));
        }

        return wordsDictionary;
    }

    setWordsDictionary = (word, accents) => {

        let wordsDictionary = {};

        if(!window.localStorage) {
            return;
        }

        if(localStorage.getItem('wordsDictionary')) {
            wordsDictionary = JSON.parse(localStorage.getItem('wordsDictionary'));
        }

        wordsDictionary[word] = accents;

        localStorage.setItem('wordsDictionary',JSON.stringify(wordsDictionary));
    }

    getStringsDictionary = () => {

        return this.props.stringsDictionary ? JSON.parse(this.props.stringsDictionary): {};
    }

    getMeasureField = (field) => {

        this.setState({
            field
        });
    }


    tagMaker(node, textAnalized) {

        const stringNodes = [ ...node];

        let symbols = [];

        let tags = [];

        const accents = {
            black: 0,
            red: 1,
            'red_secondary': 2
        };

        const {elements, orderStrings, strings} = textAnalized;

        stringNodes.forEach( string => {

            const symbols = [ ...string.children];

            strings[string.id].tag = {
                left: string.offsetLeft,
                top: string.offsetTop,
                height: string.offsetHeight,
                width: string.offsetWidth
            };

            if (symbols.length) {

                symbols.forEach( symbol => {

                    if ( symbol.className === 'black' || symbol.className === 'red' || symbol.className === 'red_secondary'){

                        elements[symbol.id].tag = {
                            left: symbol.offsetLeft + string.offsetLeft,
                            top: symbol.offsetTop + string.offsetTop,
                            height: symbol.offsetHeight,
                            width: symbol.offsetWidth
                        };

                        tags.push(elements[symbol.id]);
                    }
                });
            }
        });

        return {
            elements,
            strings,
            orderStrings,
            tags
        };
    }

    /*убрать знаки припенания, для выявления слов*/

     /*str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');*/



     /*let stringWords = string.match(/[a-zA-ZА-Яа-яёЁ]+/g) || [];

        words = [...words, ...stringWords];*/
    isWordAccented = (word, index) => {

        const wordsDictionary = this.state.wordsDictionary;

        let wordLowerCased = word.toLowerCase();

        return wordsDictionary[wordLowerCased] ? wordsDictionary[wordLowerCased].accents[index].type : 0;
    }

    isStringAccented = (string, index) => {

        const stringsDictionary = this.state.stringsDictionary;

        let stringLowerCased = string.toLowerCase();

        return stringsDictionary[stringLowerCased] ? stringsDictionary[stringLowerCased].accents[index].type : 0;
    }

    addToWordLinks = (token, idToken, wordLinks) => {

        let wordLowerCased = token.toLowerCase();

        let links = wordLinks[wordLowerCased] || [];

        links = [...links, idToken];

        wordLinks[wordLowerCased] = [...new Set(links)];

    }

    addToStringLinks = (string, idString, stringLinks) => {

        let stringLowerCased = string.toLowerCase();

        let links = stringLinks[stringLowerCased] || [];

        links = [...links, idString];

        stringLinks[stringLowerCased] = [...new Set(links)];

    }

    textAnalizator(text, { wordLinks, stringLinks }) {

        const self = this;

        const fieldStrings = text.split("\n");

        let strings = {};

        let elements = {};

        const orderStrings = fieldStrings.map((string, index)=>{

            let idString = `s${index}${randomize()}`;

            let vowel = [];

            let tag = {};

            let words = [];

            let tokens = string.split(/(\s|[a-zA-ZА-Яа-яёЁ]+|[\.,\/#!$%\^&\*;:{}=\-_`~()])/).filter(n => n);

            let order = [];

            let stringIndex = 0;

            tokens.forEach((token,index, array)=>{

                let type = 't';

                let idToken = `t${index}${randomize()}`;

                let accent = 0;

                let accents = [];

                let orderToken = [];

                if (self.isLetter(token)) {

                    idToken = `w${index}${randomize()}`;

                    type = 'w';

                    orderToken = [...token].map((char, index, array)=>{

                        const isLast = index === array.length - 1;

                        let idSymbol = `c${index}${randomize()}`;

                        let type = 'c';

                        accent = 0;

                        if (self.isVowel(char)) {

                            idSymbol = `v${index}${randomize()}`;

                            type = 'v';

                            if(!self.props.readOnly || self.props.stringsDictionary){

                                accent = self.isStringAccented(string, stringIndex) || self.isWordAccented(token, index);
                            }

                            vowel.push(`${idString}${idToken}${idSymbol}`);

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
                            stringIndex
                        };

                        order.push(idSymbol);

                        ++stringIndex;

                        return idSymbol;

                    });


                    idToken = `${idString}${idToken}`;

                    words.push(idToken);

                    self.addToWordLinks(token, idToken, wordLinks);

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

                    idToken = `${idString}${idToken}`;

                    elements[idToken] = {
                        type,
                        char: token,
                        id: idToken,
                        idString
                    };

                    order.push(idToken);

                    ++stringIndex;
                }

            });

            self.addToStringLinks(string, idString, stringLinks);

            strings[idString] = {
                order,
                string,
                words,
                vowel,
                id: idString
            };


            return idString;
        });

        return {
            strings,
            orderStrings,
            elements,
            wordLinks,
            stringLinks
        };

    }

    isVowel(char) {
        return /^[eyuioaуеыаоэёяию]$/.test(char.toLowerCase());
    }

    isLetter(char) {
        return /[a-zA-ZА-Яа-яёЁ]$/.test(char);
    }

    isBreakLine(char) {
        return /\n/g.test(char);
    }

    handleTextInput = (e) => {

        const text = e.target.value;

        this.textLinting(text);

    }

    textLinting = (text) => {

        let strings = this.textAnalizator(text, this.state);

        this.setStateAsync({
            ...strings,
            text
        }).then(()=>{

            let stringsLinted = this.tagMaker(this.refs.fakeField.children, strings);

            this.setState({
                ...stringsLinted
            });
        });

        /*if(this.mainTimer) {
            window.clearTimeout(this.mainTimer);
        }

        this.mainTimer = setTimeout(()=>{
            strings = this.tagMaker(this.refs.fakeField.children, strings);

            this.setState({
                ...strings
            });

        },500);*/
    }

    textHighlighting = (text, start, end) => {

        /*const re = new RegExp(`${string}`, 'g');

        text = text
        .replace(/\n$/g, '\n\n')
        .replace(re, '<span class="mark">$&</span>');*/

        text = text.split('').map((symbol, index) => {

            if(index >= start && index < end) {
                return (<span className="mark-selected">{symbol}</span>);
            }

            return symbol;
        });

        /*if (isIE) {

        text = text.replace(/ /g, ' <wbr>');
        }*/
        console.log(text);
        return text;
    }
    /*следить за счет глобальной позиции*/
    selectionHandler = (e) =>{
        let txt = '';

        if (window.getSelection) {// Не IE, используем метод getSelection
            txt = window.getSelection().toString();
        } else { // IE, используем объект selection
            txt = document.selection.createRange().text;
        }

        if(txt) {
            console.log(txt);


            let selectedText=this.textHighlighting(this.state.text, e.target.selectionStart, e.target.selectionEnd);

            this.setState({
                selectedText
            });
        }
    }

    render() {

        const self = this;

        const accents = ['black', 'red', 'red_secondary'];

        const {strings, field, elements, orderStrings } = this.state;

        let stringCounter = 0;

        const tags = this.state.tags.map( sign =>{

            const style = {
                top: sign.tag.top,
                left: sign.tag.left,
                height: sign.tag.height,
                width: sign.tag.width
            };

            const signHandler = (e) =>{
                e.preventDefault();

                if(this.props.readOnly) {
                    return false;
                }

                let {elements, strings, wordsDictionary, stringsDictionary, stringLinks, wordLinks} = self.state;

                const element = elements[sign.id];

                const idWord = `${element.idString}${element.idToken}`;

                const word = elements[idWord];

                const wordLowerCased = word.token.toLowerCase();

                const string = strings[element.idString];

                const stringLowerCased = string.string.toLowerCase();

                let accent = element.accent;

                let stringLinksTriggered = false;

                if(accent < 2) {
                    ++accent;
                } else {
                    accent = 0;
                }

                elements[sign.id].accent = accent;


                const wordAccents = word.orderToken.map(id => {
                    return {
                        type:elements[id].accent
                    };
                });

                wordsDictionary[wordLowerCased] = {
                    accents: wordAccents
                };

                self.setWordsDictionary(wordLowerCased, wordsDictionary[wordLowerCased]);


                const stringAccents = string.order.map(id => {
                    return {
                        type:elements[id].accent
                    };
                });

                stringsDictionary[stringLowerCased] = {
                    accents: stringAccents
                }

                /*баги*/

                if(stringLinks[stringLowerCased]) {

                    stringLinks[stringLowerCased].forEach( idString => {

                        if(strings[idString]) {
                            let idElement = strings[idString].order[element.stringIndex];

                            if(element.id != idElement) {
                                elements[idElement].accent = elements[element.id].accent;

                                stringLinksTriggered = true;
                            }
                        }
                    });

                }

                /*if(!stringLinksTriggered && wordLinks[wordLowerCased]) {
                    wordLinks[wordLowerCased].forEach( idWord => {

                        if(elements[idWord]) {

                            let idElement = elements[idWord].orderToken[element.index];

                            if(element.id != idElement) {
                                elements[idElement].accent = elements[element.id].accent;
                            }

                        }
                    });
                }*/

                self.setState({
                    elements,
                    wordsDictionary,
                    stringsDictionary
                });
            };

            return (<span className={accents[sign.accent] + '-relative'} key={sign.id} id={sign.id} style={style} onClick={signHandler}></span>);

        });

        const fakeStrings = orderStrings.map((id,index) => {

            const string = strings[id];

            let symbols = string.order.map((id, index)=>{

                const symbol = elements[id];

                let char = symbol.char;

                if (symbol.type === 'v'){

                    return (<span className={accents[symbol.accent]} key={id} id={id}>{char}</span>);

                }

                return char;

            });

            return (<div className="string-field" key={id} id={id}>{symbols.length ? symbols : ' '}</div>);
        });

        const infoTags = orderStrings.map(id => {

            if(strings[id].tag) {

                const tag = strings[id].tag;

                let delta = tag.height - field.lineHeight;

                return [this.props.syllableOff || !strings[id].vowel.length ? null: <div key={`s-${tag.top}`} className="syllable com-popover" style={{top: tag.top + delta}} title="Количество слогов">{strings[id].vowel.length}</div>, this.props.stringNumberOff ? null:<div key={`n-${tag.top}`} className="string-number com-popover" style={{top: tag.top}} title="Номер строки">{++stringCounter}</div>];
            }
        });

        let props = {
            onInput:this.handleTextInput,
            value: this.state.text,
            classNames: "field-editable",
            getMeasure: this.getMeasureField,
            readOnly: this.props.readOnly,
            placeHolder: 'Напишите или вставьте текст...'
        };

        return (
            <div className="work-field">
                <div className="field-editable fake-field" ref="fakeField">{fakeStrings}</div>
                <div className="backdrop field-editable">{this.state.selectedText}
                </div>
                <div className="paint-field">{tags}{infoTags}
                    <Textarea {...props}/>
                </div>
            </div>
        )
    }
}