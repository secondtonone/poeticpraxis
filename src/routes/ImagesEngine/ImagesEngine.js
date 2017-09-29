import { h, Component } from 'preact';
import cn from 'classnames';
import {imaged, randomize} from '../../utils';
import Textarea from '../../components/Textarea';


export default class ImagesEngine extends Component {

    constructor(props) {
        super(props);

        const {
            result,
            isListHidden,
            isExpanded,
            text,
            words,
            field,
            pinned,
            wordsNumber
        } = props.engineState;

        this.state = {
            result,
            isListHidden,
            isExpanded,
            text,
            words,
            field,
            pinned,
            wordsNumber,
            sharedText: ''
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

        this.props.setEngineState(this.state);
    }

    setWordsNumber = (e) => {

        const wordsNumber = e.target.value;

        this.setState({
            wordsNumber
        });

        this.props.setEngineState(this.state);

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

        this.props.setEngineState(this.state);

    }

    deleteMatch = (index) => {

        let pinned = this.state.pinned;

        pinned.splice(index, 1);

        this.setState({
            pinned
        });


        this.props.setEngineState(this.state);

    }

    clearInput = () => {

        let text = '';

        this.toTheTop();

        this.setState({
            text
        });


        this.props.setEngineState(this.state);
    }


    expanding = () => {

        let isExpanded = this.state.isExpanded? false: true;


        this.toTheTop();


        this.setState({
            isExpanded
        });

        this.props.setEngineState(this.state);

    }


    toRhythmic = () => {

        let imageEngine = {
            pinned: this.state.pinned
        };

        const sharedText = this.state.pinned.join('\n');

        this.setState({
            sharedText
        });

        this.props.setEngineState(this.state);

        this.props.history.push('/rhythmic');
    }

    toTheTop = () => {
        window.scrollTo(0,0);
    }

    render({}, state) {

        const self = this;

        const props = {
            onInput:this.handleTextInput,
            value: this.state.text,
            classNames: 'field-editable',
            getMeasure: this.getMeasureField,
            label: 'Материал',
            placeHolder: 'Введите слова или вставьте текст...'
        };

        const classChanger = (side, order)=>{

            let additional = order;

            if(!state.isListHidden) {

                additional = `${side} list--half`;
            }

            return `list list--animated ${additional}`;
        };

        const styleChanger = () => {

            if(state.isExpanded) {
                return {};
            }

            return {
                height: 0,
                overflow: 'hidden'
            };
        }


        return (<section>

            <div class="input-container input-container_main animation-up">
                <label for="wordNumber" class="input-container_label">Словосочетание из:</label>
                <i class="material-icons input-container_icon">arrow_drop_down</i>
                <select name="wordsNumber" class="input-container_select" id="wordNumber" value={state.wordsNumber} onChange={this.setWordsNumber}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

            </div>

            <button class="button_rounded button_main animation-up" type="button" onClick={this.getResult} disabled={!state.text} title="Нарезать"><i class="material-icons material-icons--big">widgets</i></button>

            <div class={classChanger('list--left', 'list--first')}>

                {state.isExpanded?null:<label class="field-title" onClick={this.expanding}>{props.label}</label>}
                <div style={styleChanger()}>
                    <div class="work-field">
                        <Textarea {...props}/>
                    </div>
                </div>

                {state.text.length && state.isExpanded?<button class="button_rounded field-clear-button" type="button" onClick={this.clearInput} title="Стереть текст"><i class="material-icons material-icons--small">delete</i>
                </button>:null}



                {state.isListHidden?null:<button class="button_rounded button_transparent list__button-expand" type="button" onClick={this.expanding} title="Стереть текст">{state.isExpanded?<i class="material-icons material-icons--big">expand_less</i>: <i class="material-icons material-icons--big">expand_more</i>}
                </button>}

            </div>

            <div class={classChanger('list--right', 'list--second')}>
                <div class="matches">
                    <h1 class="matches__title">Выбранные</h1>
                    {state.pinned.length?null:<div class="matches__hint">Выберите сочетание,<br/> нажав на  <i class="material-icons material-icons--small">check_circle</i></div>}
                    <ul>{state.pinned.map((match, index)=>{
                        return (<li class="matches__item" key={`p${randomize()}`}>
                            <button class="button_rounded button_transparent button_middle  matches__pin matches__pin--pinned" type="button" title="Удалить" onClick={() => this.deleteMatch(index)}>
                                <i class="material-icons material-icons--middle">cancel</i>
                            </button>
                            {match}</li>)
                    })}</ul>
                    {state.pinned.length?<button class="button_flat button_transparent button_long matches__send" type="button" onClick={this.toRhythmic}>Посмотреть ритм <i class="material-icons material-icons--small">arrow_forward</i>
                    </button>: null}
                </div>
                <div class="matches">
                    <h1 class="matches__title">Сочетания</h1>
                    {state.result.length?null:<div class="matches__hint">Нажмите снова на <i class="material-icons material-icons--small">widgets</i>,<br/> чтобы получить новые сочетаиния</div>}
                    <ul>{state.result.map((words, index)=>{

                        const match = words.join(' ');

                        return (<li class="matches__item" key={`w${randomize()}`}>
                            <button class="button_rounded button_transparent button_middle matches__pin" type="button" title="Выбрать" onClick={() => this.pinMatch(match, index)}>
                                <i class="material-icons material-icons--middle">check_circle</i>
                            </button>
                            <div class="matches__text">{match}</div></li>)
                    })}</ul>
                    {state.result.length > 30?<button class="button_flat button_transparent button_long matches__send" type="button" onClick={this.toTheTop}>Вернуться наверх <i class="material-icons material-icons--small">arrow_upward</i>
                    </button>: null}
                </div>
            </div>



        </section>);
    }
}
