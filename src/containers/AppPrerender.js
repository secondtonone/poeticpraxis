import { h, Component } from 'preact';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'preact-redux';

import Routes from '../routes';

const App = ({ store }) => (
    <Provider store={store}>
        <StaticRouter location={'/'} context={{}}>
            <Routes />
        </StaticRouter>
    </Provider>
);

export default App;
