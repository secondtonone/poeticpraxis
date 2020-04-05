import { h } from 'preact';
import { memo } from 'preact/compat';
import styled from 'styled-components';

const Range = styled.input`
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    -moz-appearance: none;
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
    height: 4px;
    ${(props) =>
        props.hideThumb ? `overflow: hidden;` : ''} &::-webkit-slider-thumb {
        -webkit-appearance: none;
    }

    &:disabled {
        cursor: none;
    }

    &:focus {
        outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
    }

    &::-ms-track {
        width: 100%;
        cursor: pointer;

        /* Hides the slider so custom styles can be added */
        background: transparent;
        border-color: transparent;
        color: transparent;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: ${(props) => (props.hideThumb ? `1px` : '16px')};
        width: ${(props) => (props.hideThumb ? `1px` : '16px')};
        border-radius: 50%;
        border: 0;
        background: ${(props) => props.theme.secondColor};
        cursor: pointer;
        margin-top: -7.5px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14),
            0 2px 2px 0 rgba(0, 0, 0, 0.098),
            0 1px 5px 0 rgba(0, 0, 0, 0.084)
                ${(props) =>
                    props.hideThumb ? ' , -1000px 0 0 1000px #DE2420' : ''};
    }

    /* All the same stuff for Firefox */
    &::-moz-range-thumb {
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14),
            0 2px 2px 0 rgba(0, 0, 0, 0.098),
            0 1px 5px 0 rgba(0, 0, 0, 0.084)
                ${(props) =>
                    props.hideThumb ? ' , -1000px 0 0 1000px #DE2420' : ''};
        height: ${(props) => (props.hideThumb ? `1px` : '16px')};
        width: ${(props) => (props.hideThumb ? `1px` : '16px')};
        border-radius: 50%;
        border: 0;
        background: ${(props) => props.theme.secondColor};
        cursor: pointer;
    }

    /* All the same stuff for IE */
    &::-ms-thumb {
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14),
            0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
        height: 16px;
        width: 16px;
        border-radius: 50%;
        border: 0;
        background: ${(props) => props.theme.secondColor};
        cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background-color: ${(props) => props.theme.grayColor};
        border-radius: 4px;
    }

    &:focus::-webkit-slider-runnable-track {
        background-color: ${(props) => props.theme.grayColor};
    }

    &::-moz-range-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background-color: ${(props) => props.theme.grayColor};
        border-radius: 4px;
    }

    &::-moz-range-progress {
        height: 4px;
        ${(props) =>
            props.hideThumb
                ? `background-color: ${(props) => props.theme.accentColor};`
                : ''};
    }

    &::-ms-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    &::-ms-fill-lower {
        ${(props) =>
            props.hideThumb
                ? `background-color: ${(props) => props.theme.accentColor};`
                : ''};
        border-radius: 4px;
    }
    &:focus::-ms-fill-lower {
        ${(props) =>
            props.hideThumb
                ? `background-color: ${(props) => props.theme.accentColor};`
                : ''};
    }
    &::-ms-fill-upper {
        background-color: ${(props) => props.theme.grayColor};
        border-radius: 4px;
    }
    &:focus::-ms-fill-upper {
        background-color: ${(props) => props.theme.grayColor};
    }
`;

export default memo((props) => <Range {...props} />)
