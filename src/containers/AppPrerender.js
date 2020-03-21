import { h } from 'preact';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import styles from '@styles';
import Routes from '@routes';

const GlobalStyle = createGlobalStyle`${styles}`;

const App = ({ store }) => (
    <Provider store={store}>
        <GlobalStyle />
        <StaticRouter location={'/'} context={{}}>
            <Routes />
        </StaticRouter>
    </Provider>
);

export default App;
