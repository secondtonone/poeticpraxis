import { h } from 'preact';
import {
    useLayoutEffect,
    useRef,
    useCallback,
    memo,
} from 'preact/compat';
import randomize from '@utils/randomize';

import { FieldLabel } from '@styles/components';
import FieldEditableArea from '@components/FieldEditableArea';

let delayHeightChange = null;
const id = `i${randomize()}`;

interface TextareaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
    readOnly?: boolean
    value?: string
    placeHolder?: string
    label?: React.ReactNode
    zoomIn?: boolean
    getRef?: (el: HTMLTextAreaElement) => void
}

const Textarea = memo(({
    getRef,
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
}: TextareaProps) => {
    const textarea = useRef<HTMLTextAreaElement>(null);

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

    return (
        <div>
            <FieldLabel htmlFor={id} isHidden={!(label && value)}>
                {label}
            </FieldLabel>
            <FieldEditableArea
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
                onChange={onChange}
                placeholder={placeHolder}
                aria-label="workfield"
            />
        </div>
    );
});

export default Textarea;
