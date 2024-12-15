const DEV = process.env.NODE_ENV === 'development';

if (DEV) {
  require('preact/debug');
}

import { type FunctionalComponent, hydrate } from 'preact';

import theme from '@styles/theme';
import App from '@containers/App';
import Routes from '@routes';

import analyticsInit from '@modules/analytics';
import enableRUM from '@modules/web-vitals';

const run = (Component: FunctionalComponent) => {
  const rootElement = DEV
    ? document.body.lastElementChild
    : document.getElementById('app');

  if(rootElement) {
    hydrate(
      <Component>
        <Routes />
      </Component>,
      rootElement
    );
  }
};

if (!DEV) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
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

  window.addEventListener('load', () => requestIdleCallback(() => analyticsInit( 'yandex')));

  enableRUM();
}
