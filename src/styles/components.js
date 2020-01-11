import styled, { css } from 'styled-components';

import theme from './theme';
import { show, upAlt, up } from './animations';
import { withElements } from './helpers';

const Hidden = css`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

const Flex = styled.div`
    display: flex;
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '100%')};
    flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
    justify-content: ${(props) => (props.justify ? props.justify : 'center')};
    align-items: ${(props) => (props.align ? props.align : 'center')};
    margin: ${(props) => (props.margin ? props.margin : 0)};
    padding: ${(props) => (props.padding ? props.padding : 0)};
`;

const FieldEditableArea = styled.textarea`
    position: relative;
    font-family: ${theme.mainFont};
    height: 100%;
    width: 100%;
    margin: 0;
    color: ${(props) => props.theme.secondColor};
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

    &:focus {
        outline: none;
    }

    ${(props) => {
        if (props.zoomIn) {
            return `font-size: 28px;`;
        }
    }};
`;

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

    @media (max-width: 600px) {
        padding: 128px 0 0;
        margin: 0;
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

const Container = styled.div`
    width: ${(props) => (props.width ? props.width : '100%')};
    display: ${(props) => (props.display ? props.display : 'block')};
    position: ${(props) => (props.position ? props.position : 'relative')};
    height: ${(props) => (props.height ? props.height : '100%')};
    margin: ${(props) => (props.margin ? props.margin : 0)};
    padding: ${(props) => (props.padding ? props.padding : 0)};
    z-index: ${(props) => (props.zIndex ? props.zIndex : 0)};
    top: ${(props) => (props.top ? props.top : 'auto')};
    bottom: ${(props) => (props.bottom ? props.bottom : 'auto')};
    left: ${(props) => (props.left ? props.left : 'auto')};
    right: ${(props) => (props.right ? props.right : 'auto')};
`;


const DesctopHiddenContainer = styled.div`
    display: none;
    @media (max-width: 600px) {
        display: block;
    }
`;

const Text = styled.div`
    font-family: ${theme.mainFont};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '1.7')};
    font-size: ${(props) => (props.size ? `${props.size}px` : '18px')};
    letter-spacing: ${(props) =>
        props.spacing ? `${props.spacing}px` : '0px'};
    font-weight: ${(props) => (props.weight ? props.weight : '300')};
    word-spacing: 6px;
    margin-bottom: ${(props) => (props.mb ? `${props.mb}px` : '18px')};
    text-align: ${(props) => (props.align ? props.align : 'left')};
    ${(props) => (props.isHidden ? 'display: none;' : '')};
`;

const Link = styled.a`
    color: ${(props) => props.theme.accentColor};
`;

const Footer = styled.footer`
    font-family: ${theme.mainFont};
    line-height: 29px;
    font-size: 14px;
    letter-spacing: 0px;
    font-weight: 300;
    word-spacing: 3px;
    margin-top: 200px;
    text-align: center;
`;

const FieldLabel = styled.label`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 8px;
    color: ${theme.primaryGray};
    font-family: ${theme.mainFont};

    ${(props) => (props.isHidden ? Hidden : '')};
`;

const List = styled.div.attrs((props) => ({ className: withElements(props) }))`
    position: relative;
    padding: 32px 64px 80px;
    max-width: 794px;
    width: 100%;
    min-height: 1042px;
    background-color: transparent;
    margin: 0 auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-align: left;
    transition: all 1.5s ease-in-out;
    opacity: 1;

    &._animated {
        transform: translateY(2000px);
        animation-name: ${up};
        animation-duration: 0.2s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in-out;
    }

    &._horizontal {
        display: inline-block;
        vertical-align: top;
        width: 50%;
    }

    @media (max-width: 880px) {
        min-height: 100%;
    }

    @media (max-width: 794px) {
        width: 100%;
    }

    @media (max-width: 600px) {
        padding: 24px 24px 64px;
    }
`;

const DropdownList = styled.ul`
    position: absolute;
    top: ${(props) => props.top || '-3px'};
    ${(props) => props.side || 'left'}: 8px;
    list-style: none;
    background: ${(props) => props.theme.primaryColor};
    margin: 0;
    padding: 0;
    width: 100%;
    min-width: 150px;
    box-shadow: 5px 4px 25px 3px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    outline: none;
    ${(props) =>
        props.theme.name === 'dark'
            ? `background: ${props.theme.grayDarkColor};`
            : ''} &:focus {
        outline: none;
    }
`;

DropdownList.ListItem = styled.li`
    margin: 0;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) =>
        props.active ? props.theme.accentColor : props.theme.secondColor};
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

    @media (max-width: 600px) {
        display: flex;
        position: fixed;
        bottom: 8px;
        right: 8px;
        z-index: 1002;
    }
`;

const Backdrop = styled.div`
    position: fixed;
    height: 100vh;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${(props) =>
        props.theme.name === 'dark'
            ? 'rgba(0, 0, 0, 0.7)'
            : 'rgba(255, 255, 255, 0.7)'};
`;

const LandingContainer = styled.div`
    margin: -168px 0 0;

    @media (max-width: 600px) {
        margin: 0;
    }
`;

const Mirrored = styled.span`
    transform: scale(-1, 0);
`;

const TextAccent = styled.span`
    color: ${(props) => props.theme.accentColor};
`;

const TextMinor = styled.span`
    color: ${(props) => props.theme.grayColor};
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

export {
    Backdrop,
    FieldEditableArea,
    DropdownList,
    SecondaryTitle,
    Hint,
    LeftedLayout,
    AnimationShow,
    AnimationUp,
    Container,
    Text,
    Link,
    Footer,
    FieldLabel,
    SimpleTextarea,
    List,
    Flex,
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
    BetaSign
};
