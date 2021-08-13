import styled from 'styled-components';
import theme from '@styles/theme';

const FieldEditableArea = styled.textarea<React.HTMLAttributes<HTMLTextAreaElement> & { zoomIn?: boolean }>`
    position: relative;
    font-family: ${theme.mainFont};
    height: auto;
    width: 100%;
    margin: 0;
    color: ${(props) => props.theme.secondColor};
    letter-spacing: 0;
    word-spacing: 0;
    font-size: 18px;
    font-weight: 300;
    line-height: 52px;
    display: block;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: transparent;
    word-break: break-word;
    box-sizing: border-box;
    border: 0;
    resize: none;
    cursor: text;
    will-change: height;

    &:focus {
        outline: none;
    }

    ${(props) => {
        if (props.zoomIn) {
            return `font-size: 28px;`;
        }
    }};
`;

export default FieldEditableArea;
