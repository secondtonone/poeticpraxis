import { h } from 'preact';

import Button from '@components/Button';
import Logo from '@components/Logo';

import {
    Text,
    Flex,
    LandingContainer,
    TextAccent,
    DesctopHiddenContainer,
    BetaSign
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
                    <Text
                        size={mediaQuery ? 60 : 128}
                        weight={400}
                        mb={64}
                        lineHeight={0.5}
                        align="center">
                        {isRusLang ? (
                            <span>
                                ЧТО СКРЫТО ЗА <br />
                                <TextAccent>СЛОВАМИ?</TextAccent>
                            </span>
                        ) : (
                            <span>
                                WHAT IS HIDDEN <br /> BEHIND <br />{' '}
                                <TextAccent>THE WORDS?</TextAccent>
                            </span>
                        )}
                    </Text>
                    <Button
                        _action
                        width="200px"
                        size={16}
                        type="button"
                        onClick={reavelButtonHandler}>
                        {isRusLang ? `Явить сейчас` : `Reveal now`}
                    </Button>
                </Flex>
            </Flex>
        </LandingContainer>
    );
};

export default AboutLanding;
