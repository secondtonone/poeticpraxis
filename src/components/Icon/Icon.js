import { h, Component } from 'preact';
import styled from 'styled-components';

import { withElements } from '../../styles/helpers';

const StyledIcon = styled.i.attrs({ className: withElements })`
    font-weight: normal;
    font-style: normal;
    font-size: 24px; /* Preferred icon size */
    vertical-align: inherit;
    line-height: 0.9;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    transform-origin: center;
    display: inline-block;
    pointer-events: none;

    & svg {
        height: 24px;
        width: 24px;
    }

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';

    &._small {
        font-size: 18px;

        & svg {
            height: 18px;

            width: 18px;
        }
    }

    &._big {
        font-size: 32px;

        & svg {
            height: 32px;

            width: 32px;
        }
    }

    &._middle {
        font-size: 24px;

        & svg {
            height: 24px;

            width: 24px;
        }
    }

    &._invert {
        transform: rotate(-90deg);
    }

    &._up {
        transform: rotate(45deg);
    }

    &._rotate-right {
        transform: rotate(90deg);
    }

    &._rotate-left {
        transform: rotate(180deg);
    }

    ${(props) => props.rules};
`;

class Icon extends Component {
    render(props) {
        return <StyledIcon {...props} />;
    }
}

export default Icon;
