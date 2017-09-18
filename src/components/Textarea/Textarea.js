import { h, Component } from 'preact';
import {randomize} from '../../utils';

export default class Textarea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: {
                width: 0
            }
        };
    }

    componentDidMount(){

        if(this.props.focus) {
            this.timerID = setTimeout(()=>{
                this.fieldFocusing();
            }, this.props.focus);
        }

        const width = this.field.clientWidth;
        const height = this.field.clientHeight;
        const offset =  this.field.offsetHeight - height;
        let lineHeight = window.getComputedStyle(this.field, null).lineHeight;

        lineHeight = parseInt(lineHeight, 10);

        const field = {
            width,
            height,
            offset,
            lineHeight
        };

        this.setState({
            field
        });

        this.props.getMeasure(field);
    }

    componentDidUpdate() {
        this.heightChange(this.field);
    }

    componentWillUnmount() {
        clearTimeout(this.timerID);
    }

    heightChange = (element) => {

        element.style.height = 'auto';

        const newHeight = element.scrollHeight + this.state.field.offset;

        element.style.height = `${newHeight}px`;
    }

    fieldFocusing = () => {
        this.field.focus();
    }

    render({ classNames, value, onMouseUp, onInput, onClick, readOnly, placeHolder, label, onFocus, onKeyDown, onKeyUp}) {

        const id = `i${randomize()}`;

        return (
            <div>
                <label for={id} class={label && value?'field-title':'visuallyhidden'}>{label}</label>
                <textarea name={id} id={id} class={classNames} onInput={onInput} onMouseUp={onMouseUp} onClick={onClick} onFocus={onFocus} onKeyUp={onKeyUp} onKeyDown={onKeyDown} value={value} ref={ ref => this.field = ref } readOnly={readOnly} placeholder={placeHolder} aria-label="workfield"></textarea>
            </div>);
    }
}