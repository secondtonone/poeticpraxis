import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';

import Close from '../../components/IconSVG/Close';
import InfoIcon from '../../components/IconSVG/Info';
import { translations } from './translations';

import { Flex } from '../../styles/components';

const StyledBox = styled.div`
    padding: 16px 24px;
    text-align: left;
    color: ${(props) => props.theme.secondColor};
    background-color: ${(props) => props.theme.lightGray};
    font-size: 14px;
    margin: 0 auto 32px;
    font-weight: 300;
    line-height: 28px;
    max-width: 730px;

    @media (max-width: 600px) {
        margin: 32px 0;
        line-height: 1.6;
    }
`;

export default class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInfoHidden: true
        };
    }
    toggleInfo = () => {
        let isInfoHidden = this.state.isInfoHidden;

        this.setState({
            isInfoHidden: isInfoHidden ? false : true
        });
    };
    render() {
        const { lang = 'ru' } = this.props;
        return (
            <div>
                {!this.state.isInfoHidden ? (
                    <StyledBox>
                        {this.props.unfoldedContent}
                        <Flex justify="flex-end">
                            <Button
                                _flat
                                _transparent
                                type="button"
                                margin="8px 8px"
                                onClick={this.toggleInfo}>
                                {translations[lang].CLOSE}{' '}
                                <Close _small padding="0 0 0 8px" />
                            </Button>
                        </Flex>
                    </StyledBox>
                ) : (
                    <StyledBox>
                        <Flex justify="space-between">
                            {this.props.foldedContent}
                            <Button
                                _flat
                                _transparent
                                type="button"
                                margin="8px 8px"
                                onClick={this.toggleInfo}>
                                {translations[lang].SHOW}{' '}
                                <InfoIcon _small padding="0 0 0 8px" />
                            </Button>
                        </Flex>
                    </StyledBox>
                )}
            </div>
        );
    }
}
