import { keyframes } from 'styled-components';
import theme from './theme';

const blured = keyframes`
    50% {
        -webkit-filter: blur(1px);
        filter: blur(1px);
    }
    100% {
        -webkit-filter: blur(3px);
        filter: blur(6px);
        opacity: 0.9;
    }
`;

const down = keyframes`
    50% {
        transform: translateY(-100%);
    }
    100% {
        background-color: rgb(250, 250, 250);
        box-shadow: 5px 4px 20px 3px rgba(0, 0, 0, 0.2);
        transform: translateY(0);
    }
`;

const upAlt = keyframes`
    50% {
        transform: translateY(1000%);
    }
    100% {
        transform: translateY(0);
    }
`;

const slide = keyframes`
    100% {
        transform: translateX(0);
    }
`;

const up = keyframes`
    100% {
        transform: translateY(0);
    }
`;

const scale = keyframes`
    100% {
        transform: scaleY(1);
    }
`;

const upNav = keyframes`
    50% {
        transform: translateY(100%);
    }
    100% {
        background-color: rgb(250, 250, 250);
        box-shadow: 5px 4px 20px 3px rgba(0, 0, 0, 0.2);
        transform: translateY(0);
    }
`;

const downLogo = keyframes`
    50% {
        transform: translateY(-100%) rotate(688deg);
    }
    100% {
        background-color: rgb(250, 250, 250);
        box-shadow: 5px 4px 20px 3px rgba(0, 0, 0, 0.2);
        transform: translateY(0) rotate(690deg);
    }
`;

const show = keyframes`
    50% {
        opacity: 0.2;
    }
    100% {
        opacity: 1;
    }
`;

const hide = keyframes`
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 0;
        display: none;
    }
`;

const halfed = keyframes`
    100% {
        width: 397px;
        padding: 32px;
    }
`;

const loaded = keyframes`
    100% {
        transform: scaleY(19);
    }
`;

const whited = keyframes`
    100% {
        background: ${theme.primaryWhite};
        color: : ${theme.primaryWhite};
    }
`;

export {
    blured,
    down,
    downLogo,
    upAlt,
    up,
    upNav,
    slide,
    scale,
    show,
    hide,
    halfed,
    loaded,
    whited
};
