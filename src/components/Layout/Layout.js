import { h, Component } from 'preact';
import {randomize} from '../../utils';

import Menu from '../Menu';
import Background from '../Background'

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
                <Background blocksCount={15}/>
                <main class="main-content">
                {children}
                </main>
                <footer></footer>
            </div>
        )
    }
}