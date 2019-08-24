import React, { Component } from 'react';
import styled from 'styled-components';

import theme from '../../styles/theme';

import ArrowDropDown from '../IconSVG/ArrowDropDown';

const Label = styled.label`
    color: ${(props) => props.theme.secondColor};
`;

const Container = styled.div`
    position: relative;
    padding: 0 28px 0 8px;
    font-family: ${theme.mainFont};
    font-size: ${(props) => props.size || '16px'};
    font-weight: ${(props) => props.weight || 300};
    color: ${(props) => props.theme.secondColor};
    fill: ${(props) => props.theme.secondColor};
    line-height: 24px;
`;

const StyledSelect = styled.select`
    border: none;
    position: relative;
    box-shadow: none;
    background-color: transparent;
    background-image: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: ${(props) => props.theme.secondColor};
    font-family: ${theme.mainFont};
    font-size: ${(props) => props.size || '16px'};
    font-weight: ${(props) => props.weight || 300};
    line-height: 1;
    min-width: 24px;
    width: 100%;
    outline: none;
    z-index: 2;
    cursor: pointer;
`;

const IconContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;

function Select(props) {
    let select = {};

    return (
        <Container
            className={props.className}
            size={props.size}
            weight={props.weight}
            onClick={() => {
                select.focus();
            }}>
            {props.label && (
                <Label for={props.id} class="input-container_label">
                    {props.label}
                </Label>
            )}
            <IconContainer>
                <ArrowDropDown />
            </IconContainer>
            <StyledSelect
                ref={(ref) => (select = ref)}
                name={props.id}
                size={props.size}
                weight={props.weight}
                id={props.id}
                value={props.value}
                onChange={props.onChange}>
                {props.options.map((option, index) => {
                    if (!option.disabled) {
                        return (
                            <option key={`sopt-${index}`} value={option.value}>{option.title}</option>
                        );
                    }
                })}
            </StyledSelect>
        </Container>
    );
}

export default Select;
