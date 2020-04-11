import styled, { css } from 'styled-components';

import theme from './theme';
import { show, upAlt, downAlt } from './animations';

const SecondaryTitle = styled.h2`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 8px;
    color: ${(props) => props.theme.secondColor};
`;

const Hint = styled.div`
    font-size: 14px;
    font-weight: 300;
    color: ${(props) => props.theme.secondColor};
    margin: 16px auto;
    text-align: center;
    line-height: 22px;
`;

const LeftedLayout = styled.div`
    margin-left: 100px;
    padding: 32px 0 0;

    @media (max-width: 600px) {
        padding: 121px 0 0;
        margin: 0;
    }

    @media (min-width: 1100px) {
        margin-left: 200px;
    }
`;

const AnimationShow = css`
    opacity: 0;
    animation-name: ${show};
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
`;

const AnimationUp = css`
    transform: translateY(1000%);
    animation-name: ${upAlt};
    animation-duration: 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
`;

const AnimationDown = css`
    transform: translateY(-1000%);
    animation-name: ${downAlt};
    animation-duration: 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
`;


const DesctopHiddenContainer = styled.div`
    display: none;
    @media (max-width: 600px) {
        display: block;
    }
`;

const Link = styled.a`
    color: ${(props) => props.theme.accentColor};
    fill: ${(props) => props.theme.accentColor};
`;

const Footer = styled.footer`
    font-family: ${theme.mainFont};
    line-height: 29px;
    font-size: 14px;
    letter-spacing: 0px;
    font-weight: 300;
    word-spacing: 3px;
    text-align: center;
`;

const FieldLabel = styled.label`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 8px;
    color: ${theme.primaryGray};
    font-family: ${theme.mainFont};

    ${(props) => (props.isHidden ? props.isHidden : '')};
`;

const SimpleTextarea = styled.textarea``;

const ShowOnHover = styled.div`
    display: none;
    opacity: 0;
    transition: opacity 0.5s;
    pointer-events: none;
`;

const HideOnHover = styled.div`
    display: block;
    opacity: 1;
    transition: opacity 0.5s;
    pointer-events: none;
`;

const HoveredElement = styled.div`
    &:hover ${ShowOnHover} {
        display: block;
        opacity: 1;
    }

    &:hover ${HideOnHover} {
        display: none;
        opacity: 0;
    }
`;

const ActionBar = styled.div`
    display: none;

    & button {
        margin-left: 16px;
    }

    ${(props) =>
        props.minHeight
            ? `
            transform: translateY(0);
            transition: transform 0.5s ease-in;`
            : ''}

    @media (max-width: 600px) {
        display: flex;
        position: fixed;
        bottom: 8px;
        right: 8px;
        z-index: 1002;
    }

    @media (max-height: ${(props) => props.minHeight? props.minHeight: '0' }) {
        transform: translateY(120%);
        display: none;
    }
`;

const Backdrop = styled.div`
    position: fixed;
    height: 100vh;
    z-index: 9999;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${(props) =>
        props.theme.name === 'dark'
            ? 'rgba(0, 0, 0, 0.7)'
            : 'rgba(255, 255, 255, 0.7)'};
`;

const LandingContainer = styled.div`
    margin: 0;
`;

const Mirrored = styled.span`
    transform: scale(-1);
`;

const TextAccent = styled.span`
    color: ${(props) => props.theme.accentColor};
`;

const TextMinor = styled.span`
    color: ${(props) => props.theme.grayColor};
`;

const TextConstructor = styled.span`
    letter-spacing: ${(props) => (props.letter ? props.letter : '0')}px;
    word-spacing: ${(props) => (props.word ? props.word : '0')}px;

    @media (max-width: 800px) {
        letter-spacing: inherit;
        word-spacing: inherit;
    }
`;

const PrimaryColor = styled.span`
    background: ${(props) => props.theme.primaryColor};
`;

const Strong = styled.span`
    font-weight: 400;
`;

const HiddenSelect = styled.select`
    opacity: 0;
    outline: none;
    border: 0;
    padding: 0;
    margin: 0;
    position: absolute;
`;

const BetaSign = styled.div`
    position: relative;

    &::after {
        position: absolute;
        right: -8px;
        top: -5px;
        content: '\\03B2';
        color: ${(props) => props.theme.secondColor};
        font-size: 12px;
    }
`;

const TriangleButton = styled(Mirrored)`
    font-size: 120px;
    -moz-transform: scale(-2.9) translate(0, -9px);
    color: ${(props) => props.theme.accentColor};
    height: 152px;
    position: absolute;
    top: -75px;

    @media (max-width: 600px) {
        font-size: 94px;
        top: -90px;
    }
`;

export {
    Backdrop,
    SecondaryTitle,
    Hint,
    LeftedLayout,
    AnimationShow,
    AnimationUp,
    AnimationDown,
    TextConstructor,
    Link,
    Footer,
    FieldLabel,
    SimpleTextarea,
    LandingContainer,
    TextAccent,
    Strong,
    TextMinor,
    HoveredElement,
    ShowOnHover,
    HideOnHover,
    DesctopHiddenContainer,
    ActionBar,
    Mirrored,
    HiddenSelect,
    BetaSign,
    TriangleButton,
    PrimaryColor
};
