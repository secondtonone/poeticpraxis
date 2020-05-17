import { createStore } from 'redux';
import reducers, { RootState } from './reducers';

const storageName: string = '___PoeticPraxisApp___';

let persistedState: RootState | {} = {};

if (typeof window !== 'undefined') {
    persistedState = window.localStorage.getItem(storageName)
        ? JSON.parse(window.localStorage.getItem(storageName))
        : {};
}

const enhancers = [];

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    const devToolsExtension =
        window['__REDUX_DEVTOOLS_EXTENSION__'];

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const store = createStore(reducers, persistedState, ...enhancers);

store.subscribe(() => {
    localStorage.setItem(storageName, JSON.stringify(store.getState()));
});

export type Store = typeof store;

export default store;
