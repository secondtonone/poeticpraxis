import { FunctionalComponent } from 'preact';
import { StaticRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import AppContextContainer from './AppContextContainer';

import styles from '@styles';
import Routes from '@routes';

const GlobalStyle = createGlobalStyle`${styles}`;

const App: FunctionalComponent = () => (
    <AppContextContainer>
        <GlobalStyle />
        <StaticRouter location={'/'} context={{}}>
            <Routes />
        </StaticRouter>
    </AppContextContainer>
);

export default App;
