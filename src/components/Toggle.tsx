import type { FunctionalComponent } from 'preact';
import styled from 'styled-components';

import theme from '@styles/theme';

import randomize from '@utils/randomize';

const  Toggle: FunctionalComponent<React.HTMLAttributes<HTMLInputElement>> = (props) => {
  const id = `tog${randomize()}`;
  return (
    <Container>
      <Input type="checkbox" id={id} {...props} />
      <Label htmlFor={id} />
    </Container>
  );
};

const Label = styled.label`
    color: ${(props) => props.theme.secondColor};
    font-family: ${theme.mainFont};
    position: relative;
    display: inline-block;
    cursor: pointer;
    font-weight: 300;
    padding: 10px 18px;
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
        height: 14px;
        background-color: ${(props) => props.theme.grayColor};
        border-radius: 7px;
    }
    &::after {
        left: 0;
        width: 20px;
        height: 20px;
        background-color: #fafafa;
        border-radius: 50%;
        border: 1px solid ${(props) => props.theme.grayColor};
        box-sizing: border-box;
    }
`;

const Container = styled.div`
    position: relative;
    line-height: 0;
    margin-left: 8px;
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
        border: 1px solid ${(props) => props.theme.primaryColor};
    }
`;

export default Toggle;
