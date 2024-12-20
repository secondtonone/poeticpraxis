import styled from 'styled-components';

import theme from '@styles/theme';

const StyledSecondaryMenu = styled.div<{ isTranslate: boolean }>`
    position: fixed;
    display: flex;
    top: 88px;
    left: 0;
    width: 100px;
    z-index: 1000;
    justify-content: center;

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
        transition: all 0.2s ease-in;
        ${(props) => (props.isTranslate ? 'transform: translateY(-44px);' : '')}
    }

    @media (min-width: 1100px) {
        width: 200px;
        justify-content: flex-start;
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

    @media (min-width: 1100px) {
        font-size: 14px;
    }
`;

const Item = styled.li<{ disabled: boolean; active: boolean; count: number }>`
    display: block;
    padding: 16px;
    box-sizing: border-box;
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

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

        & > div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            & > div {
                padding-left: 8px;
            }
        }
    }

    @media (min-width: 1100px) {
        & > div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            & > div {
                padding-left: 16px;
            }
        }
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
  LogoContainer,
};
