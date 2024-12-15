import type { FunctionalComponent } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import AppContextContainer from './AppContextContainer';
import Layout from './Layout';
import styles from '@styles';

const GlobalStyle = createGlobalStyle`${styles}`;

const App: FunctionalComponent = ({ children }) => (
  <AppContextContainer>
    <GlobalStyle />
    <BrowserRouter>
      <Layout>
        {children}
      </Layout>
    </BrowserRouter>
  </AppContextContainer>
);

export default App;
