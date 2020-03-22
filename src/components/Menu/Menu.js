import { h, Component } from 'preact';

import { NavBar, NavMenu, NavMenuBar, MobileNavMenu } from './styled';

import { translations } from './translations';
import MenuItems from './MenuItems';

import Widgets from '@icons/Widgets';

import ChangeHistory from '@icons/ChangeHistory';
import Burger from '@icons/Burger';

import Button from '@components/Button';
import RouteLink from '@components/RouteLink';
import Portal from '@components/Portal';

import { Backdrop, Flex, Container } from '@styles/components';


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
export default class Menu extends Component {
    state = {
        isMenuHidden: true
    };

    initialY = 0;
    deltaY = 0;
    mobileNavMenu = null;

    toggleMenu = () => {
        document.body.classList.toggle('fixed');

        this.setState({
            isMenuHidden: !this.state.isMenuHidden
        });
    };

    onTouchToggle = (e) => {

        if (e.type === 'touchstart') {
            this.initialY = e.touches[0].clientY;
        }

        if (
            e.type === 'touchend' &&
            this.deltaY > 0 &&
            !this.state.isMenuHidden
        ) {
            this.deltaY = 0;
            this.toggleMenu();
        }
    };

    onTouchMove = (e) => {

        this.deltaY = e.touches[0].clientY - this.initialY;
        if (this.mobileNavMenu) {
            this.mobileNavMenu.style.transform = `translateY(${
                this.deltaY < 0 ? 0 : this.deltaY
            }px)`;

            if (
                this.deltaY > this.mobileNavMenu.offsetHeight * 0.85 &&
                !this.state.isMenuHidden
            ) {
                this.deltaY = 0;
                this.toggleMenu();
            }
        }
    };

    render() {
        const { inline, items, lang = 'ru' } = this.props;

        return (
            <NavBar id="nav" inline={inline}>
                <NavMenuBar>
                    <Button
                        _rounded
                        _flat
                        _transparent
                        onClick={this.toggleMenu}>
                        <Burger />
                    </Button>
                    {!this.state.isMenuHidden ? (
                        <Portal id="portal-menu">
                            <Backdrop>
                                <MobileNavMenu
                                    ref={(ref) => {
                                        this.mobileNavMenu = ref;
                                    }}
                                    onTouchMove={this.onTouchMove}
                                    onTouchStart={this.onTouchToggle}
                                    onTouchEnd={this.onTouchToggle}>
                                    <NavMenu.Item>
                                        <RouteLink
                                            to={'/'}
                                            exact
                                            onClick={this.toggleMenu}>
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
                                                onClick={this.toggleMenu}>
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
}
