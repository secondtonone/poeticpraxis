import { h, Component } from 'preact';

import { NavBar, NavMenu, RouterNavLink } from './styled';

import { translations } from './translations';
import Widgets from '../../components/IconSVG/Widgets';
import ChangeHistory from '../../components/IconSVG/ChangeHistory';
import Info from '../../components/IconSVG/Info';

export default class Menu extends Component {
    render({ inline, lang = 'ru' }) {

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
            },
            {
                url: 'about',
                title: translations[lang].menu['ABOUT'],
                icon: <Info />
            }
        ];

        return (
            <NavBar id="nav" inline={inline}>
                <NavMenu>
                    {menu.map((item) => {
                        return (
                            <NavMenu.Item>
                                <RouterNavLink to={`/${item.url}`}>
                                    <NavMenu.Icon>{item.icon}</NavMenu.Icon>
                                    <NavMenu.Title>{item.title}</NavMenu.Title>
                                </RouterNavLink>
                            </NavMenu.Item>
                        );
                    })}
                </NavMenu>
            </NavBar>
        );
    }
}
