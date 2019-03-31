import styled from 'styled-components';

import { AnimationShow, AnimationUp } from '../../styles/components';

import Button from '../../components/Button';

const ChangeModeButton = styled(Button)`
    display: none;

    @media (max-width: 880px) {
        display: block;
    }
`;

const StringPauseButton = styled(Button)`
    position: absolute;
    left: -20px;
    top: 0;
    transform: translateY(0);
    transition: transform 0.2s ease-out;

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
    z-index: 100;
    width: 64px;
    height: 64px;

    @media (min-width: 320px) and (max-width: 1024px) and (orientation: portrait) {
        bottom: 128px;
    }

    ${AnimationUp};
`;

const CopyButton = styled(Button)`
    @media (min-width: 320px) and (max-width: 1024px) and (orientation: portrait) {
        display: none;
    }
    ${AnimationUp};
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

const ToolbarButton = styled(Button)``;

export {
    ChangeModeButton,
    StringPauseButton,
    StringPauseButtonMobile,
    CopyButton,
    CopyButtonMobile,
    ToolbarButton,
    ButtonContainer
};
