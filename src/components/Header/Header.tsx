import { h, FunctionalComponent } from 'preact';
import { useLayoutEffect, useState } from 'preact/compat';

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
import Langs from '@typings/Langs';
import ThemeVariants from '@typings/ThemeVariants';

interface HeaderProps {
    lang?: Langs
    variant: ThemeVariants
}

const Header: FunctionalComponent<HeaderProps> = ({ children, lang = 'ru', variant }) => {
    const [boundHeight, setBoundHeight] = useState<number>(800);

    useLayoutEffect(() => {
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
                                        variant === 'light'
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
