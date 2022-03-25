import styled from 'styled-components';

import AccentColors from '@typings/AccentColors';
import theme from '@styles/theme';

import { AnimationShow, AnimationUp, AnimationDown } from '@styles/components';

import Flex from '@components/Flex';
import Button from '@components/Button';

const ChangeModeButton = styled(Button)`
    display: none;

    @media (max-width: 880px) {
        display: block;
    }
`;

const FlexSided = styled(Flex)`
    @media (max-width: 600px) {
        padding-right: 16px;
    }
`;

const StringPauseButton = styled.div`
    position: absolute;
    left: 13px;
    top: 66px;
    will-change: transform;
    transform: translateY(0);
    transition: transform 0.5s 0.2s ease-out;

    @media (max-width: 880px) {
        display: none;
    }

    ${AnimationShow};
`;

const StringPauseButtonMobile = styled(Button)`
    position: fixed;
    bottom: 32px;
    right: 32px;
    left: auto;
    top: auto;
    z-index: 1002;
    width: 64px;
    height: 64px;

    @media (min-width: 320px) and (max-width: 1024px) and (orientation: portrait) {
        bottom: 32px;
    }

    ${AnimationUp};
`;

const UpperButton = styled(Button)`
    @media (min-width: 320px) and (max-width: 1024px) and (orientation: portrait) {
        display: none;
    }
    ${AnimationDown};
`;

const ButtonContainer = styled.div`
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    width: 100px;
    justify-content: space-between;
`;

const CopyButtonMobile = styled(Button)``;

const accentMixin = (color: string, accent: AccentColors) => `
    position: relative;

    &::after {
        position: relative;
        right: 0;
        margin: 0 auto;
        width: 100%;
        font-size: 19px;
        height: 0;
        text-align: center;
        color: ${color};

        ${accent == 'black' || accent == 'gray'
    ? `content: '\\25CF';
                top: 0;`
    : `content: '\\25BC';
                transform: rotate(0deg) scale(1.7);
                top: 0;`}
    }

    &:hover::before {
        content: '';
        position: relative;
        left: 0;
        right: 0;
        top: 0;
        margin: 0 auto;
        width: 100%;
        height: 1px;
        border-bottom: 1px solid ${color};
    }
`;

const AccentRelative = styled.span<{ accent: AccentColors }>`
    ${({ accent, theme: { accentColor, secondColor, grayColor }}) => {
    if (accent === 'black') return accentMixin(secondColor, accent);
    if (accent === 'gray') return accentMixin(grayColor, accent);

    return accentMixin(
      accent === 'red'
        ? accentColor
        : theme.secondRed,
      accent
    );
  }}
`;

export {
  ChangeModeButton,
  StringPauseButton,
  StringPauseButtonMobile,
  UpperButton,
  CopyButtonMobile,
  ButtonContainer,
  AccentRelative,
  FlexSided
};
