import { createStore } from 'redux';
import reducers from './reducers';

const storageName = '___PoeticPraxisApp___';

let persistedState = {};

if (typeof window !== 'undefined') {
    persistedState = window.localStorage.getItem(storageName)
        ? JSON.parse(window.localStorage.getItem(storageName))
        : {};
}

const enhancers = [];

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const store = createStore(reducers, persistedState, ...enhancers);

store.subscribe(() => {
    localStorage.setItem(storageName, JSON.stringify(store.getState()));
});

export default store;
