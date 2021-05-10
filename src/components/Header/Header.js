import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/compat';
import { ThemeContext } from 'styled-components';

import { PageHeader, ContentField, Logo, Block } from './styled';
import {
    HoveredElement,
    ShowOnHover,
    HideOnHover,
    BetaSign
} from '@styles/components';

import { translations } from './translations';

import RouteLink from '@components/RouteLink';
import Flex from '@components/Flex';

import LogoPic from '@public/img/Logo.svg';
import LogoPicWhite from '@public/img/Logo-white.svg';


const Header = ({ children, lang = 'ru' }) => {
    const themeContext = useContext(ThemeContext);
    const [boundHeight, setBoundHeight] = useState(800);

    useEffect(() => {
        requestAnimationFrame(() => {
            setBoundHeight(window.innerHeight);
        });
    }, []);

    return (
        <PageHeader boundHeight={boundHeight}>
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
                                    height={32}
                                    width={81}
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
