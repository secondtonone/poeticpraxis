import { h, Component } from 'preact';
import { useEffect, useState, useContext } from 'preact/compat';
import { ThemeContext } from 'styled-components';

import { PageHeader, ContentField, Logo, Block } from './styled';
import {
    HoveredElement,
    ShowOnHover,
    HideOnHover,
    Flex,
    BetaSign
} from '@styles/components';

import isTouchDevice from '@utils/isTouchDevice';
import { translations } from './translations';

import RouteLink from '@components/RouteLink';

import LogoPic from '@public/img/Logo.svg';
import LogoPicWhite from '@public/img/Logo-white.svg';


const Header = ({ children, lang = 'ru' }) => {
    const initHeight = window.innerHeight;
    const themeContext = useContext(ThemeContext);
    const [ actualHeight, setHeight ] = useState(initHeight);

    useEffect(() => {
        const updateDimensions = () => setHeight(window.innerHeight);

        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <PageHeader
            hidden={isTouchDevice() && actualHeight < initHeight}>
            <HoveredElement>
                <Block>
                    <RouteLink to="/" exact>
                        <HideOnHover>
                            <BetaSign>
                                <Logo
                                    src={
                                        themeContext.name === 'light'
                                            ? LogoPic
                                            : LogoPicWhite
                                    }
                                    alt="Logo"
                                    height="32"
                                />
                            </BetaSign>
                        </HideOnHover>
                        <ShowOnHover>
                            <Flex height="32px">
                                {translations[lang].menu['ABOUT']}
                            </Flex>
                        </ShowOnHover>
                    </RouteLink>
                </Block>
            </HoveredElement>
            <ContentField>{children}</ContentField>
        </PageHeader>
    );
}

export default Header;
