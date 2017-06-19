import React from 'react';
import {imaged, randomize} from '../../utils';
import Textarea from '../../components/Textarea';
import {browserHistory} from 'react-router';

export default class ImagesEngine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            result:[],
            isListHidden: true,
            text:'',
            words: [],
            field:{},
            pinned: []
        };
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }

    handleTextInput = (e) => {

        let text = e.target.value;

        this.setState({
            text
        });
    }

    getMeasureField = (field) => {

        this.setState({
            field
        });
    }

    getResult = () => {

        let words = this.state.text.toLowerCase().match(/[a-zA-ZА-Яа-яёЁ\-]+/g) || [];

        const result = imaged(words);

        let isListHidden = this.state.isListHidden;

        if(isListHidden) {

            isListHidden = false;
        }

        this.setState({
            result,
            isListHidden
        });
    }

    pinMatch = (match, index) => {

        let pinned = this.state.pinned;

        let result = this.state.result;

        pinned.push(match);

        result.splice(index, 1);

        this.setState({
            pinned,
            result
        });

    }

    deleteMatch = (index) => {

        let pinned = this.state.pinned;

        pinned.splice(index, 1);

        this.setState({
            pinned
        });

    }


    toTable = () => {

        let imageEngine = {
            pinned: this.state.pinned
        };

        this.props.transmit({
            imageEngine
        });

        browserHistory.push('/rhythmic');
    }

    render() {

        const self = this;

        const props = {
            onInput:this.handleTextInput,
            value: this.state.text,
            classNames: "field-editable",
            getMeasure: this.getMeasureField,
            label: 'Текст',
            placeHolder: 'Введите слова или вставьте текст...'
        };

        const classChanger = (side)=>{

            let additional = '';

            if(!this.state.isListHidden) {

                additional = `${side} list--half`;
            }

            return `list list--animated ${additional}`;
        };

        return (
            <div>
                <div className={classChanger('list--left')}>
                    <div className="work-field">
                        <Textarea {...props}/>
                        <button className="button_rounded button_main" type="button" onClick={this.getResult} disabled={!this.state.text}><i className="material-icons material-icons--big">widgets</i>
                        </button>
                    </div>
                </div>

                {this.state.isListHidden? null:<div className={classChanger('list--right')}>
                    {this.state.pinned.length?<div className="matches">
                        <h1 className="matches__title">Выбранные</h1>
                        <ul>{this.state.pinned.map((match, index)=>{
                            return (<li className="matches__item" key={`p${randomize()}`}>
                                <button className="button_rounded button_transparent button_small matches__pin matches__pin--pinned" type="button" onClick={() => this.deleteMatch(index)}>
                                    <i className="material-icons material-icons--small">cancel</i>
                                </button>
                                {match}</li>)
                        })}</ul>
                        <button className="button_flat button_transparent button_long matches__send" type="button" onClick={this.toTable}>Посмотреть ритм <i className="material-icons material-icons--small">arrow_forward</i>
                        </button>
                    </div>:null}
                    <div className="matches">
                        <h1 className="matches__title">Сочетания</h1>
                        <ul>{this.state.result.map((words, index)=>{

                            const match = words.join(' ');

                            return (<li className="matches__item" key={`w${randomize()}`}>
                                <button className="button_rounded button_transparent button_small matches__pin" type="button" onClick={() => this.pinMatch(match, index)}>
                                    <i className="material-icons material-icons--small">check_circle</i>
                                </button>
                                <div className="matches__text">{match}</div></li>)
                        })}</ul>
                    </div>
                </div>}
            </div>
        )
    }
}
