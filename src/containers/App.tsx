import { h, FunctionalComponent } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import AppContextContainer from './AppContextContainer';

const App: FunctionalComponent = ({ children }) => (
    <AppContextContainer>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </AppContextContainer>
);

export default App;
