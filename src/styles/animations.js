import { keyframes } from 'styled-components';
import theme from './theme';

const upAlt = keyframes`
    50% {
        transform: translateY(1000%);
    }
    100% {
        transform: translateY(0);
    }
`;

const up = keyframes`
    100% {
        transform: translateY(0);
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

const loaded = keyframes`
    100% {
        transform: scaleY(19);
    }
`;

const whited = keyframes`
    100% {
        background: ${theme.primaryWhite};
        color: ${theme.primaryWhite};
    }
`;

export {
    upAlt,
    up,
    show,
    loaded,
    whited
};
