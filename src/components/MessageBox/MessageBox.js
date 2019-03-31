import React, { Component } from 'react';
import styled from 'styled-components';

const StyledMessageBox = styled.div`
    outline: none;
    position: fixed;
    box-sizing: border-box;
    left: 0;
    bottom: 0;
    z-index: 1001;
    padding: 8px 24px;
    text-align: center;
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.secondColor};
    min-height: 48px;
    min-width: 288px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    border-radius: 2px;
    margin: 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 48px;
    cursor: default;
    transform: translateY(${(props) => (props.text ? 0 : '100px')});
    transition: transform 0.2s, opacity 0.2s;
    opacity: ${(props) => (props.text ? 1 : 0)};
    -webkit-font-smoothing: antialiased;
    ${(props) =>
        props.theme.name === 'dark'
        ? `background: ${props.theme.grayDarkColor}; color: ${props.theme.secondColor};`
            : ''}  
    @media (max-width: 600px) {
        bottom: 0;
        transform: translateY(
            ${(props) => (props.text ? `-${props.bottom}px` || 0 : '100px')}
        );
        left: 5px;
        right: 5px;
        margin: 0 auto;
    }
`;

export default class MessageBox extends Component {
    render() {
        const { text, bottom } = this.props;
        return (
            <StyledMessageBox bottom={bottom} text={text}>
                {text}
            </StyledMessageBox>
        );
    }
}
