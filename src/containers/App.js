import { h } from 'preact';
//import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from '../routes';

const App = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
);

//export default hot(App);
export default App;
