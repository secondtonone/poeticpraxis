import { FunctionalComponent } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import AppContextContainer from './AppContextContainer';

import styles from '@styles';

const GlobalStyle = createGlobalStyle`${styles}`;

const App: FunctionalComponent = ({ children }) => (
  <AppContextContainer>
    <GlobalStyle />
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </AppContextContainer>
);

export default App;
