import { h, Component } from 'preact';

import { NavBar, NavMenu, NavMenuBar, MobileNavMenu } from './styled';

import { translations } from './translations';
import Widgets from '../IconSVG/Widgets';

import ChangeHistory from '../IconSVG/ChangeHistory';
import Burger from '../IconSVG/Burger';

import Button from '../Button';
import RouteLink from '../RouteLink';

import { Backdrop, Flex, Container } from '../../styles/components';

export default class Menu extends Component {
    state = {
        isMenuHidden: true
    };

    initialY = 0;
    deltaY = 0;
    mobileNavMenu = null;

    toggleMenu = () => {
        document.body.style.position = !this.state.isMenuHidden ? '' : 'fixed';
        document.body.style.overflowY = !this.state.isMenuHidden ? 'auto' : 'hidden';

        this.props.onToggle();
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
    };

    render() {
        const { inline, items, lang = 'ru' } = this.props;

        const menu = [
            {
                url: 'images-engine',
                title: translations[lang].menu['ENGINE'],
                icon: <Widgets />
            },
            {
                url: 'rhythmic',
                title: translations[lang].menu['RHYTHMICS'],
                icon: <ChangeHistory />
            }
        ];

        const navMenuDevice = menu.map((item, index) => {
            return (
                <NavMenu.Item key={`menu-${index}`}>
                    <RouteLink to={`/${item.url}`} onClick={this.toggleMenu}>
                        <NavMenu.Title>{item.title}</NavMenu.Title>
                    </RouteLink>
                </NavMenu.Item>
            );
        });

        const navMenu = menu.map((item, index) => {
            return (
                <NavMenu.Item key={`menu-${index}`}>
                    <RouteLink to={`/${item.url}`}>
                        <NavMenu.Title>{item.title}</NavMenu.Title>
                    </RouteLink>
                </NavMenu.Item>
            );
        });

        const menuItems = items.map((item, index) => {
            return <NavMenu.Item key={`item-${index}`}>{item}</NavMenu.Item>;
        });

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
                                            {translations[lang].menu['ABOUT']}
                                        </NavMenu.Title>
                                    </RouteLink>
                                </NavMenu.Item>
                                {navMenuDevice}
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

                                {/* <NavMenu.Item>
                                        <Button
                                            _rounded
                                            _flat
                                            _transparent
                                            onClick={this.toggleMenu}>
                                            <Close />
                                        </Button>
                                    </NavMenu.Item> */}
                            </MobileNavMenu>
                        </Backdrop>
                    ) : null}
                </NavMenuBar>
                <NavMenu>
                    {navMenu}
                    {menuItems}
                </NavMenu>
            </NavBar>
        );
    }
}
