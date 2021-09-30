import styled from 'styled-components';

import { withElements } from '@styles/helpers';

export type IconProps = {
    padding?: string
    rules?: string
    _small?: boolean
    _big?: boolean
    _xxxlarge?: boolean
    _middle?: boolean
    _invert?: boolean
    _up?: boolean
    '_rotate-right'?: boolean
    '_rotate-left'?: boolean
}

const Icon = styled.i.attrs<IconProps>((props) => ({
    className: withElements<IconProps>(props),
}))<IconProps>`
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
    padding: ${(props) => (props.padding ? props.padding : 0)};

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

    &._xxxlarge {
        font-size: 90px;

        & svg {
            height: 90px;

            width: 90px;
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

export default Icon;
