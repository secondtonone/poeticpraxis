import { h } from 'preact';
import styled from 'styled-components';

const Wrapper = styled.div`
    position: relative;

    &:before {
        content: ${(props) => props.text};
        white-space: nowrap;
        text-align: center;
        font-size: 10px;
        font-weight: 300;
        font-style: normal;
        line-height: 1;
        display: inline-block;
        padding: 10px;
        position: absolute;
        z-index: 0;
        top: 90%;
        right: -150%;
        pointer-events: none;
        transition: all 0.3s 0.2s;
        color: ${(props) => props.theme.primaryWhite};
        background-color: ${(props) => props.theme.primaryBlack};
        visibility: hidden;
        opacity: 0;
    }

    &:hover:before {
        visibility: visible;
        z-index: 9999;
        opacity: 0.9;
    }
`;


const Tooltip = ({ children, text }) => {
    return (
        <Wrapper text={text}>
            {children}
        </Wrapper>
    );
};

export default Tooltip;
