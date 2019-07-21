import React, { Component } from 'react';
import { PageHeader, ContentField, Logo, Block } from './styled';
import {
    LogoLink,
    HoveredElement,
    ShowOnHover,
    HideOnHover,
    Flex
} from '../../styles/components';
import { isTouchDevice } from '../../utils';
import { translations } from './translations';

import LogoPic from '../../../public/img/Logo.svg';
import LogoPicWhite from '../../../public/img/Logo-white.svg';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actualHeight: window.innerHeight,
            initHeight: window.innerHeight
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({
            actualHeight: window.innerHeight
        });
    };

    render() {
        const { children, variant, lang = 'ru' } = this.props;
        const { actualHeight, initHeight } = this.state;
        return (
            <PageHeader hidden={isTouchDevice() && actualHeight < initHeight}>
                <HoveredElement>
                    <Block>
                        <LogoLink to="/">
                            <HideOnHover>
                                <Logo
                                    src={
                                        variant === 'light'
                                            ? LogoPic
                                            : LogoPicWhite
                                    }
                                    alt="Logo"
                                    height="32"
                                />
                            </HideOnHover>
                            <ShowOnHover>
                                <Flex height="32">{translations[lang].menu['ABOUT']}</Flex>
                            </ShowOnHover>
                        </LogoLink>
                    </Block>
                </HoveredElement>
                <ContentField>{children}</ContentField>
            </PageHeader>
        );
    }
}
