const DEV = process.env.NODE_ENV === 'development';

if (DEV) {
    require('preact/debug');
}

import { h, render } from 'preact';

import theme from '@styles/theme';
import store from '@store';
import App from '@containers/App';
import Routes from '@routes';

import analyticsInit from '@modules/analytics';

const run = (Component) => {
    const rootElement = DEV
        ? document.body.lastElementChild
        : document.getElementById('app');

    render(
        <Component store={store}>
            <Routes />
        </Component>,
        rootElement
    );
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
            },
        });
    })();
}

run(App);

if (!DEV) {
    console.clear();
    console.log(`%cPOETIC PRAXIS - ПОЭТИЧЕСКАЯ ПРАКТИКА.
    POETIC PRAXIS - ЧТО СКРЫТО ЗА СЛОВАМИ? ИДЕИ - МУЗЫКА МЕЖДУ СТРОК. 
    POETIC PRAXIS - СКРЫТО? НОВОЕ. 
    POETIC PRAXIS - СЛОВАМИ? ИДЕИ СТРОК.`, 
    `color: ${theme.primaryBlack};
    font-family: ${theme.mainFont};
    font-size: 10em;
    word-break: break-all;
    font-weight: 500;
    text-align: left;
    padding: 0;
    width: 100%;
    line-height: 0.7;
    letter-spacing: -0.099em;
    text-transform: uppercase;
    background: ${theme.primaryWhite};`);
    window.addEventListener('load', () => setTimeout(analyticsInit, 3000, 'yandex'));
}
