import React from 'react';
import { Link } from 'react-router';

import './Menu.scss';

export default class Menu extends React.Component {


    constructor(props) {

        super(props);

        this.lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);

        this.state = {};
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
            <nav className="navbar navbar--animated">
                <a href="/" className="logo-navbar"></a>
                <ul className="menu" role="nav">

                    <li className="menu__item">
                        <Link to={urls.imagesEngine} activeClassName="menu__item_active">
                        <div className="menu__icon"><i className="material-icons">widgets</i></div>
                        <div className="menu__title">{titles.imagesEngine}</div></Link>
                    </li>

                    <li className="menu__item">
                        <Link to={urls.rhythmic} activeClassName="menu__item_active">
                            <div className="menu__icon"><i className="material-icons">change_history</i></div>
                            <div className="menu__title">{titles.rhythmic}</div>
                        </Link>
                    </li>

                    <li className="menu__item">
                        <Link to={urls.about} activeClassName="menu__item_active">
                        <div className="menu__icon"><i className="material-icons">info_outline</i></div>
                        <div className="menu__title">{titles.about}</div></Link>
                    </li>
                </ul>
            </nav>
        )
    }
}