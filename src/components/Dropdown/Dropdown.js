import React, { Component } from 'react';

import { DropdownList, Container, Flex } from '../../styles/components';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: this.props.isOpen || false
        };

        this.dropdown = null;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.dropdown && !this.dropdown.contains(event.target)) {
            this.manualToggleDropdown(false);
        }
    };

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

    render() {
        return (
            <Container>
                <Flex
                    onClick={(e) => {
                        e.preventDefault();
                        this.toggleDropdown();
                    }}>
                    {this.props.title}
                </Flex>

                {this.state.isOpen && (
                    <DropdownList
                        side={this.props.side || 'right'}
                        top={this.props.top || '32px'}
                        tabIndex="0"
                        onBlur={() => {
                            this.manualToggleDropdown(false);
                        }}
                        ref={(el) => (this.dropdown = el)}>
                        {this.props.options.map(({ title, value }, index) => {
                            return (
                                <DropdownList.ListItem
                                    active={value === this.props.value}
                                    key={index}
                                    onClick={() => this.props.onChange(value)}>
                                    {title}
                                </DropdownList.ListItem>
                            );
                        })}
                    </DropdownList>
                )}
            </Container>
        );
    }
}
