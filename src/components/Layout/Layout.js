import { h, Component } from 'preact';

import { MainContent, Page } from './styled';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import {
    MobileHiddenContainer,
    InlineContainer
} from '../../styles/components';

import Menu from '../Menu';
import Header from '../Header';
import Settings from '../Settings';

export default class Layout extends Component {
    render({ children, variant }) {
        return (
            <ThemeProvider theme={theme[variant]}>
                <Page _animated>
                    <Header variant={variant}>
                        <Menu inline />
                        <InlineContainer>
                            <MobileHiddenContainer>
                                <Settings />
                            </MobileHiddenContainer>
                        </InlineContainer>
                    </Header>
                    <MainContent>{children}</MainContent>
                    <footer />
                </Page>
            </ThemeProvider>
        );
    }
}
