import React, { Component } from 'react';

import {
    NavBar,
    NavMenu,
    RouterNavLink,
    NavMenuBar,
    MobileNavMenu
} from './styled';

import { translations } from './translations';
import Widgets from '../../components/IconSVG/Widgets';
import ChangeHistory from '../../components/IconSVG/ChangeHistory';
import Burger from '../../components/IconSVG/Burger';
import Close from '../../components/IconSVG/Close';
import Button from '../Button';
import LangChanger from '../LangChanger';
import ThemeTumbler from '../ThemeTumbler';
import { Backdrop } from '../../styles/components';

export default class Menu extends Component {
    state = {
        isMenuHidden: true
    };

    toggleMenu = () => {
        document.body.style.position = !this.state.isMenuHidden ? '' : 'fixed';
        this.setState({
            isMenuHidden: !this.state.isMenuHidden
        });
    };

    render() {
        const { inline, lang = 'ru' } = this.props;

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

        const navMenu = menu.map((item, index) => {
            return (
                <NavMenu.Item key={`menu-${index}`}>
                    <RouterNavLink
                        to={`/${item.url}`}
                        onClick={this.toggleMenu}>
                        <NavMenu.Title>{item.title}</NavMenu.Title>
                    </RouterNavLink>
                </NavMenu.Item>
            );
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
                                    <RouterNavLink
                                        to={'/'}
                                        exact
                                        onClick={this.toggleMenu}>
                                        <NavMenu.Title>
                                            {translations[lang].menu['ABOUT']}
                                        </NavMenu.Title>
                                    </RouterNavLink>
                                </NavMenu.Item>
                                {navMenu}
                                <NavMenu.Item>
                                    <LangChanger />
                                </NavMenu.Item>
                                <NavMenu.Item>
                                    <ThemeTumbler />
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
                <NavMenu>{navMenu}</NavMenu>
            </NavBar>
        );
    }
}
