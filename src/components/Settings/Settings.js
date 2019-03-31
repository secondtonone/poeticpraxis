import React, { Component } from 'react';

import Button from '../Button';
import Toggle from '../Toggle';
import Select from '../Select';
import SettingsIcon from '../IconSVG/Settings';
import { SettingsContainer } from './styled';
import { DropdownList, InlineContainer } from '../../styles/components';

import { translations } from './translations';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
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
        const langOptions = [
            { title: 'Русский', value: 'ru' },
            { title: 'English', value: 'en' }
        ];

        const { variant, changeTheme, lang = 'ru', changeLang } = this.props;

        return (
            <SettingsContainer>
                <Button
                    _rounded
                    _flat
                    _transparent
                    onClick={(e) => {
                        e.preventDefault();
                        this.toggleDropdown();
                    }}>
                    <SettingsIcon _middle />
                </Button>
                {this.state.isOpen && (
                    <DropdownList
                        side="right"
                        top="32px"
                        tabIndex="0"
                        onBlur={() => {
                            this.manualToggleDropdown(false);
                        }}
                        ref={(el) => (this.dropdown = el)}>
                        <DropdownList.ListItem>
                            <InlineContainer vertical="middle">
                                {translations[lang].settings['NIGHT_MODE']}
                            </InlineContainer>
                            <InlineContainer vertical="middle">
                                <Toggle
                                    checked={variant === 'dark'}
                                    onChange={() => {
                                        changeTheme();
                                        this.dropdown.focus();
                                    }}
                                />
                            </InlineContainer>
                        </DropdownList.ListItem>
                        <DropdownList.ListItem>
                            <InlineContainer vertical="middle">
                                {translations[lang].settings['LANG']}
                            </InlineContainer>
                            <InlineContainer vertical="middle">
                                <Select
                                    weight="400"
                                    id="lang"
                                    value={lang}
                                    options={langOptions}
                                    onChange={(e) => {
                                        changeLang(e.target.value);
                                        document.documentElement.lang = e.target.value;
                                    }}
                                />
                            </InlineContainer>
                        </DropdownList.ListItem>
                    </DropdownList>
                )}
            </SettingsContainer>
        );
    }
}
