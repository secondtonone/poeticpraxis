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
            pinned: [],
            wordsNumber: 2
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

    checkPosition = () => {
        return window.matchMedia('(max-width: 800px)').matches;
    }

    getResult = () => {

        /*let words = this.state.text.toLowerCase().match(/[a-zA-ZА-Яа-яёЁ\-]+/g) || [];*/

        let words = this.state.text.toLowerCase().match(/[a-zA-ZА-Яа-яёЁ'-]+/g).filter(n => {
            return /[^'-]/g.test(n);
        }) || [];



        const result = imaged(words, this.state.wordsNumber);

        let isListHidden = this.state.isListHidden;

        let isExpanded = this.state.isExpanded;

        if(isListHidden) {
            isListHidden = false;
        }

        if(this.checkPosition()) {
            isExpanded = false;
        }

        this.toTheTop();

        this.setState({
            result,
            isListHidden,
            isExpanded
        });
    }

    setWordsNumber = (e) => {

        const wordsNumber = e.target.value;

        this.setState({
            wordsNumber
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

        this.toTheTop();

        this.setState({
            text
        });
    }


    expanding = () => {

        let isExpanded = this.state.isExpanded? false: true;


        this.toTheTop();


        this.setState({
            isExpanded
        });

    }


    toRhythmic = () => {

        let imageEngine = {
            pinned: this.state.pinned
        };

        this.props.transmit({
            imageEngine
        });

        browserHistory.push('/rhythmic');
    }

    toTheTop = () => {
        window.scrollTo(0,0);
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

        const styleChanger = () => {

            if(this.state.isExpanded) {
                return {};
            }

            return {
                height: 0,
                overflow: 'hidden'
            };
        }


        return (
            <div>

                <div className="input-container input-container_main animation-up">
                    <label htmlFor="wordNumber" className="input-container_label">Словосочетание из:</label>
                    <i className="material-icons input-container_icon">arrow_drop_down</i>
                    <select name="wordsNumber" className="input-container_select" id="wordNumber" value={this.state.wordsNumber} onChange={this.setWordsNumber}>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                </div>

                <button className="button_rounded button_main animation-up" type="button" onClick={this.getResult} disabled={!this.state.text} title="Нарезать"><i className="material-icons material-icons--big">widgets</i></button>

                <div className={classChanger('list--left', 'list--first')}>

                    {this.state.isExpanded?null:<label className="field-title" onClick={this.expanding}>{props.label}</label>}
                    <div style={styleChanger()}>
                        <div className="work-field">
                            <Textarea {...props}/>
                        </div>
                    </div>

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
                        {this.state.pinned.length?<button className="button_flat button_transparent button_long matches__send" type="button" onClick={this.toRhythmic}>Посмотреть ритм <i className="material-icons material-icons--small">arrow_forward</i>
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
                        {this.state.result.length > 30?<button className="button_flat button_transparent button_long matches__send" type="button" onClick={this.toTheTop}>Вернуться наверх <i className="material-icons material-icons--small">arrow_upward</i>
                        </button>: null}
                    </div>
                </div>



            </div>
        )
    }
}
