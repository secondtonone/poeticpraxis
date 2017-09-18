import { h, Component } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'preact-redux';

import Routes from '../routes';

export default ({ store }) => (
    <Provider store = { store } >
        <BrowserRouter >
            <Routes />
        </BrowserRouter>
    </Provider>
);