import { h } from 'preact';
import renderToString from 'preact-render-to-string';
import { ServerStyleSheet, injectGlobal } from 'styled-components';

import styles from './styles';

import store from './store';

import App from './containers/AppPrerender';

import Routes from './routes';

injectGlobal`${styles}`;

if (typeof window === 'undefined') {
    global.window = {
        screen: {}
    };
}

const prerender = function() {
    const sheet = new ServerStyleSheet();

    const html = renderToString(sheet.collectStyles(<App store={store} />));

    const styles = sheet.getStyleTags();

    return {
        html,
        styles
    };
};

export default prerender;
