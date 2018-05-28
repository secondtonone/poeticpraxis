import { h, Component } from 'preact';
import styled, { css } from 'styled-components';

import theme from '../../styles/theme';
import { DropdownList } from '../../styles/components';
import { hexToRgb } from '../../utils';

import ArrowDropDown from '../IconSVG/ArrowDropDown';
import Button from '../Button';

const Label = styled.label`
    color: ${(props) => props.theme.secondColor};
`;

const Container = styled.div`
    position: relative;
    padding: 4px 8px;
    font-family: ${theme.mainFont};
    font-size: ${(props) => props.size || '16px'};
    font-weight: ${(props) => props.weight || 300};
    color: ${(props) => props.theme.secondColor};
    fill: ${(props) => props.theme.secondColor};
    line-height: 24px;
    cursor: pointer;
    outline: none;
`;

const StyledSelect = styled.div`
    position: relative;
    background-color: transparent;
    margin-left: 8px;
    font-family: ${theme.mainFont};
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
    color: ${(props) => props.theme.secondColor};
    min-width: 24px;
    cursor: pointer;
`;

const IconContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`;

class Options extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    manualToggleDropdown = (isOpen) => {
        this.setState({
            isOpen
        });
    };

    toggleDropdown = () => {
        let isOpen = this.state.isOpen ? false : true;
        this.setState({
            isOpen
        });
    };

    render(props, state) {
        return (
            <Container
                className={props.className}
                size={props.size}
                weight={props.weight}
                onClick={(e) => {
                    e.preventDefault();
                    this.toggleDropdown();
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
                    tabIndex="0"
                    onBlur={() => {
                        this.manualToggleDropdown(false);
                    }}>
                    {
                        props.options.filter((option) => {
                            return option.value === props.value;
                        })[0].title
                    }
                </StyledSelect>
                {state.isOpen && (
                    <DropdownList>
                        {props.options.map((option) => {
                            if (!option.disabled) {
                                return (
                                    <DropdownList.ListItem
                                        active={option.value === props.value}
                                        onMouseDown={(e) => {
                                            props.onChange(option.value);
                                            e.preventDefault();
                                        }}>
                                        {option.title}
                                    </DropdownList.ListItem>
                                );
                            }
                        })}
                    </DropdownList>
                )}
            </Container>
        );
    }
}

export default Options;
