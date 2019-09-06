import React, { Component } from 'react';

import { NavBar, NavMenu, NavMenuBar, MobileNavMenu } from './styled';

import { translations } from './translations';
import Widgets from '../IconSVG/Widgets';

import ChangeHistory from '../IconSVG/ChangeHistory';
import Burger from '../IconSVG/Burger';
import Close from '../IconSVG/Close';

import Button from '../Button';
import RouteLink from '../RouteLink';

import { Backdrop, Flex, Container } from '../../styles/components';

export default class Menu extends Component {
    state = {
        isMenuHidden: true
    };

    toggleMenu = () => {
        document.body.style.position = !this.state.isMenuHidden ? '' : 'fixed';
        this.props.onToggle();
        this.setState({
            isMenuHidden: !this.state.isMenuHidden
        });
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
                            <MobileNavMenu>
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

                                <NavMenu.Item>
                                    <Button
                                        _rounded
                                        _flat
                                        _transparent
                                        onClick={this.toggleMenu}>
                                        <Close />
                                    </Button>
                                </NavMenu.Item>
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
