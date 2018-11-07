import { h, render } from 'preact';
import { AppContainer } from 'react-hot-loader';

import '../public/fonts/fonts.css';

import store from './store';

import runtime from 'offline-plugin/runtime';

import analyticsInit from './modules/analytics';
import { delay } from './utils';

import App from './containers/App';

if (process.env.NODE_ENV === 'development') {
    require('preact/devtools');
}

if (process.env.NODE_ENV === 'production') {
    runtime.install({
        // When an update is ready, tell ServiceWorker to take control immediately:
        onUpdateReady() {
            console.log('update ready');
            runtime.applyUpdate();
        },

        // Reload to get the new version:
        onUpdated() {
            console.log('updated');
            location.reload();
        }
    });
}

const run = (Component) => {
    let rootElement =
        process.env.NODE_ENV === 'production'
            ? document.getElementById('app')
            : document.body.lastElementChild;

    render(
        <AppContainer>
            <Component store={store} />
        </AppContainer>,
        document.body,
        rootElement
    );
};

run(App);

if (module.hot) {
    module.hot.accept();
}

if (process.env.NODE_ENV === 'production') {
    delay(() => analyticsInit('yandex'));
}
