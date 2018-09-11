import { h, Component } from 'preact';

import Button from '../Button';
import Toggle from '../Toggle';
import Select from '../Select';
import SettingsIcon from '../IconSVG/Settings';
import { SettingsContainer } from './styled';
import { DropdownList, InlineContainer } from '../../styles/components';

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

        const hours = new Date().getHours();
        const isDayTime = hours > 7 && hours < 21;

        if (isDayTime) {
            this.props.changeTheme('light');
        } else {
            this.props.changeTheme('dark');
        }
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

    render({ variant, changeTheme, lang, changeLang }, state) {
        const langOptions = [
            { title: 'Русский', value: 'ru' },
            { title: 'English', value: 'eng' }
        ];

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
                {state.isOpen && (
                    <DropdownList
                        side="right"
                        top="32px"
                        tabIndex="0"
                        onBlur={() => {
                            this.manualToggleDropdown(false);
                        }}
                        innerRef={(el) => (this.dropdown = el)}>
                        <DropdownList.ListItem>
                            <InlineContainer
                                vertical="middle"
                                margin="0 54px 0 0">
                                Ночной режим
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
                            <InlineContainer
                                vertical="middle"
                                margin="0 54px 0 0">
                                Язык
                            </InlineContainer>
                            <InlineContainer vertical="middle">
                                <Select
                                    weight="400"
                                    id="lang"
                                    value={lang}
                                    options={langOptions}
                                    onChange={(e) => {
                                        changeLang(e.target.value);
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
