import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {
    render() {
        return (
            <nav className="menu-list">
              <ul className="menu" role="nav">
                  <li className="menu__item">
                      <Link to="/app" activeClassName="menu__item_active">Стол</Link>
                  </li>
                  <li className="menu__item">
                      <Link to="/about" activeClassName="menu__item_active">Что и для чего?</Link>
                  </li>

              </ul>
          </nav>
        )
    }
}