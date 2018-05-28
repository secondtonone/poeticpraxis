import styled, { css } from 'styled-components';

import theme from './theme';
import { show, upAlt, up } from './animations';
import { withElements } from './helpers';
import { hexToRgb } from '../utils';

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
    color: ${theme.primaryGray};
`;

const Hint = styled.div`
    font-size: 14px;
    font-weight: 300;
    color: ${theme.primaryGray};
    margin: 16px auto;
    text-align: center;
    line-height: 22px;
`;

const LeftedLayout = styled.div`
    margin-left: 100px;

    @media (max-width: 600px) {
        padding: 64px 0 0;
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
    position: relative;
    margin: ${(props) => (props.margin ? props.margin : 0)};
    padding: ${(props) => (props.padding ? props.padding : 0)};
`;

const InlineContainer = styled.div`
    display: inline-block;
    text-align: ${(props) => (props.align ? props.align : 'left')};
    margin: ${(props) => (props.margin ? props.margin : 0)};
    padding: ${(props) => (props.padding ? props.padding : 0)};
    vertical-align: ${(props) =>
        props.vertical ? props.vertical : 'baseline'};
`;

const MobileHiddenContainer = styled.div`
    @media (max-width: 600px) {
        display: none;
    }
`;

const Text = styled.div`
    font-family: ${theme.mainFont};
    line-height: 29px;
    font-size: 18px;
    letter-spacing: 0px;
    font-weight: 300;
    word-spacing: 6px;
    margin-bottom: 24px;
`;

Text.Title = styled.h1`
    font-family: ${theme.mainFont};
    line-height: 32px;
    font-size: 22px;
    letter-spacing: 0px;
    font-weight: 400;
    margin-bottom: 18px;
`;

Text.Wrapper = styled.div`
    padding: 50px 10% 50px;
    overflow: hidden;

    @media (max-width: 600px) {
        padding: 25px 5% 25px 5%;
    }
`;

const Link = styled.a`
    color: ${(props) => props.theme.accentColor};
`;

const Footer = styled.p`
    font-family: ${theme.mainFont};
    line-height: 29px;
    font-size: 12px;
    letter-spacing: 0px;
    font-weight: 300;
    word-spacing: 3px;
    margin-top: 18px;
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

const List = styled.div.attrs({ className: withElements })`
    position: relative;
    padding: 16px 64px 80px;
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

const DropdownList = styled.li`
    position: absolute;
    top: -3px;
    ${(props) => props.side || 'left'}: 8px;
    list-style: none;
    background: ${(props) => props.theme.primaryColor};
    margin: 0;
    padding: 0;
    width: 100%;
    min-width: 250px;
    box-shadow: 5px 4px 25px 3px
        rgba(${(props) => hexToRgb(props.theme.secondColor).join(',')}, 0.1);
    max-height: 200px;

    &:focus {
        outline: none;
    }
`;

DropdownList.ListItem = styled.ul`
    margin: 0;
    padding: 16px;
    color: ${(props) =>
        props.active ? props.theme.accentColor : props.theme.secondColor};
`;

const SimpleTextarea = styled.textarea``;

export {
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
    InlineContainer,
    MobileHiddenContainer
};
