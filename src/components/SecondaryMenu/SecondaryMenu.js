import { h } from 'preact';

import {
    Menu,
    Item,
    StyledSecondaryMenu,
    Container,
    LogoContainer
} from './styled';

import Logo from '../Logo';

import {BetaSign} from '../../styles/components';

export default function SecondaryMenu({
    children,
    items,
    handler,
    current,
    variant = 'light'
}) {
    const countTab = items.length;
    return (
        <StyledSecondaryMenu>
            <LogoContainer>
                <BetaSign>
                    <Logo variant={variant} />
                </BetaSign>
            </LogoContainer>
            {items ? (
                <div>
                    <Menu>
                        {items.map((item, index) => {
                            return (
                                <Item
                                    count={countTab}
                                    key={`item-${index}`}
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
            ) : null}
            <Container>{children}</Container>
        </StyledSecondaryMenu>
    );
}
