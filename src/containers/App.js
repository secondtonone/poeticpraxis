import { h, Component } from 'preact';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Provider } from 'preact-redux';

import Routes from '../routes';

const App = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
);

export default App;
