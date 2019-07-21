import React, { Component } from 'react';

import { MainContent, Page } from './styled';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import {
    MobileHiddenContainer,
    InlineContainer
} from '../../styles/components';

import { isDaytime, userLang } from '../../utils';

import Menu from '../Menu';
import Header from '../Header';
import Settings from '../Settings';

export default class Layout extends Component {
    componentDidMount() {
        if (isDaytime()) {
            this.props.changeTheme('light');
        } else {
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
    }

    render() {
        const { children, variant, lang } = this.props;

        return (
            <ThemeProvider theme={theme[variant]}>
                <Page _animated>
                    <Header variant={variant} lang={lang}>
                        <Menu inline lang={lang} />
                        <MobileHiddenContainer>
                            <Settings />
                        </MobileHiddenContainer>
                    </Header>
                    <MainContent>{children}</MainContent>
                </Page>
            </ThemeProvider>
        );
    }
}
