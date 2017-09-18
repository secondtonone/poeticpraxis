import { h, Component } from 'preact';
import { NavLink } from 'react-router-dom';

import './Menu.scss';

export default class Menu extends Component {


    constructor(props) {

        super(props);

        this.lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    }

    render() {

        const urls = {
            imagesEngine: '/images-engine',
            rhythmic: '/rhythmic',
            about: '/about'
        };

        const titles = {
            imagesEngine: 'Машина образов',
            rhythmic: 'Ритмика',
            about: 'О проекте'
        };

        return (
            <nav class="navbar navbar--animated" id="nav">
                <a href="/" class="logo-navbar" aria-labelledby="nav pp" id="pp">POETIC PRAXIS</a>
                <ul class="menu">

                    <li class="menu__item">
                        <NavLink to={urls.imagesEngine} activeClassName="menu__item_active">
                        <div class="menu__icon"><i class="material-icons">widgets</i></div>
                        <div class="menu__title">{titles.imagesEngine}</div></NavLink>
                    </li>

                    <li class="menu__item">
                        <NavLink to={urls.rhythmic} activeClassName="menu__item_active">
                            <div class="menu__icon"><i class="material-icons">change_history</i></div>
                            <div class="menu__title">{titles.rhythmic}</div>
                        </NavLink>
                    </li>

                    <li class="menu__item">
                        <NavLink to={urls.about} activeClassName="menu__item_active">
                        <div class="menu__icon"><i class="material-icons">info_outline</i></div>
                        <div class="menu__title">{titles.about}</div></NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}