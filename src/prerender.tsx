import { h } from 'preact';
import render from 'preact-render-to-string';
import { ServerStyleSheet } from 'styled-components';

import App from './containers/AppPrerender';


if (typeof window === 'undefined') {
    // @ts-ignore
    global.window = {
        screen: {},
        document: {
            documentElement:{}
        }
    };
}

const prerender = () => {
    const sheet = new ServerStyleSheet();
    // @ts-ignore
    const html = render(sheet.collectStyles(<App />));

    const styles = sheet.getStyleTags();

    return {
        html,
        styles
    };
};

export default prerender;