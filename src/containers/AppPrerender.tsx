import type { FunctionalComponent } from 'preact';
import { StaticRouter } from 'react-router-dom/server';
import { createGlobalStyle } from 'styled-components';
import AppContextContainer from './AppContextContainer';
import Layout from './Layout';
import styles from '@styles';
import Routes from '@routes';

const GlobalStyle = createGlobalStyle`${styles}`;

const App: FunctionalComponent = () => (
  <AppContextContainer>
    <GlobalStyle />
    <StaticRouter location="*">
      <Layout>
        <Routes />
      </Layout>
    </StaticRouter>
  </AppContextContainer>
);

export default App;
