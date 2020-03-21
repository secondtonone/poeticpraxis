import { h, Component } from 'preact';

import Button from '@components/Button';
import LangChanger from '@containers/LangChanger';
import ThemeTumbler from '@containers/ThemeTumbler';
import SettingsIcon from '@icons/Settings';
import { DropdownList, Container } from '@styles/components';

export default class Settings extends Component {
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
                            <ThemeTumbler
                                onChange={() => {
                                    this.dropdown.focus();
                                }}
                            />
                        </DropdownList.ListItem>
                        <DropdownList.ListItem>
                            <LangChanger />
                        </DropdownList.ListItem>
                    </DropdownList>
                )}
            </Container>
        );
    }
}
