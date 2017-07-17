import React from 'react';
import {randomize} from '../../utils';

export default class Textarea extends React.Component {
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

        const width = this.refs.field.clientWidth;
        const height = this.refs.field.clientHeight;
        const offset =  this.refs.field.offsetHeight - height;
        let lineHeight = window.getComputedStyle(this.refs.field, null).lineHeight;

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
        this.heightChange(this.refs.field);
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
        this.refs.field.focus();
    }

    render() {

        const { classNames, value, onMouseUp, onInput, onClick, readOnly, placeHolder, label, onFocus} = this.props;

        const id = `i${randomize()}`;

        return (
            <div>
                <label htmlFor={id} className={label && value?'field-title':'visuallyhidden'}>{label}</label>
                <textarea name={id} id={id} className={classNames} onInput={onInput} onMouseUp={onMouseUp} onClick={onClick} onFocus={onFocus} value={value} ref="field" readOnly={readOnly} placeholder={placeHolder}></textarea>
            </div>);
    }
}