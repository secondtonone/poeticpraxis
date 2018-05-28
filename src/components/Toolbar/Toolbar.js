import { h, Component } from 'preact';
import styled from 'styled-components';

import theme from '../../styles/theme';
import { up } from '../../styles/animations';

const StyledToolbar = styled.div`
    position: fixed;
    bottom: 88px;
    padding: 16px;
    width: 100%;
    background: ${(props) => props.theme.primaryColor};
    text-align: left;
    box-shadow: 2px 1px 20px 0px rgba(0, 0, 0, 0.1);
    z-index: 99;

    & button {
        margin: 0 16px;
    }

    display: ${(props) => (props.isHidden ? 'none' : 'block')};
`;

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    render({ children, isHidden, color }) {
        return (
            <StyledToolbar isHidden={isHidden} color={color}>
                {children}
            </StyledToolbar>
        );
    }
}
