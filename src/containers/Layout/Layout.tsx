import type { FunctionalComponent } from 'preact';
import { useContext, useLayoutEffect, useMemo } from 'preact/hooks';

import { MainContent, Page } from './styled';

import StateContext from '@contexts/stateContext';
import useLayoutActions from '@hooks/useLayoutActions';

import userLang from '@utils/userLang';

import Menu from '@components/Menu';
import Header from '@components/Header';
import LangChanger from '@containers/LangChanger';
import ThemeTumbler from '@containers/ThemeTumbler';
import ErrorBoundary from '@containers/ErrorBoundary';
import ThemeContextContainer from '@containers/ThemeContextContainer';

const menuItems = [<ThemeTumbler key="theme" />, <LangChanger key="lang"/>];

const Layout: FunctionalComponent = ({ children }) => {
  const { Layout: { variant, lang }} = useContext(StateContext);
  const { changeLang } = useLayoutActions();

  useLayoutEffect(() => {
    let isLangEn = false;

    if (URLSearchParams) {
      const searchParams = new URLSearchParams(location.search);
      isLangEn = searchParams.get('lang') === 'en';
    }

    if (isLangEn || !userLang().includes('ru-RU')) {
      changeLang('en');
      document.documentElement.lang = 'en';
    } else {
      changeLang('ru');
    }
  }, [changeLang]);

  return useMemo(()  => (
    <ThemeContextContainer>
      <Page>
        <Header
          lang={lang}
          variant={variant}
        >
          <Menu
            lang={lang}
            items={menuItems}
          />
        </Header>
        <MainContent>
          <ErrorBoundary lang={lang}>
            {children}
          </ErrorBoundary>
        </MainContent>
      </Page>
    </ThemeContextContainer>
  ), [variant, lang, children]);
};

export default Layout;
