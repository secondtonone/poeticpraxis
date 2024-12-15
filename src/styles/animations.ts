import { keyframes, type Keyframes } from 'styled-components';
import theme from './theme';

const upAlt: Keyframes = keyframes`
  50% {
    transform: translateY(1000%);
  }
  100% {
    transform: translateY(0);
  }
`;

const downAlt: Keyframes = keyframes`
  50% {
    transform: translateY(-1000%);
  }
  100% {
    transform: translateY(0);
  }
`;

const up: Keyframes = keyframes`
  100% {
    transform: translateY(0);
  }
`;

const show: Keyframes = keyframes`
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
`;

const loaded: Keyframes = keyframes`
  100% {
    transform: scaleY(19);
  }
`;

const whited: Keyframes = keyframes`
  100% {
    background: ${theme.primaryWhite};
    color: ${theme.primaryWhite};
  }
`;

export { upAlt, downAlt, up, show, loaded, whited };
