import styled from 'styled-components';

import { AnimationUp } from '@styles/components';
import Button from '@components/Button';
import Select from '@components/Select';

const MainSelect = styled(Select)`
    position: fixed;
    bottom: 48px;
    right: 128px;
    z-index: 100;
    background-color: ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.secondColor};
    box-shadow: 5px 4px 25px 3px rgba(0, 0, 0, 0.1);

    @media (max-width: 600px) {
        bottom: 122px;
        right: 96px;
    }

    @media (max-width: 600px) and (max-height: 400px) {
        bottom: 48px;
    }

    @media (max-width: 350px) {
        left: 0;
        right: auto;
    }

    ${AnimationUp};
`;

const FieldClearButton = styled(Button)`
    @media (max-width: 600px) {
        position: fixed;
        top: auto;
        left: auto;
        right: 44px;
        bottom: 174px;
        margin: auto;
        display: none;
    }

    @media (max-width: 550px) and (max-height: 400px) {
        position: fixed;
        top: auto;
        left: auto;
        right: 44px;
        bottom: 118px;
        margin: auto;
    }
`;

const ButtonContainer = styled.div`
    margin: 16px 0 0;
    display: flex;
    justify-content: flex-start;

    @media (max-width: 600px) {
        justify-content: space-between;
    }
    @media (max-width: 420px) {
        flex-direction: column;
        align-items: center;
    }
`;

const MainButton = styled(Button)`
    transform: translateY(0);
    transition: transform 0.5s ease-in;

    @media (max-height: ${(props) => props.minHeight}) {
        transform: translateY(120%);
        display: none;
    }
`;

const ContainerOnKeyboard = styled.div`
    transform: translateY(0);
    transition: transform 0.5s ease-in;

    @media (max-height: ${(props) => props.minHeight}) {
        transform: translateY(120%);
        display: none;
    }
`;

export {
    MainSelect,
    FieldClearButton,
    ButtonContainer,
    MainButton,
    ContainerOnKeyboard
};
