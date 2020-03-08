import { h, Component } from 'preact';
import { useEffect } from 'preact/compat';

import { MainContent, Page } from './styled';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

import { isDaytime, userLang } from '../../utils';

import Menu from '../Menu';
import Header from '../Header';
import LangChanger from '../LangChanger';
import ThemeTumbler from '../ThemeTumbler';
import ErrorBoundary from '../ErrorBoundary';

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
                <Header
                    variant={variant}
                    lang={lang}
                    children={(props) => (
                        <Menu
                            inline
                            lang={lang}
                            onToggle={props.toggleHeaderZIndex}
                            items={[<ThemeTumbler />, <LangChanger />]}
                        />
                    )}
                />
                <MainContent>
                    <ErrorBoundary>{children}</ErrorBoundary>
                </MainContent>
            </Page>
        </ThemeProvider>
    );
};

export default Layout;
