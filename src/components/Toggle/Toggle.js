import { h, Component } from 'preact';
import styled from 'styled-components';

import theme from '../../styles/theme';

import { randomize } from '../../utils';

const Label = styled.label`
    color: ${(props) => props.theme.secondColor};
    font-family: ${theme.mainFont};
    position: relative;
    display: inline-block;
    cursor: pointer;
    font-weight: 300;
    padding: 16px 18px;
    text-align: left;

    &::before,
    &::after {
        content: '';
        position: absolute;
        margin: 0;
        outline: 0;
        top: 50%;
        -ms-transform: translate(0, -50%);
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
    }
    &::before {
        left: 1px;
        width: 34px;
        height: 16px;
        background-color: ${(props) => props.theme.grayColor};
        border-radius: 8px;
    }
    &::after {
        left: 0;
        width: 20px;
        height: 20px;
        background-color: #fafafa;
        border-radius: 50%;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14),
            0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
    }
`;

const Container = styled.div`
    position: relative;
`;

const Input = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;

    &:checked + ${Label}::before {
        background-color: ${(props) => props.theme.accentColor};
        opacity: 0.7;
    }
    &:checked + ${Label}::after {
        background-color: ${(props) => props.theme.accentColor};
        -ms-transform: translate(80%, -50%);
        -webkit-transform: translate(80%, -50%);
        transform: translate(80%, -50%);
    }
`;

class Toggle extends Component {
    render({ onChange, checked, ...props }) {
        const id = `tog${randomize()}`;
        return (
            <Container onClick={onChange}>
                <Input type="checkbox" id={id} checked={checked} {...props} />
                <Label for={id} />
            </Container>
        );
    }
}

export default Toggle;
