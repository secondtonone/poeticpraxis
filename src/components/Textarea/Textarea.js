import { h, Component } from 'preact';
import { randomize, delay } from '../../utils';

import { FieldLabel, SimpleTextarea } from '../../styles/components';

export default class Textarea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: {
                width: 0
            }
        };

        this.delayHeightChange = 0;
    }

    componentDidMount() {
        delay(this.getBoxMeasure);
    }

    getBoxMeasure = () => {
        // if (this.props.focus) {
        //     this.timerID = setTimeout(() => {
        //         this.fieldFocusing();
        //     }, this.props.focus);
        // }

        //const width = this.field.clientWidth;
        const height = this.field.clientHeight;
        const offset = this.field.offsetHeight - height;
        let lineHeight = window.getComputedStyle(this.field, null).lineHeight;

        lineHeight = parseInt(lineHeight, 10);

        const field = {
            //width,
            height,
            offset,
            lineHeight
        };

        this.props.getMeasure(field);

        this.setState({
            field
        });
    };

    componentDidUpdate() {
        if (this.delayHeightChange) {
            clearTimeout(this.delayHeightChange);
        }
        this.delayHeightChange = delay(() => this.heightChange(this.field));
    }

    componentWillUnmount() {
        //clearTimeout(this.timerID);
        clearTimeout(this.delayHeightChange);
    }

    heightChange = (element) => {
        element.style.height = 'auto';

        const height = element.scrollHeight;

        element.style.height = height + this.state.field.offset + 'px';
    };

    fieldFocusing = () => {
        this.field.focus();
    };

    render({
        Textarea = SimpleTextarea,
        value,
        onMouseUp,
        onInput,
        onClick,
        readOnly,
        className,
        placeHolder,
        label,
        onFocus,
        onBlur,
        onMouseMove,
        onKeyDown,
        onKeyUp,
        zoomIn
    }) {
        const id = `i${randomize()}`;

        return (
            <div>
                <FieldLabel for={id} isHidden={!(label && value)}>
                    {label}
                </FieldLabel>
                <Textarea
                    name={id}
                    id={id}
                    onInput={onInput}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onClick={onClick}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyUp={onKeyUp}
                    onKeyDown={onKeyDown}
                    zoomIn={zoomIn}
                    value={value}
                    className={className}
                    innerRef={(ref) => (this.field = ref)}
                    readOnly={readOnly}
                    placeholder={placeHolder}
                    aria-label="workfield"
                />
            </div>
        );
    }
}
