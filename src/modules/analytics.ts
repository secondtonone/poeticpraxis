// @ts-nocheck
/* eslint-disable */
import { YANDEX_ID, GOOGLE_ID } from '@constants/analytics';

const loading = (i: Window, s: Document, o: string, g: string, r: string, a?: HTMLScriptElement, m?: HTMLScriptElement) => {
  i['GoogleAnalyticsObject'] = r;
  (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
  (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
};

const yandexInit = () => {
  (function(m, e, t, r, i, k, a) {
    m[i] =
            m[i] ||
            function() {
              (m[i].a = m[i].a || []).push(arguments);
            };
    m[i].l = 1 * new Date();
    (k = e.createElement(t)),
    (a = e.getElementsByTagName(t)[0]),
    (k.async = 1),
    (k.src = r),
    a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
  ym(YANDEX_ID, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  });
};
/* (function(d, w, c) {
        (w[c] = w[c] || []).push(function() {
            try {
                w.yaCounter48473147 = new Ya.Metrika({
                    id: 48473147,
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true
                });
            } catch (e) {}
        });

        var n = d.getElementsByTagName('script')[0],
            s = d.createElement('script'),
            f = function() {
                n.parentNode.insertBefore(s, n);
            };
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://mc.yandex.ru/metrika/watch.js';

        if (w.opera == '[object Opera]') {
            d.addEventListener('DOMContentLoaded', f, false);
        } else {
            f();
        }
    })(document, window, 'yandex_metrika_callbacks'); */

const googleInit = () => {
  loading(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  );
  ga('create', GOOGLE_ID, 'auto');
  ga('send', 'pageview');
};

export default function analyticsInit(provider = 'google') {
  if (provider === 'google') {
    googleInit();
  } else {
    yandexInit();
  }
}
