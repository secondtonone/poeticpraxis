import React, { Component } from 'react';
import styled from 'styled-components';

const StyledToolbar = styled.div`
    position: fixed;
    bottom: 0;
    padding: 16px;
    width: 100%;
    text-align: left;
    box-shadow: 2px 1px 20px 0px rgba(0, 0, 0, 0.1);
    z-index: 1002;
    background-color:${(props) =>
            props.theme.name === 'dark'
                ? props.theme.grayDarkColor
                : props.theme.primaryColor};
    & button {
        margin: 0 16px;
    }

    display: ${(props) => (props.isHidden ? 'none' : 'block')};
`;

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, isHidden, color } = this.props;
        return (
            <StyledToolbar isHidden={isHidden} color={color}>
                {children}
            </StyledToolbar>
        );
    }
}
