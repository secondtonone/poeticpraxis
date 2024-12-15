import type { FunctionalComponent } from 'preact';
import { useContext, useLayoutEffect } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';

import StateContext from '@contexts/stateContext';

import useResizeUpdate from '@hooks/useResizeUpdate';
import useTitlePage from '@hooks/useTitlePage';
import useChangeHreflang from '@hooks/useChangeHreflang';

import scrollToAnchor from '@utils/scrollToAnchor';
import maxMatchMedia from '@utils/maxMatchMedia';
import getDaysFromNow from '@utils/getDaysFromNow';
import engSuffixNumber from '@utils/engSuffixNumber';

import AboutLanding from './AboutLanding';
import AboutEngine from './AboutEngine';

import {
  Footer
} from '@styles/components';
import Loader from '@components/Loader';
import DynamicOnScrollProps from '@components/DynamicOnScroll';

const AboutRhythmic = lazy(() =>
  import(/* webpackChunkName: "AboutRhythmic" */'./AboutRhythmic')
);

const AboutProject = lazy(() =>
  import(/* webpackChunkName: "AboutProject" */'./AboutProject')
);

const daysFromNow = getDaysFromNow(new Date(2016, 4, 25));
const engDateSuffix = engSuffixNumber(daysFromNow);

const About: FunctionalComponent = () => {
  const { Layout: { variant, lang } } = useContext(StateContext);
  const { innerHeight } = useResizeUpdate(800);

  const isRusLang = lang === 'ru';
  const title = isRusLang ? 'Поэтическая практика - ГЛАВНАЯ' : 'HOME';
  const mediaQuery = maxMatchMedia(800);

  useChangeHreflang();
  useTitlePage(title);

  useLayoutEffect(() => {
    scrollToAnchor();
  }, []);

  return (
    <section>
      <AboutLanding
        variant={variant}
        lang={lang}
        mediaQuery={mediaQuery}
        boundHeight={innerHeight}
      />

      <AboutEngine
        lang={lang}
        mediaQuery={mediaQuery}
      />

      <DynamicOnScrollProps>
        <Suspense fallback={<Loader height={'100%'} />}>
          <AboutRhythmic
            lang={lang}
            mediaQuery={mediaQuery}
          />
        </Suspense>
      </DynamicOnScrollProps>

      <DynamicOnScrollProps>
        <Suspense fallback={<Loader height={'100%'} />}>
          <AboutProject
            lang={lang}
            mediaQuery={mediaQuery}
            boundHeight={innerHeight}
          />
        </Suspense>
      </DynamicOnScrollProps>

      <Footer>
        &copy; POETIC PRAXIS {daysFromNow}
        {isRusLang ? '-й день' : `${engDateSuffix} day`}
      </Footer>
    </section>
  );
};

export default About;
