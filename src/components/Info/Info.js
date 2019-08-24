import React, { Component } from 'react';
import styled from 'styled-components';

const StyledBox = styled.div`
    padding: 8px 26px;
    text-align: left;
    color: ${(props) => props.theme.secondColor};
    background-color: ${(props) => props.theme.lightGray};
    font-size: 14px;
    margin: 0 auto 32px;
    font-weight: 300;
    line-height: 48px;
    max-width: 730px;

    @media (max-width: 600px) {
        margin: 32px 0;
        line-height: 1.6;
    }
`;

export default class Info extends Component {
    render() {
        return <StyledBox>{this.props.children}</StyledBox>;
    }
}
