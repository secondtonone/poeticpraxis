import styled from 'styled-components';

import Button from '../../components/Button';
import theme from '../../styles/theme';
import { up } from '../../styles/animations';

export const StyledMatchList = styled.ul`
    font-family: ${theme.mainFont};
    line-height: 28px;
    font-size: 18px;
    letter-spacing: 0px;
    font-weight: 300;
    word-spacing: 9px;
    word-break: break-word;
    width: 100%;

    &__text {
        margin: 0 38px 0 0;
    }

    &__send {
        margin-top: 8px;
        background-color: rgba(162, 162, 162, 0.1);
    }
`;

StyledMatchList.Item = styled.li`
    position: relative;
    padding: 8px 0;
    width: 50%;
    display: inline-block;

    &:nth-child(2n) {
        padding-left: 16px;

        @media (max-width: 880px) {
            padding-left: 0;
        }
    }

    @media (max-width: 880px) {
        width: 100%;
    }
`;

StyledMatchList.PinButton = styled(Button)`
    position: absolute;
    right: 0;
    top: 2px;
    color: ${theme.primaryGray};
    fill: ${theme.primaryGray};

    &:hover {
        color: ${(props) =>
            props.pinned ? props.theme.accentColor : props.theme.secondColor};
        fill: ${(props) =>
            props.pinned ? props.theme.accentColor : props.theme.secondColor};
    }
`;
