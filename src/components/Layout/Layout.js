import { h, Component } from 'preact';

import { MainContent, Page } from './styled';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

import { isDaytime, userLang } from '../../utils';

import Menu from '../Menu';
import Header from '../Header';
import LangChanger from '../LangChanger';
import ThemeTumbler from '../ThemeTumbler';

import analyticsInit from '../../modules/analytics';

const PROD = process.env.NODE_ENV === 'production';

export default class Layout extends Component {
    changeThemeColor = () => {
        const metaThemeColor = document.querySelector('meta[name=theme-color]');
        metaThemeColor.setAttribute(
            'content',
            theme[this.props.variant].primaryColor
        );
    };

    componentDidMount() {

        if (isDaytime() && this.props.variant === 'dark') {
            this.props.changeTheme('light');
        } 
        if (!isDaytime() && this.props.variant === 'light') {
            this.props.changeTheme('dark');
        }

        let isLangEn = false;

        if (URLSearchParams) {
            const searchParams = new URLSearchParams(location.search);
            isLangEn = searchParams.get('lang') === 'en';
        }

        if (isLangEn || !userLang().includes('ru')) {
            this.props.changeLang('en');
            document.documentElement.lang = 'en';
        } else {
            this.props.changeLang('ru');
        }

        if (PROD) {
            analyticsInit('yandex');
        } 
    }

    render() {
        const { children, variant, lang } = this.props;

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
                    <MainContent>{children}</MainContent>
                </Page>
            </ThemeProvider>
        );
    }
}
