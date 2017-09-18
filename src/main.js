import { h, render } from 'preact';

import store from './store';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import {analyticsInit} from './utils';

import './scss/style.scss';

if (process.env.NODE_ENV==='production') {
    OfflinePluginRuntime.install();
}

let root;

const run = () => {

    const App = require('./containers/App').default;

    root = render(
        <App store={store}/>,
        document.body,
        root || document.getElementById('app')
    );
};

if(process.env.NODE_ENV === 'development') {
    if (module.hot) {
        require('preact/devtools');
        module.hot.accept('./containers/App', run);
    }
}

run();

if(process.env.NODE_ENV === 'production') {
    analyticsInit();
}