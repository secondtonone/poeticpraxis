import { h } from 'preact';
import { useState, useCallback, useRef } from 'preact/compat';

import { NavBar, NavMenu, NavMenuBar, MobileNavMenu } from './styled';

import { translations } from './translations';
import MenuItems from './MenuItems';

import Widgets from '@icons/Widgets';
import ChangeHistory from '@icons/ChangeHistory';
import Burger from '@icons/Burger';

import Button from '@components/Button';
import RouteLink from '@components/RouteLink';
import Portal from '@components/Portal';
import Flex from '@components/Flex';
import Container from '@components/Container';

import { Backdrop } from '@styles/components';

const menu = [
    {
        url: 'images-engine',
        title: 'ENGINE',
        icon: <Widgets />
    },
    {
        url: 'rhythmic',
        title: 'RHYTHMICS',
        icon: <ChangeHistory />
    }
];

let initialY = 0;
let deltaY = 0;
export default function Menu({ inline, items, lang = 'ru' }) {
    
    const [ isMenuHidden, setMenuVisibility ] = useState(true);
    
    const mobileNavMenu = useRef();

    const toggleMenu = useCallback(() => {
        const isHidden = !isMenuHidden;
        if (isHidden) {
            document.body.classList.remove('fixed');
        } else {
            document.body.classList.add('fixed');
        } 
        setMenuVisibility(isHidden);
    }, [isMenuHidden]);

    const onTouchToggle = useCallback(
        (e) => {
            if (e.type === 'touchstart') {
                initialY = e.touches[0].clientY;
            }

            if (e.type === 'touchend' && deltaY > 0 && !isMenuHidden) {
                deltaY = 0;
                toggleMenu();
            }
        },
        [isMenuHidden]
    );

    const onTouchMove = useCallback(
        (e) => {
            deltaY = e.touches[0].clientY - initialY;
            if (mobileNavMenu.current) {
                mobileNavMenu.current.style.transform = `translateY(${
                    deltaY < 0 ? 0 : deltaY
                }px)`;

                if (
                    deltaY > mobileNavMenu.current.offsetHeight * 0.85 &&
                    !isMenuHidden
                ) {
                    deltaY = 0;
                    toggleMenu();
                }
            }
        },
        [isMenuHidden]
    );

    return (
        <NavBar id="nav" inline={inline}>
            <NavMenuBar>
                <Button _rounded _flat _transparent onClick={toggleMenu}>
                    <Burger />
                </Button>
                {!isMenuHidden ? (
                    <Portal id="portal-menu">
                        <Backdrop>
                            <MobileNavMenu
                                ref={mobileNavMenu}
                                onTouchMove={onTouchMove}
                                onTouchStart={onTouchToggle}
                                onTouchEnd={onTouchToggle}>
                                <NavMenu.Item>
                                    <RouteLink
                                        to={'/'}
                                        exact
                                        onClick={toggleMenu}>
                                        <NavMenu.Title>
                                            {
                                                translations[lang].menu[
                                                    'ABOUT'
                                                ]
                                            }
                                        </NavMenu.Title>
                                    </RouteLink>
                                </NavMenu.Item>
                                <MenuItems
                                    lang={lang}
                                    items={menu}
                                    render={(item) => (
                                        <RouteLink
                                            to={`/${item.url}`}
                                            onClick={toggleMenu}>
                                            <NavMenu.Title>
                                                {
                                                    translations[lang].menu[
                                                        item.title
                                                    ]
                                                }
                                            </NavMenu.Title>
                                        </RouteLink>
                                    )}
                                />
                                <NavMenu.Item />
                                <NavMenu.Item>
                                    <Flex justify="space-between">
                                        {items.map((item, index) => (
                                            <Container
                                                width="40%"
                                                key={`item-${index}`}>
                                                {item}
                                            </Container>
                                        ))}
                                    </Flex>
                                </NavMenu.Item>
                            </MobileNavMenu>
                        </Backdrop>
                    </Portal>
                ) : null}
            </NavMenuBar>
            <NavMenu>
                <MenuItems
                    items={menu}
                    render={(item) => (
                        <RouteLink to={`/${item.url}`}>
                            <NavMenu.Title>
                                {translations[lang].menu[item.title]}
                            </NavMenu.Title>
                        </RouteLink>
                    )}
                />
                <MenuItems items={items} />
            </NavMenu>
        </NavBar>
    );
    
}
