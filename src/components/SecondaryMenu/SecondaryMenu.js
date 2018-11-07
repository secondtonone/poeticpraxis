import { h, Component } from 'preact';

import {
    Menu,
    Item,
    StateSelect,
    StyledSecondaryMenu,
    Container,
    LogoImage
} from './styled';

import Options from '../Options';

import Logo from '../../../public/img/Logo.svg';
import LogoWhite from '../../../public/img/Logo-white.svg';

export default function SecondaryMenu({
    children,
    items,
    handler,
    current,
    variant = 'light'
}) {
    return (
        <StyledSecondaryMenu>
            {items ? (
                <div>
                    <StateSelect>
                        <Options
                            value={current}
                            onChange={(value) => handler(value)}
                            options={items}
                        />
                    </StateSelect>
                    <Menu>
                        {items.map((item) => {
                            return (
                                <Item
                                    onClick={() => {
                                        if (item.disabled) {
                                            return false;
                                        }
                                        handler(item.value);
                                    }}
                                    disabled={item.disabled}
                                    active={current === item.value}>
                                    {item.content}
                                </Item>
                            );
                        })}
                    </Menu>
                </div>
            ) : (
                <LogoImage
                    src={variant === 'light' ? Logo : LogoWhite}
                    alt="Logo"
                />
            )}
            <Container>{children}</Container>
        </StyledSecondaryMenu>
    );
}
