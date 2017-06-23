import 'disable-react-devtools';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import App from './containers/App';
import './scss/style.scss';

OfflinePluginRuntime.install();

const render = Component => {
    ReactDOM.render(
        <AppContainer>
          <Component />
        </AppContainer>,
        document.getElementById('app')
    )
};

render(App);


if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('add')
    );
  });
}