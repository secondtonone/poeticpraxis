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
            isExpanded: true,
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

    clearInput = () => {

        let text = '';

        this.setState({
            text
        });
    }


    expanding = () => {

        let isExpanded = this.state.isExpanded? false: true;

        this.setState({
            isExpanded
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
            label: 'Материал',
            placeHolder: 'Введите слова или вставьте текст...'
        };

        const classChanger = (side, order)=>{

            let additional = order;

            if(!this.state.isListHidden) {

                additional = `${side} list--half`;
            }

            return `list list--animated ${additional}`;
        };

        return (
            <div>

                <button className="button_rounded button_main" type="button" onClick={this.getResult} disabled={!this.state.text} title="Нарезать"><i className="material-icons material-icons--big">widgets</i></button>

                <div className={classChanger('list--left', 'list--first')}>

                    {this.state.isExpanded?null:<label className="field-title">{props.label}</label>}

                   {this.state.isExpanded? <div className="work-field">
                        <Textarea {...props}/>
                    </div>:null}

                    {this.state.text.length && this.state.isExpanded?<button className="button_rounded field-clear-button" type="button" onClick={this.clearInput} title="Стереть текст"><i className="material-icons material-icons--small">delete</i>
                    </button>:null}



                    {this.state.isListHidden?null:<button className="button_rounded button_transparent list__button-expand" type="button" onClick={this.expanding} title="Стереть текст">{this.state.isExpanded?<i className="material-icons material-icons--big">expand_less</i>: <i className="material-icons material-icons--big">expand_more</i>}
                    </button>}

                </div>

                <div className={classChanger('list--right', 'list--second')}>
                    <div className="matches">
                        <h1 className="matches__title">Выбранные</h1>
                        {this.state.pinned.length?null:<div className="matches__hint">Выберите сочетание,<br/> нажав на  <i className="material-icons material-icons--small">check_circle</i></div>}
                        <ul>{this.state.pinned.map((match, index)=>{
                            return (<li className="matches__item" key={`p${randomize()}`}>
                                <button className="button_rounded button_transparent button_middle  matches__pin matches__pin--pinned" type="button" title="Удалить" onClick={() => this.deleteMatch(index)}>
                                    <i className="material-icons material-icons--middle">cancel</i>
                                </button>
                                {match}</li>)
                        })}</ul>
                        {this.state.pinned.length?<button className="button_flat button_transparent button_long matches__send" type="button" onClick={this.toTable}>Посмотреть ритм <i className="material-icons material-icons--small">arrow_forward</i>
                        </button>: null}
                    </div>
                    <div className="matches">
                        <h1 className="matches__title">Сочетания</h1>
                        {this.state.result.length?null:<div className="matches__hint">Нажмите снова на <i className="material-icons material-icons--small">widgets</i>,<br/> чтобы получить новые сочетаиния</div>}
                        <ul>{this.state.result.map((words, index)=>{

                            const match = words.join(' ');

                            return (<li className="matches__item" key={`w${randomize()}`}>
                                <button className="button_rounded button_transparent button_middle matches__pin" type="button" title="Выбрать" onClick={() => this.pinMatch(match, index)}>
                                    <i className="material-icons material-icons--middle">check_circle</i>
                                </button>
                                <div className="matches__text">{match}</div></li>)
                        })}</ul>
                    </div>
                </div>



            </div>
        )
    }
}
