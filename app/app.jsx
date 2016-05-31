import React from 'react';
import { Link } from 'react-router';
import Menu from './menu.jsx';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <div className="logo-background">
                        <div className="logo"></div>
                    </div>
                    <Menu />
                </header>
                <div className="background"></div>
                <section className="main-content">
                {this.props.children}
                </section>
                <footer></footer>
            </div>
        )
    }
}