import { h, Component } from 'preact';
import styled from 'styled-components';

import Button from '../../components/Button';

import { translations } from './translations';

import Close from '../../components/IconSVG/Close';

import { Flex } from '../../styles/components';

const StyledBox = styled.div`
    padding: 32px 24px 16px;
    position: relative;
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

const CloseButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
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
            isInfoHidden: !isInfoHidden
        });
    };

    hideInfo = () => {
        if(this.props.onClose) {
            this.props.onClose();
        }
    };
    render() {
        const { lang = 'ru' } = this.props;

        return (
            <StyledBox>
                <CloseButton>
                    <Button
                        _rounded
                        _transparent
                        type="button"
                        onClick={this.hideInfo}>
                        <Close _middle />
                    </Button>
                </CloseButton>
                {!this.state.isInfoHidden ? (
                    <div>
                        {this.props.unfoldedContent}
                        <Flex justify="flex-end">
                            <Button
                                _flat
                                _transparent
                                type="button"
                                margin="8px 8px"
                                onClick={this.toggleInfo}>
                                {translations[lang].HIDE}{' '}
                            </Button>
                        </Flex>
                    </div>
                ) : (
                    <div>
                        <Flex justify="space-between">
                            {this.props.foldedContent}
                            <Flex justify="flex-end" width="30%">
                                <Button
                                    _flat
                                    _transparent
                                    type="button"
                                    margin="8px 8px"
                                    onClick={this.toggleInfo}>
                                    {translations[lang].SHOW}{' '}
                                </Button>
                            </Flex>
                        </Flex>
                    </div>
                )}
            </StyledBox>
        );
    }
}
