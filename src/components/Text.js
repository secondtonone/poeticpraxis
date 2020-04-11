import styled from 'styled-components';

import theme from '@styles/theme';

const Text = styled.p`
    margin: 0;
    padding: 0;
    font-family: ${theme.mainFont};
    line-height: ${(props) => (props.lineHeight ? props.lineHeight : '1.7')};
    font-size: ${(props) => (props.size ? `${props.size}px` : '18px')};
    letter-spacing: ${(props) =>
        props.spacing ? `${props.spacing}px` : '0px'};
    font-weight: ${(props) => (props.weight ? props.weight : '300')};
    word-spacing: 6px;
    margin-bottom: ${(props) => (props.mb ? `${props.mb}px` : '18px')};
    text-align: ${(props) => (props.align ? props.align : 'left')};
    ${(props) => (props.isHidden ? 'display: none;' : '')};
`;

export default Text;
