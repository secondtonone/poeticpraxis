import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';

class Menu extends React.Component {
   render() {
      return (
            <ul className="menu">
                <li className="menu__item menu__item_active">
                    <Link to="app">Стол</Link>
                </li>
                <li className="menu__item">
                    <Link to="help">Что и для чего?</Link>
                </li>
            </ul>
      )
   }
}

export default Menu;