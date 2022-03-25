import styled from 'styled-components';

import Button from '@components/Button';
import theme from '@styles/theme';

export const Input = styled.input`
    font-family: ${theme.mainFont};
    color: ${(props) => props.theme.secondColor};
    line-height: 28px;
    font-size: 18px;
    letter-spacing: 0px;
    font-weight: 300;
    word-spacing: 9px;
    word-break: break-word;
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    background: transparent;

    &:focus {
        outline: none;
    }
`;

export const InputButton = styled(Button)<{pinned?:boolean}>`
    color: ${(props) => props.theme.secondColor};
    margin-left: 16px;
    
    &:hover {
        color: ${(props) =>
    props.pinned ? props.theme.accentColor : props.theme.secondColor};
        fill: ${(props) =>
    props.pinned ? props.theme.accentColor : props.theme.secondColor};
    }
`;
