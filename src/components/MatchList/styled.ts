import styled from 'styled-components';

import Button from '@components/Button';
import theme from '@styles/theme';

const StyledMatchList = styled.ul`
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

const Item = styled.li<{compact?: boolean}>`
    position: relative;
    padding: 8px 8px 8px 54px;
    width: ${({compact}) => (compact ? '50%' : '100%')};
    display: inline-block;
    vertical-align: top;

    @media (max-width: 880px) {
        width: 100%;
    }
`;

const PinButton = styled(Button)<{pinned: boolean}>`
    position: absolute;
    left: 0;
    top: 6px;
    color: ${theme.primaryGray};
    fill: ${theme.primaryGray};

    &:hover {
        color: ${(props) =>
            props.pinned ? props.theme.accentColor : props.theme.secondColor};
        fill: ${(props) =>
            props.pinned ? props.theme.accentColor : props.theme.secondColor};
    }
`;

export {
    PinButton,
    StyledMatchList,
    Item
};
