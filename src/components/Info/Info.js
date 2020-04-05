import { h } from 'preact';
import { useState, useCallback } from 'preact/compat';
import styled from 'styled-components';

import Button from '@components/Button';

import { translations } from './translations';

import Container from '@components/Container';
import Flex from '@components/Flex';

const StyledBox = styled(Flex)`
    padding: 16px 24px 8px;
    position: relative;
    text-align: left;
    color: ${(props) => props.theme.secondColor};
    background-color: ${(props) => props.theme.lightGray};
    font-size: 14px;
    margin: 0 auto 32px;
    font-weight: 300;
    line-height: 28px;
    max-width: 666px;

    @media (max-width: 600px) {
        margin: 0 0 32px;
        line-height: 1.6;
        flex-direction: column;
    }
`;
const Info = ({ lang = 'ru', foldedContent, unfoldedContent, onClose }) => {
    const [isInfoHidden, setVisibility] = useState(true);

    const toggleInfo = useCallback(() => {
        setVisibility(!isInfoHidden);
    }, [isInfoHidden]);

    const hideInfo = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    return (
        <StyledBox
            justify="stretch"
            direction={isInfoHidden ? 'row' : 'column'}>
            <Container minWidth="300px" margin="0 0 8px 0">
                {isInfoHidden ? foldedContent : unfoldedContent}
            </Container>
            <Flex justify="flex-end" minWidth="300px">
                <Button
                    _flat
                    _transparent
                    type="button"
                    margin="0 8px 0"
                    onClick={hideInfo}>
                    {translations[lang].CLOSE}{' '}
                </Button>
                {isInfoHidden ? (
                    <Button
                        _flat
                        _transparent
                        type="button"
                        onClick={toggleInfo}>
                        {translations[lang].SHOW}{' '}
                    </Button>
                ) : (
                    <Button
                        _flat
                        _transparent
                        type="button"
                        onClick={toggleInfo}>
                        {translations[lang].HIDE}{' '}
                    </Button>
                )}
            </Flex>
        </StyledBox>
    );
};

export default Info;
