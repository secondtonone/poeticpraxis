import { h } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const App = ({ store, children }) => (
    <Provider store={store}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </Provider>
);

export default App;
