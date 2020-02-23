const DEV = process.env.NODE_ENV === 'development';

if (DEV) {
    require('preact/debug');
}

import { h, hydrate } from 'preact';

import store from './store';
import App from './containers/App';


const run = (Component) => {
    const rootElement = DEV
        ? document.body.lastElementChild
        : document.getElementById('app'); 

    hydrate(<Component store={store} />, rootElement);
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
