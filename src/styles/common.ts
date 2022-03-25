import theme from './theme';
import { loaded, whited } from './animations';
import { css, FlattenSimpleInterpolation } from 'styled-components';

const common: FlattenSimpleInterpolation = css`
body {
    padding: 0;
    margin: 0;
    left: 0;
    right: 0;
    color: ${theme.primaryBlack};
    font-family: ${theme.mainFont};
    font-weight: 400;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: subpixel-antialiased;
    background: ${theme.primaryWhite};
    height: 100%;

    @media (max-width: 600px) {
        overflow-x: hidden;
    }
}

.fixed {
    overflow-y: hidden;
    position: fixed;
}

*::-moz-selection,
*::selection {
    color: ${theme.primaryWhite};
    background: ${theme.primaryBlack};
}

.first-paint {
    background: ${theme.primaryBlack};
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    font-size: 10em;
    font-family: ${theme.mainFont};
    word-break: break-all;
    font-weight: 500;
    text-align: center;
    padding: 0;
    width: 100%;
    line-height: 0.7;
    letter-spacing: -0.099em;
    text-transform: uppercase;
    color: ${theme.primaryWhite};
    animation-name: ${whited};
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in;
}

.first-paint__second-word {
    color: ${theme.primaryRed};
}

@media (max-width: 600px) {
    .first-paint {
        font-size: 10em;
        word-break: break-all;
        font-weight: 600;
        padding: 0;
        width: 100%;
        line-height: 0.7;
        letter-spacing: -0.07em;
        text-transform: uppercase;
    }
}

.blocks {
    width: 100%;
    position: fixed;
    bottom: -100px;
    font-size: 0;
}
.block {
    width: 25%;
    min-height: 100px;
    display: inline-block;
    background-color: ${theme.primaryWhite};
    transform: scaleY(1);
    animation-name: ${loaded};
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in;
}

.block__first {
    animation-delay: 0.1s;
}
.block__second {
    animation-delay: 0.2s;
}
.block__third {
    animation-delay: 0.5s;
}
.block__fourth {
    animation-delay: 0.3s;
}

input,
textarea {
  &::-webkit-input-placeholder {
      opacity: 1;
      transition: opacity 0.3s ease;
      font-family: ${theme.mainFont};
      font-size: 18px;
      font-weight: 300;
      color: ${theme.primaryGray};
  }

  &:focus::-webkit-input-placeholder {
      opacity: 0;
      transition: opacity 0.3s ease;
  }

  &::-moz-placeholder {
      opacity: 1;
      transition: opacity 0.3s ease;
      font-family: ${theme.mainFont};
      font-size: 18px;
      font-weight: 300;
  }

  &:focus::-moz-placeholder {
      opacity: 0;
      transition: opacity 0.3s ease;
  }

  &:-moz-placeholder {
      opacity: 1;
      transition: opacity 0.3s ease;
      font-family: ${theme.mainFont};
      font-size: 18px;
      font-weight: 300;
  }

  &:focus:-moz-placeholder {
      opacity: 0;
      transition: opacity 0.3s ease;
  }

  &:-ms-input-placeholder {
      opacity: 1;
      transition: opacity 0.3s ease;
      font-family: ${theme.mainFont};
      font-size: 18px;
      font-weight: 300;
  }

  &:focus:-ms-input-placeholder {
      opacity: 0;
      transition: opacity 0.3s ease;
  }
}
`;
export default common;
