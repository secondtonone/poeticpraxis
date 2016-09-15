import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {


    constructor(props) {

        super(props);

        this.lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);

        this.state = {};
    }

    render() {
        return (
            <nav className="navbar">
                <div className="logo-navbar"></div>
                <ul className="menu" role="nav">
                    <li className="menu__item">
                        <Link to="/app" activeClassName="menu__item_active">Стол</Link>
                    </li>
                    <li className="menu__item">
                        <Link to="/image-engine" activeClassName="menu__item_active">Имаджиэнджин</Link>
                    </li>
                    <li className="menu__item">
                        <Link to="/about" activeClassName="menu__item_active">Что и для чего?</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}