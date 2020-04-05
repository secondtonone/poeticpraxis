import { h } from 'preact';
import { useEffect } from 'preact/compat';
import { ThemeProvider } from 'styled-components';

import { MainContent, Page } from './styled';
import theme from '@styles/theme';

import isDaytime from '@utils/isDaytime';
import userLang from '@utils/userLang';


import Menu from '@components/Menu';
import Header from '@components/Header';
import LangChanger from '@containers/LangChanger';
import ThemeTumbler from '@containers/ThemeTumbler';
import ErrorBoundary from '@containers/ErrorBoundary';

const Layout = ({ children, variant, lang, changeTheme, changeLang }) => {

    useEffect(() => {
        if (isDaytime()) {
            changeTheme('light');
        } else {
            changeTheme('dark');
        }

        let isLangEn = false;

        if (URLSearchParams) {
            const searchParams = new URLSearchParams(location.search);
            isLangEn = searchParams.get('lang') === 'en';
        }

        if (isLangEn || !userLang().includes('ru')) {
            changeLang('en');
            document.documentElement.lang = 'en';
        } else {
            changeLang('ru');
        }
    }, []);

    return (
        <ThemeProvider theme={theme[variant]}>
            <Page _animated>
                <Header lang={lang}>
                    <Menu
                        inline
                        lang={lang}
                        items={[<ThemeTumbler />, <LangChanger />]}
                    />
                </Header>
                <MainContent>
                    <ErrorBoundary>{children}</ErrorBoundary>
                </MainContent>
            </Page>
        </ThemeProvider>
    );
};

export default Layout;
