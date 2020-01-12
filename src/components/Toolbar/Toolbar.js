import { h, Component } from 'preact';
import styled from 'styled-components';

const StyledToolbar = styled.div`
    position: fixed;
    bottom: 0;
    padding: 16px;
    width: 100%;
    text-align: left;
    box-shadow: 2px 1px 20px 0px rgba(0, 0, 0, 0.1);
    z-index: 1002;
    background-color: ${(props) =>
        props.theme.name === 'dark'
            ? props.theme.grayDarkColor
            : props.theme.primaryColor};
    display: ${(props) => (props.isHidden ? 'none' : 'block')};
`;

const ButtonContainer = styled.div`
    & button {
        margin-right: 16px;
    }
`;

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, isHidden, closeButton, color } = this.props;
        return (
            <StyledToolbar isHidden={isHidden} color={color}>
                {closeButton}
                <ButtonContainer>{children}</ButtonContainer>
            </StyledToolbar>
        );
    }
}
