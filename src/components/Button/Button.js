import { h, Component } from 'preact';
import styled from 'styled-components';

import theme from '../../styles/theme';
import { AnimationUp } from '../../styles/components';
import { withElements } from '../../styles/helpers';
import { hexToRgb } from '../../utils';

const StyledButton = styled.button.attrs({ className: withElements })`
    &._rounded {
        background-color: /* ${(props) =>
            props.theme.primaryColor} */ transparent;
        /* box-shadow: 2px 1px 20px 0px rgba(0, 0, 0, 0.1); */
        color: ${(props) => props.theme.secondColor};
        fill: ${(props) => props.theme.secondColor};
        height: 40px;
        width: 40px;
        border: 0;
        border-radius: 50%;
        cursor: pointer;

        &:disabled {
            color: ${(props) => props.theme.grayColor};
            fill: ${(props) => props.theme.grayColor};
            background-color: /* ${(props) =>
                props.theme.primaryColor} */ transparent;
            cursor: default;
            box-shadow: 2px 1px 10px 0px rgba(0, 0, 0, 0.1);
        }
    }

    &._small {
        height: 28px;
        width: 28px;
    }

    &._middle {
        height: 38px;
        width: 38px;
    }

    &._big {
        width: 64px;
        height: 64px;
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
        display: inline-block;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
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

    &._main {
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 64px;
        height: 64px;
        color: ${theme.primaryWhite};
        fill: ${theme.primaryWhite};
        background-color: ${(props) => props.theme.accentColor};
        z-index: 100;

        @media (max-width: 600px) {
            bottom: 108px;
            right: 16px;
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
        background-color: ${theme.primaryBlack};
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
        background-color: rgba(162, 162, 162, 0.1);
    }

    &._long {
        width: 100%;
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
    &._animated-up {
        ${AnimationUp};
    }
`;

function Button(props) {
    return <StyledButton {...props} />;
}

export default Button;
