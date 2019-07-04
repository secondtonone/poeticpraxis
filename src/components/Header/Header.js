import React, { Component } from 'react';
import { PageHeader, ContentField, Logo, Block } from './styled';
import { LogoLink } from '../../styles/components';
import { isTouchDevice } from '../../utils';

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
        const { children, variant } = this.props;
        const { actualHeight, initHeight } = this.state;
        return (
            <PageHeader hidden={isTouchDevice() && actualHeight < initHeight}>
                <Block>
                    <LogoLink to="/">
                        <Logo
                            src={variant === 'light' ? LogoPic : LogoPicWhite}
                            alt="Logo"
                            height="32"
                        />
                    </LogoLink>
                </Block>
                <ContentField>{children}</ContentField>
            </PageHeader>
        );
    }
}
