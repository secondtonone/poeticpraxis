import { h } from 'preact';
import { render } from 'react-dom';

import '../public/fonts/fonts.css';

import store from './store';

import analyticsInit from './modules/analytics';
import { delay } from './utils';

import App from './containers/App';

const DEV = process.env.NODE_ENV === 'development';

const run = (Component) => {
    const rootElement =
        process.env.NODE_ENV === 'production'
            ? document.getElementById('app')
            : document.body.lastElementChild;

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
    delay(() => analyticsInit('yandex'));
}
