import { h } from 'preact';
import { PureComponent } from 'preact/compat';
import randomize from '@utils/randomize';

import { FieldLabel, SimpleTextarea } from '@styles/components';

export default class Textarea extends PureComponent {

    field = null;
    delayHeightChange = 0;
    componentDidMount() {
        this.props.getRef && this.props.getRef(this.field);
        this.heightChange();
    }

    componentDidUpdate() {
        this.delayHeightChange = requestAnimationFrame(this.heightChange);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.delayHeightChange);
    }

    heightChange = () => {
        this.field.style.height = 'auto';

        const height = this.field.scrollHeight;

        this.field.style.height = height + 'px';
    };

    getRef = (ref) => this.field = ref

    onChange  = () => this.props.onChange && this.props.onChange()

    render() {
        const {
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
        } = this.props;

        const id = `i${randomize()}`;

        return (
            <div>
                <FieldLabel htmlFor={id} isHidden={!(label && value)}>
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
                    ref={this.getRef}
                    readOnly={readOnly}
                    onChange={this.onChange}
                    placeholder={placeHolder}
                    aria-label="workfield"
                />
            </div>
        );
    }
}
