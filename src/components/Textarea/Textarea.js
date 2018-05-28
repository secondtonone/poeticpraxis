import { h, Component } from 'preact';
import { randomize } from '../../utils';

import { FieldLabel, SimpleTextarea } from '../../styles/components';

export default class Textarea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: {
                width: 0
            }
        };
    }

    componentDidMount() {
        if (this.props.focus) {
            this.timerID = setTimeout(() => {
                this.fieldFocusing();
            }, this.props.focus);
        }

        const width = this.field.clientWidth;
        const height = this.field.clientHeight;
        const offset = this.field.offsetHeight - height;
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
