import styled from 'styled-components';

import theme from '../../styles/theme';

const StyledSecondaryMenu = styled.div`
    position: fixed;
    top: 180px;
    left: 0;
    width: 100px;
    z-index: 1000;

    @media (max-width: 600px) {
        top: 0;
        width: 100%;
        padding: 16px 8px;
        background: ${(props) => props.theme.primaryColor};
        box-shadow: 2px 1px 20px 0px rgba(0, 0, 0, 0.1);
    }
`;

const StateSelect = styled.div`
    width: 140px;
    display: none;
    font-size: ${(props) => props.size || '16px'};
    font-weight: ${(props) => props.weight || 300};

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
        display: none;
    }
`;

const Item = styled.li`
    display: block;
    padding: 16px;
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
        display: block;
    }
`;

export { Menu, Item, StateSelect, StyledSecondaryMenu, Container };
