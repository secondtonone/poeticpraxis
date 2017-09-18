import { h, Component } from 'preact';

import Menu from '../Menu';

import './Layout.scss';


export default class Layout extends Component {

    render({children}) {


        return (
            <div>
                <header>
                    <div class="logo-background">
                        <a href="/" alt="POETIC PRAXIS" title="POETIC PRAXIS"><div class="logo"></div></a>
                    </div>
                    <Menu />
                </header>
                <div class="background"></div>
                <main class="main-content">
                {children}
                </main>
                <footer></footer>
            </div>
        )
    }
}