import { h } from 'preact';
import { useCallback, useRef } from 'preact/hooks';
import styled from 'styled-components';

import theme from '@styles/theme';

import ArrowDropDown from '@icons/ArrowDropDown';

interface SelectProps {
    size: string,
    weight: number
    className: string
    id: string
    value: string
    label: string
    options: {
        title: string
        disabled: boolean
        value: string
    }[]
    onChange: React.ChangeEventHandler<HTMLSelectElement>
}

function Select(props: SelectProps) {
    const select = useRef<HTMLSelectElement>();

    const onClick = useCallback(() => {
        if (select.current) select.current.focus();
    }, []);

    return (
        <Container
            className={props.className}
            size={props.size}
            weight={props.weight}
            onClick={onClick}>
            {props.label && (
                <Label htmlFor={props.id} className="input-container_label">
                    {props.label}
                </Label>
            )}
            <IconContainer>
                <ArrowDropDown />
            </IconContainer>
            <StyledSelect
                ref={select}
                name={props.id}
                fontSize={props.size}
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

const Label = styled.label`
    color: ${(props) => props.theme.secondColor};
`;

const Container = styled.div<Pick<SelectProps, 'size' | 'weight'>>`
    position: relative;
    padding: 0 28px 0 8px;
    font-family: ${theme.mainFont};
    font-size: ${(props) => props.size || '16px'};
    font-weight: ${(props) => props.weight || 300};
    color: ${(props) => props.theme.secondColor};
    fill: ${(props) => props.theme.secondColor};
    line-height: 24px;
`;

const StyledSelect = styled.select<{fontSize: string, weight: number}>`
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
    font-size: ${(props) => props.fontSize || '16px'};
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

export default Select;
