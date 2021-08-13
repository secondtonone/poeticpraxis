import styled from 'styled-components';

import theme from '@styles/theme';
import { AnimationUp } from '@styles/components';
import { withElements } from '@styles/helpers';

interface ButtonProps {
    width?: string
    borderWidth?: string
    size?: number
    margin?: string
    padding?: string
    _rounded?: boolean
    _small?: boolean
    _middle?: boolean
    _big?: boolean
    _fit?: boolean
    _flat?: boolean
    _main?: boolean
    '_action--outlined'?: boolean
    _action?: boolean
    _transparent?: boolean
    _common?: boolean
    _centred?: boolean
    _oval?: boolean
    _white?: boolean
    _black?: boolean
    _gray?: boolean
    _accent?: boolean
    '_light-gray'?: boolean
    _long?: boolean
    _second?: boolean
    _third?: boolean
    '_top-centred'?: boolean
    '_white-icon'?: boolean
    '_black-icon'?: boolean
    '_animated-up'?: boolean
}

const StyledButton = styled.button.attrs<ButtonProps>((props) => ({
    className: withElements(props)
}))<ButtonProps>`
    &._rounded {
        background-color: /* ${(props) =>
            props.theme.primaryColor} */ transparent;
        /* box-shadow: 2px 1px 20px 0px rgba(0, 0, 0, 0.1); */
        color: ${(props) => props.theme.secondColor};
        fill: ${(props) => props.theme.secondColor};
        height: 40px;
        width: ${(props) => (props.width ? props.width : '40px')};
        border: 0;
        border-radius: 50%;
        cursor: pointer;

        &:disabled {
            color: ${(props) => props.theme.grayColor};
            fill: ${(props) => props.theme.grayColor};
            background-color: transparent;
            cursor: default;
        }
    }

    &._small {
        height: 24px;
        width: 24px;
    }

    &._middle {
        height: 38px;
        width: 38px;
    }

    &._big {
        width: 64px;
        height: 64px;
    }

    &._fit {
        height: auto;
        width: auto;
    }

    &._flat {
        font-family: ${theme.mainFont};
        text-decoration: none;
        color: ${theme.primaryWhite};
        fill: ${theme.primaryWhite};
        background-color: ${theme.primaryRed};
        box-shadow: 5px 4px 25px 3px rgba(0, 0, 0, 0.1);
        text-align: center;
        cursor: pointer;
        border: none;
        font-weight: 500;
        border-radius: 2px;
        display: flex;
        align-items: center;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        text-transform: uppercase;
    }

    &._main {
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 64px;
        height: 64px;
        color: ${theme.primaryWhite};
        fill: ${theme.primaryWhite};
        background-color: ${(props) => props.theme.accentColor};
        z-index: 1009;

        &:disabled {
            color: ${(props) => props.theme.grayColor};
            fill: ${(props) => props.theme.grayColor};
            background-color: transparent;
            cursor: default;
            box-shadow: 2px 1px 10px 0px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 600px) {
            bottom: 36px;
            right: 16px;
        }
    }

    &._action--outlined {
        font-family: ${theme.mainFont};
        text-decoration: none;
        color: ${(props) => props.theme.accentColor};
        fill: ${(props) => props.theme.accentColor};
        background-color: transparent;
        text-align: center;
        cursor: pointer;
        font-weight: 400;
        border: ${(props) =>
            props.borderWidth ? props.borderWidth : '1'}px solid ${(props) =>
    props.theme.accentColor};
        width: ${(props) => (props.width ? props.width : 'auto')};
        display: inline-block;
        font-size: ${(props) => (props.size ? `${props.size}px` : '24px')};
        padding: ${(props) => (props.size ? `${props.size}px` : '24px')};
        text-transform: uppercase;
        vertical-align: sub;
    }

    &._action {
        font-family: ${theme.mainFont};
        text-decoration: none;
        color: ${theme.primaryWhite};
        fill: ${theme.primaryWhite};
        background-color: ${(props) => props.theme.accentColor};
        box-shadow: 5px 4px 25px 3px rgba(0, 0, 0, 0.1);
        text-align: center;
        cursor: pointer;
        border: none;
        font-weight: 400;
        border-radius: ${(props) =>
            props.size ? `${props.size * 2}px` : '32px'};
        width: ${(props) => (props.width ? props.width : 'auto')};
        height: auto;
        display: inline-block;
        font-size: ${(props) => (props.size ? `${props.size}px` : '24px')};
        padding: ${(props) => (props.size ? `${props.size}px` : '24px')};
        text-transform: uppercase;
        vertical-align: sub;
    }

    &._transparent {
        background-color: transparent;
        box-shadow: none;
        border-radius: 0;
        color: ${(props) => props.theme.secondColor};
        fill: ${(props) => props.theme.secondColor};
        &:disabled {
            color: ${theme.primaryGray};
            fill: ${theme.primaryGray};
            background-color: transparent;
            cursor: default;
            box-shadow: none;
        }
    }

    &._common {
        background-color: ${theme.primaryWhite};
        color: ${theme.primaryBlack};
        fill: ${theme.primaryBlack};
    }

    

    &._centred {

        @media (max-width: 600px) {
            bottom: 24px;
            right: 0;
            left: 0;
            margin: 0 auto;
            z-index: 1010;
        }
    }

    &._oval {
        width: auto;
        text-transform: uppercase;
        border-radius: 32px;
        padding: 8px 16px;
    }

    &._white {
        color: ${theme.primaryBlack};
        fill: ${theme.primaryBlack};
        background-color: ${theme.primaryWhite};
    }

    &._black {
        color: ${theme.primaryWhite};
        fill: ${theme.primaryWhite};
        
        ${(props) =>
            props.theme.name === 'dark'
                ? `background: ${props.theme.grayDarkColor};`
                : `background-color: ${theme.primaryBlack};`} 
    }

    &._gray {
        color: rgb(214, 214, 214);
        fill: rgb(214, 214, 214);
        background-color: ${(props) => props.theme.primaryColor};
    }

    &._accent {
        color: ${(props) => props.theme.accentColor};
        fill: ${(props) => props.theme.accentColor};
        background-color: ${(props) => props.theme.primaryColor};
    }

    &._light-gray {
        color: ${(props) => props.theme.secondColor};
        fill: ${(props) => props.theme.secondColor};
        background-color: ${(props) => props.theme.lightGray};
    }

    &._long {
        width: 100%;
        text-align: center;
    }

    &._second {
        bottom: 128px;

        @media (max-width: 600px) {
            bottom: 218px;
            right: 32px;
        }
    }

    &._third {
        bottom: 224px;

        @media (max-width: 600px) {
            bottom: 314px;
        }
    }

    &._top-centred {
        position: absolute;
        top: -20px;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    &._white-icon {
        color: ${theme.primaryWhite};
        fill: ${theme.primaryWhite};
    }
    &._black-icon {
        color: ${theme.secondWhite};
        fill: ${theme.secondWhite};
    }
    &._animated-up {
        ${AnimationUp};
    }

    margin: ${(props) => (props.margin ? props.margin : 0)};
    ${(props) => (props.padding ? `padding: ${props.padding};` : '')};
    ${(props) => (props.size ? `font-size: ${props.size}px;` : '')};
`;

export default StyledButton;
