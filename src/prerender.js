import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';



import store from './store';

import App from './containers/AppPrerender';


if (typeof window === 'undefined') {
    global.window = {
        screen: {},
        document: {
            documentElement:{}
        }
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
