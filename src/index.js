const DEV = process.env.NODE_ENV === 'development';

if (DEV) {
    require('preact/debug');
}

import { h, render } from 'preact';

import store from './store';
import App from './containers/App';

import analyticsInit from './modules/analytics';


const run = (Component) => {
    const rootElement = DEV
        ? document.body.lastElementChild
        : document.getElementById('app'); 

    render(<Component store={store} />, rootElement);
};

if (!DEV) {
    (async () => {
        const runtime = await import('offline-plugin/runtime');

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
    })();
}


run(App);


if (!DEV) {
    window.addEventListener('load', () => analyticsInit('yandex'));
}
