import { h, Component } from 'preact';
import styled from 'styled-components';

import Button from '../../components/Button';

import { translations } from './translations';

import { Flex } from '../../styles/components';

const StyledBox = styled.div`
    padding: 16px 24px 8px;
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
        margin: 0 0 32px;
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
            isInfoHidden: !isInfoHidden
        });
    };

    hideInfo = () => {
        if(this.props.onClose) {
            this.props.onClose();
        }
    };
    render() {
        const { lang = 'ru', foldedContent, unfoldedContent } = this.props;

        return (
            <StyledBox>
                <div>
                    {this.state.isInfoHidden
                        ? foldedContent
                        : unfoldedContent}
                    <Flex justify="flex-end">
                        <Button
                            _flat
                            _transparent
                            type="button"
                            margin="8px 8px 0"
                            onClick={this.hideInfo}>
                            {translations[lang].CLOSE}{' '}
                        </Button>
                        {this.state.isInfoHidden ? (
                            <Button
                                _flat
                                _transparent
                                type="button"
                                margin="8px 0 0 8px"
                                onClick={this.toggleInfo}>
                                {translations[lang].SHOW}{' '}
                            </Button>
                        ) : (
                            <Button
                                _flat
                                _transparent
                                type="button"
                                margin="8px 0 0 8px"
                                onClick={this.toggleInfo}>
                                {translations[lang].HIDE}{' '}
                            </Button>
                        )}
                    </Flex>
                </div>
            </StyledBox>
        );
    }
}
