import { h, Component } from 'preact';

import {
    Menu,
    Item,
    StateSelect,
    StyledSecondaryMenu,
    Container
} from './styled';

import Options from '../Options';

export default function SecondaryMenu({ children, items, handler, current }) {
    return (
        <StyledSecondaryMenu>
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
            <Container>{children}</Container>
        </StyledSecondaryMenu>
    );
}
