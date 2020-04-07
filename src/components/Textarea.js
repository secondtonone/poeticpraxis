import { h } from 'preact';
import {
    useLayoutEffect,
    useRef,
    useCallback,
    memo,
} from 'preact/compat';
import randomize from '@utils/randomize';

import { FieldLabel, SimpleTextarea } from '@styles/components';

let delayHeightChange = null;
const id = `i${randomize()}`;

const Textarea = memo(({
    getRef,
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
    zoomIn,
    onChange,
}) => {
    const textarea = useRef();

    useLayoutEffect(() => {
        getRef && getRef(textarea.current);
        return () => cancelAnimationFrame(delayHeightChange);
    }, []);

    useLayoutEffect(() => {
        delayHeightChange = requestAnimationFrame(heightChange);
    }, [value, zoomIn]);

    const heightChange = useCallback(() => {
        textarea.current.style.height = 'auto';
        const scrollHeight = textarea.current.scrollHeight;
        textarea.current.style.height = scrollHeight + 'px';
    },[]);

    const _onChange = useCallback(
        () => {
            onChange && onChange();
        },
        [onChange]
    );

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
                ref={textarea}
                readOnly={readOnly}
                onChange={_onChange}
                placeholder={placeHolder}
                aria-label="workfield"
            />
        </div>
    );
});

export default Textarea;
