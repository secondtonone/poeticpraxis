import styled from 'styled-components';

import theme from '../../styles/theme';

const StyledSecondaryMenu = styled.div`
    position: fixed;
    display: flex;
    top: 180px;
    left: 0;
    width: 100px;
    z-index: 1000;

    @media (max-width: 600px) {
        top: 0;
        width: 100%;
        padding: 16px 8px 0;
        flex-direction: column;
        background-color: ${(props) =>
            props.theme.name === 'dark'
                ? props.theme.grayDarkColor
                : props.theme.primaryColor};
        box-shadow: 2px 1px 20px 0px rgba(0, 0, 0, 0.1);
    }
`;

const LogoContainer = styled.div`
    display: none;

    @media (max-width: 600px) {
        display: block;
        margin: 0 auto;
    }
`;

const StateSelect = styled.div`
    @media (max-width: 600px) {
        display: block;
    }
`;

const Menu = styled.ul`
    display: block;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0px;
    word-spacing: 2px;
    font-size: 8px;
    font-weight: 400;
    text-align: center;
    line-height: 16px;

    @media (max-width: 600px) {
        display: flex;
        font-size: 14px;
    }
`;

const Item = styled.li`
    display: block;
    padding: 16px;
    box-sizing: border-box;

    color: ${(props) => {
        if (props.active) {
            return props.theme.accentColor;
        }

        if (props.disabled) {
            return theme.primaryGray;
        }

        return props.theme.secondColor;
    }};

    fill: ${(props) => {
        if (props.active) {
            return props.theme.accentColor;
        }

        if (props.disabled) {
            return theme.primaryGray;
        }

        return props.theme.secondColor;
    }};

    @media (max-width: 600px) {
        width: ${(props) => (props.count === 2 ? `50%` : '33%')};
        border-bottom: ${(props) =>
            props.active
                ? `2px solid ${props.theme.accentColor}`
                : '2px solid transparent'};
    }
`;

const Container = styled.div`
    position: absolute;
    right: 8px;
    top: 16px;
    display: none;
    text-align: right;

    & button {
        margin: 0 16px;
    }

    @media (max-width: 600px) {
        display: flex;
    }
`;

export {
    Menu,
    Item,
    StateSelect,
    StyledSecondaryMenu,
    Container,
    LogoContainer
};
