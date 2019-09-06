import React, { Component } from 'react';

import { PageHeader, ContentField, Logo, Block } from './styled';
import {
    HoveredElement,
    ShowOnHover,
    HideOnHover,
    Flex
} from '../../styles/components';
import { isTouchDevice } from '../../utils';
import { translations } from './translations';

import RouteLink from '../RouteLink';

import LogoPic from '../../../public/img/Logo.svg';
import LogoPicWhite from '../../../public/img/Logo-white.svg';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actualHeight: window.innerHeight,
            initHeight: window.innerHeight,
            headerZIndex: 1001
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

    toggleHeaderZIndex = () => {
        this.setState({
            headerZIndex: this.state.headerZIndex === 1001 ? 2009 : 1001
        });
    };

    render() {
        const { children, variant, lang = 'ru' } = this.props;
        const { actualHeight, initHeight, headerZIndex } = this.state;
        return (
            <PageHeader
                hidden={isTouchDevice() && actualHeight < initHeight}
                zIndex={headerZIndex}>
                <HoveredElement>
                    <Block>
                        <RouteLink to="/" exact>
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
                                <Flex height="32">
                                    {translations[lang].menu['ABOUT']}
                                </Flex>
                            </ShowOnHover>
                        </RouteLink>
                    </Block>
                </HoveredElement>
                <ContentField>
                    {children({ toggleHeaderZIndex: this.toggleHeaderZIndex })}
                </ContentField>
            </PageHeader>
        );
    }
}
