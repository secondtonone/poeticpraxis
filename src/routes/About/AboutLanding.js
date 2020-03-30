import { h } from 'preact';

import Button from '@components/Button';
import Logo from '@components/Logo';
import Flex from '@components/Flex';

import {
    Text,
    PrimaryTitle,
    LandingContainer,
    TextAccent,
    DesctopHiddenContainer,
    BetaSign,
    Container,
    TriangleButton,
    PrimaryColor
} from '@styles/components';

const innerHeight = window.innerHeight;

const reavelButtonHandler = () => {
    window.scrollTo({
        top: innerHeight,
        behavior: 'smooth'
    });
};

const AboutLanding = ({ lang = 'ru', mediaQuery }) => {
    const isRusLang = lang === 'ru';

    return (
        <LandingContainer>
            <Flex direction="column" height={`${innerHeight}px`}>
                <DesctopHiddenContainer>
                    <Flex direction="column" margin="16px 0 0">
                        <BetaSign>
                            <Logo height={36} />
                        </BetaSign>
                    </Flex>
                </DesctopHiddenContainer>
                <Flex direction="column" justify="space-evenly">
                    <PrimaryTitle
                        as="h1"
                        multiplyer="2"
                        size={mediaQuery ? 60 : 128}
                        weight={400}
                        mb={mediaQuery ? 0 : 64}
                        lineHeight={0.5}
                        align="center">
                        {isRusLang ? (
                            <span>
                                ЧТО СКРЫТО {mediaQuery ? <br /> : null} ЗА{' '}
                                <br />
                                <TextAccent>СЛОВАМИ?</TextAccent>
                            </span>
                        ) : (
                            <span>
                                WHAT IS HIDDEN <br /> BEHIND <br />{' '}
                                <TextAccent>THE WORDS?</TextAccent>
                            </span>
                        )}
                    </PrimaryTitle>
                    <Flex direction="column" height="auto">
                        <TriangleButton as="div">&#9653;</TriangleButton>
                        <Container
                            position="absolute"
                            height="auto"
                            width="auto">
                            <Button
                                _action
                                _transparent
                                width="200px"
                                size={16}
                                padding="0 0 8px 0"
                                type="button"
                                onClick={reavelButtonHandler}>
                                <PrimaryColor>
                                    {isRusLang ? `Явить сейчас` : `Reveal now`}
                                </PrimaryColor>
                            </Button>
                        </Container>
                    </Flex>
                </Flex>
            </Flex>
        </LandingContainer>
    );
};

export default AboutLanding;
