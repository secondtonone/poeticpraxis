import { h, FunctionalComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import {
    Menu,
    Item,
    StyledSecondaryMenu,
    Container,
    LogoContainer,
} from './styled';

import { Views } from '@typings/ImagesEngineModel';
import MenuItem from '@typings/MenuItem';

import Logo from '@components/Logo';

import { BetaSign } from '@styles/components';

const delta = 76;

// let lastPosition = 0;

interface SecondaryMenuProps {
    children?: React.ReactNode
    items: Array<MenuItem>
    handler: (value: Views) => void
    current: Views
}

const SecondaryMenu: FunctionalComponent<SecondaryMenuProps> = ({
    children,
    items,
    handler,
    current
}) => {
    const [isTranslate, setTranslate] = useState(false);

    const countTab = items.length;

    useEffect(() => {
        const scrollHandler = () => {
            if (
                /* lastPosition < window.pageYOffset && */ window.pageYOffset -
                    delta >
                0
            ) {
                setTranslate(true);
            } else {
                setTranslate(false);
            }

            // lastPosition = window.pageYOffset;
        };

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <StyledSecondaryMenu isTranslate={isTranslate}>
            <LogoContainer>
                <BetaSign>
                    <Logo />
                </BetaSign>
            </LogoContainer>
            {items ? (
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
            ) : null}
            {children ? <Container>{children}</Container> : null}
        </StyledSecondaryMenu>
    );
}

export default SecondaryMenu;
