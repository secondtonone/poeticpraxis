import { FunctionalComponent } from 'preact';
import { useContext, useLayoutEffect, useMemo } from 'preact/hooks';
import { ThemeProvider } from 'styled-components';

import { MainContent, Page } from './styled';
import theme from '@styles/theme';

import StateContext from '@contexts/stateContext';
import useLayoutActions from '@hooks/useLayoutActions';

import userLang from '@utils/userLang';

import Menu from '@components/Menu';
import Header from '@components/Header';
import LangChanger from '@containers/LangChanger';
import ThemeTumbler from '@containers/ThemeTumbler';
import ErrorBoundary from '@containers/ErrorBoundary';

const menuItems = [<ThemeTumbler />, <LangChanger />];

const Layout: FunctionalComponent = ({ children }) => {
  const { Layout: { variant, lang }} = useContext(StateContext);
  const { changeTheme, changeLang } = useLayoutActions();

  useLayoutEffect(() => {
    const selector = '(prefers-color-scheme: dark)';
    const handler = (e: MediaQueryListEvent) => {
      const newColorScheme = e.matches ? 'dark' : 'light';
      changeTheme(newColorScheme);
    };
        
    window.matchMedia(selector).addEventListener('change', handler);

    return () => {
      window.matchMedia(selector).removeEventListener('change', handler);
    };
  }, []);

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
    <ThemeProvider theme={theme[variant]}>
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
    </ThemeProvider>
  ), [variant, lang]);
};

export default Layout;
