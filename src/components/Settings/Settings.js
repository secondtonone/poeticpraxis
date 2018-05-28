import { h, Component } from 'preact';

import Button from '../Button';
import Toggle from '../Toggle';
import SettingsIcon from '../IconSVG/Settings';
import { SettingsContainer } from './styled';
import { DropdownList, InlineContainer } from '../../styles/components';

export default class Settings extends Component {
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

    render({ variant, changeTheme }, state) {
        return (
            <SettingsContainer>
                <Button
                    _rounded
                    _flat
                    _transparent
                    onClick={(e) => {
                        e.preventDefault();
                        this.toggleDropdown();
                    }}
                    >
                    <SettingsIcon _middle />
                </Button>
                {state.isOpen && (
                    <DropdownList side="right" tabIndex="0"
                        onBlur={() => {
                            console.log('toggle');
                            this.manualToggleDropdown(false);
                        }}>
                        <DropdownList.ListItem>
                            <InlineContainer vertical="middle" margin="0 54px 0 0">
                                Ночной режим
                            </InlineContainer>
                            <InlineContainer vertical="middle">
                                <Toggle
                                    checked={variant === 'dark'}
                                    onChange={changeTheme}
                                />
                            </InlineContainer>
                        </DropdownList.ListItem>
                    </DropdownList>
                )}
            </SettingsContainer>
        );
    }
}
