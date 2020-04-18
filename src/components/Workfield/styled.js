import styled, { css, keyframes } from 'styled-components';

import theme from '@styles/theme';

import blackTrianglePNG from './assets/black_triangle.png';
import blackTriangleSVG from './assets/black_triangle.svg';

import redTrianglePNG from './assets/red_triangle.png';
import redTriangleSVG from './assets/red_triangle.svg';

const field = css`
    font-family: ${theme.mainFont};
    height: 100%;
    width: 100%;
    margin: 0;
    letter-spacing: 0;
    word-spacing: 0;
    font-size: 18px;
    font-weight: 300;
    line-height: 52px;
    display: block;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: transparent;
    word-break: break-word;
    box-sizing: border-box;
    border: 0;
    resize: none;
    cursor: text;
`;

const WorkField = styled.div`
    position: relative;
    margin: 0 32px 32px 24px;
`;

const StringPauseRelative = styled.span`
    position: absolute;
    z-index: 1000;
    text-shadow: -1px -3px 0 ${(props) => props.theme.primaryColor},
        1px -3px 0 ${(props) => props.theme.primaryColor},
        -1px 1px 0 ${(props) => props.theme.primaryColor},
        1px 1px 0 ${(props) => props.theme.primaryColor},
        -2px 1px 0 ${(props) => props.theme.primaryColor},
        2px 1px 0 ${(props) => props.theme.primaryColor},
        0 -2px 0 ${(props) => props.theme.primaryColor},
        0 -3px 0 ${(props) => props.theme.primaryColor},
        0 -4px 0 ${(props) => props.theme.primaryColor},
        0 1px 0 ${(props) => props.theme.primaryColor};
    padding: 0 0 1px 0;
    color: ${theme.primaryGray};
    border: 0;
    font-size: 18px;

    &::after {
        position: absolute;
        right: 0;
        margin: 0 auto;
        width: 100%;
        text-align: center;
        height: 0;
        content: '\\25CF';
        color: ${theme.primaryGray};
        top: -16px;
        font-size: 11px;
    }

    &:hover {
        border-bottom: 1px solid ${theme.primaryGray};
    }
`;

const StringPause = styled.span`
    color: ${theme.primaryGray};
    border: 0;
    margin: 0 0 0 -0.1px;
    padding: 0;
`;

const StringField = styled.div`
    position: relative;
    white-space: pre-wrap;
`;
const TriangleElement = styled.span`
    &::after {
        position: relative;

        color: ${(props) => props.theme.accentColor};
        content: '\\25BC';
    }

    pointer-events: none;
`;

const CircleElement = styled.span`
    &::after {
        position: relative;

        color: ${(props) => props.theme.secondColor};
        content: '\\25CF';
    }

    pointer-events: none;
`;

const Syllable = styled.div`
    position: absolute;
    right: -25px;
    text-align: left;
    font-family: ${theme.mainFont};
    font-size: 14px;
    font-weight: 200;
    line-height: 50px;
    color: ${(props) => props.theme.secondColor};
    cursor: pointer;
    user-select: none;

    @media (max-width: 880px) {
        right: -12px;
    }

    @media (max-width: 600px) {
        right: -17px;

        &::before {
            position: absolute;
            top: 10px;
            right: 0;
            width: 100vw;
            letter-spacing: 3px;
            font-size: 10px;
            white-space: nowrap;
            color: ${theme.primaryGray};
            content: '....................' '....................'
                '....................' '....................'
                '....................' '....................'
                '....................' '....................'
                '....................' '....................'
                '....................' '....................';
        }
    }
`;

Syllable.Accent = styled.span`
    color: ${(props) => props.theme.accentColor};
    pointer-events: none;
    &::after {
        content: '/';
        font-size: 14px;
        font-weight: 300;
        line-height: 50px;
        color: ${(props) => props.theme.secondColor};
    }
`;

Syllable.AccentType = styled.div`
    position: absolute;
    bottom: -12px;
    text-align: center;
    left: 0;
    right: 0;
    font-size: 9px;
    pointer-events: none;

    @media (max-width: 600px) {
        left: auto;
    }
`;

const flash = keyframes`
    100% {
        opacity: 0.1;
        background-position: 10px;
    }
    50% {
        background-position: 5px;
    }
    10% {
        opacity: 0.9;
        background-position: 0;
    }
`;

const SyllableStub = styled(Syllable)`
    margin-top: 15px;
    background: ${(props) => props.theme.grayColor};
    background: linear-gradient(
        90deg,
        ${(props) => props.theme.grayColor} 0,
        ${(props) => props.theme.primaryColor} 50%,
        ${(props) => props.theme.grayColor} 100%
    );
    height: 20px;
    top: 15px;
    width: 20px;
    border-radius: 3px;
    animation: ${flash} 0.5s infinite ease-in-out;

    @media (max-width: 600px) {
        margin-top: 20px;

        &::before {
            top: -5px;
        }
    }
`;


const StringNumber = styled.div`
    position: absolute;
    left: -20px;
    text-align: right;
    font-family: ${theme.mainFont};
    font-size: 14px;
    font-weight: 300;
    line-height: 54px;
    width: 10px;
    color: rgb(216, 216, 216);
    cursor: help;
    user-select: none;
`;

const FieldEditable = styled.div`
    position: relative;
    ${field} &:focus {
        outline: none;
    }

    ${(props) => {
        if (props.zoomIn) {
            return `font-size: 28px;`;
        }
    }};
`;

const FakeField = styled.div`
    position: absolute;
    top: 0;
    opacity: 0;
    background-color: ${theme.secondWhite};
    color: #5d5c5c;
    ${field}
    &:focus {
        outline: none;
    }

    ${(props) => {
        if (props.zoomIn) {
            return `font-size: 28px;`;
        }
    }};
`;

const accentMixin = (color, imgSVG, imgPNG, accent) => {
    return `
        position: absolute;
        z-index: 1000;
        cursor: url('${imgSVG}'), url('${imgPNG}'), pointer;

        &::after {
            position: absolute;
            right: 0;
            margin: 0 auto;
            width: 100%;
            font-size: 11px;
            height: 0;
            text-align: center;
            color: ${color};

            ${
                accent == 'black' || accent == 'gray'
                    ? `content: '\\25CF';
                        top: -16px;`
                    : `content: '\\25BC';
                transform: rotate(0deg) scale(1.7);
                top: -23px;`
            }
        }

        &:hover::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 19px;
            margin: 0 auto;
            width: 100%;
            height: 1px;
            border-bottom: 1px solid ${color};

            @media (max-width: 600px) 
                top: 20px;
            }
        }
    `;
};

const AccentRelative = styled.span`
    ${(props) => {
        if (props.accent === 'red' || props.accent === 'red_secondary') {
            return accentMixin(
                props.accent === 'red'
                    ? props.theme.accentColor
                    : theme.secondRed,
                blackTriangleSVG,
                blackTrianglePNG,
                props.accent
            );
        }
        if (props.accent === 'black') {
            return accentMixin(
                props.theme.secondColor,
                redTriangleSVG,
                redTrianglePNG,
                props.accent
            );
        }
        if (props.accent === 'gray') {
            return accentMixin(
                props.theme.grayColor,
                blackTriangleSVG,
                blackTrianglePNG,
                props.accent
            );
        }
    }}
`;

const Accent = styled.span`
    position: relative;
    margin: 0 -0.1px;
    padding: 0;
    border: 0;

    ${(props) => {
        if (props.accent === 'red') {
            return `
                color: ${theme.primaryRed};
                `;
        }

        if (props.accent === 'black') {
            return `
                color: ${theme.primaryBlack};
                `;
        }

        if (props.accent === 'red_secondary') {
            return `
                color: ${theme.secondRed};
                `;
        }
        if (props.accent === 'gray') {
            return `
                    color: ${theme.grayColor};
                    `;
        }
    }}
`;

const MarkStub = styled.div`
    position: absolute;
    z-index: 1000;
    left: 0;
    background: ${(props) => props.theme.grayColor};
    background: linear-gradient(
        90deg,
        ${(props) => props.theme.grayColor} 0,
        ${(props) => props.theme.primaryColor} 50%,
        ${(props) => props.theme.grayColor} 100%
    );
    height: 5px;
    margin-top: 4px;
    top: 15px;
    width: 100px;
    border-radius: 3px;
    animation: ${flash} 0.5s infinite ease-in-out;
`;

const PaintField = styled.div`
    position: relative;

    & span,
    & span:focus {
        outline: ${(props) => props.theme.primaryColor};
    }

    ${(props) => {
        if (props.zoomIn) {
            return `
                background: ${theme.primaryBlack};
                font-size: 28px;

                & span {
                    font-size: inherit;
                }
                
                & span:hover::before {
                    top: 29px;
                }`;
        }
    }}
`;

const Overflowed = styled.div`
    overflow: hidden;
`;

export {
    Accent,
    StringPauseRelative,
    StringPause,
    StringField,
    Syllable,
    SyllableStub,
    MarkStub,
    TriangleElement,
    CircleElement,
    StringNumber,
    FakeField,
    AccentRelative,
    WorkField,
    FieldEditable,
    PaintField,
    Overflowed
};
