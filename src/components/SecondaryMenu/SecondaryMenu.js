import { h } from 'preact';
import { useState, useCallback, useEffect } from 'preact/compat';
import {
    Menu,
    Item,
    StyledSecondaryMenu,
    Container,
    LogoContainer
} from './styled';

import Logo from '../Logo';

import {BetaSign} from '../../styles/components';

const delta = 76;

let lastPosition = 0;

export default function SecondaryMenu({
    children,
    items,
    handler,
    current,
    variant = 'light'
}) {

    const [isTranslate, setTranslate] = useState(false);

    const countTab = items.length;

    useEffect(() => {
        const scrollHandler = () => {
            if (
                (/* lastPosition < window.pageYOffset && */window.pageYOffset - delta > 0)
            ) {
                setTranslate(true);
            } else {
                setTranslate(false);
            }

            lastPosition = window.pageYOffset;
        };

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <StyledSecondaryMenu isTranslate={isTranslate}>
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
