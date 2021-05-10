import { h } from 'preact';
import { useCallback } from 'preact/compat';

import TriangleButton from '@components/TriangleButton';
import Logo from '@components/Logo';
import Flex from '@components/Flex';
import Text from '@components/Text';

import {
    LandingContainer,
    TextAccent,
    DesktopHiddenContainer,
    BetaSign,
    TextConstructor,
} from '@styles/components';

import theme from '@styles/theme';

const AboutLanding = ({ lang = 'ru', mediaQuery, boundHeight, variant }) => {
    const isRusLang = lang === 'ru';

    const revealButtonHandler = useCallback(() => {
        window.scrollTo({
            top: boundHeight + 32,
            behavior: 'smooth',
        });
    }, [boundHeight]);

    return (
        <LandingContainer>
            <Flex direction="column" height={`${boundHeight}px`}>
                <DesktopHiddenContainer>
                    <Flex direction="column" margin="16px 0 0">
                        <BetaSign>
                            <Logo height={36} width={92} />
                        </BetaSign>
                    </Flex>
                </DesktopHiddenContainer>
                <Flex direction="column" justify="space-evenly">
                    <Text
                        as="h1"
                        size={mediaQuery ? 60 : 128}
                        weight={400}
                        mb={mediaQuery ? 0 : 64}
                        lineHeight={0.5}
                        align="center">
                        {isRusLang ? (
                            <TextConstructor word="40">
                                <TextConstructor letter="-18">
                                    ЧТО
                                </TextConstructor>{' '}
                                <TextConstructor letter="-18">
                                    СКРЫТО
                                </TextConstructor>{' '}
                                {mediaQuery ? <br /> : null}{' '}
                                <TextConstructor letter="-18">
                                    ЗА
                                </TextConstructor>{' '}
                                <br />
                                <TextAccent>
                                    С
                                    <TextConstructor letter="-18">
                                        ЛОВАМИ?
                                    </TextConstructor>
                                </TextAccent>
                            </TextConstructor>
                        ) : (
                            <TextConstructor>
                                WHAT IS HIDDEN <br /> BEHIND <br />{' '}
                                <TextAccent>THE WORDS?</TextAccent>
                            </TextConstructor>
                        )}
                    </Text>
                    <Flex direction="column" height="auto">
                        <TriangleButton
                            width="200px"
                            size={16}
                            padding="0 0 8px 0"
                            type="button"
                            color={theme[variant].accentColor}
                            onClick={revealButtonHandler}>
                            {isRusLang ? `Явить сейчас` : `Reveal now`}
                        </TriangleButton>
                    </Flex>
                </Flex>
            </Flex>
        </LandingContainer>
    );
};

export default AboutLanding;
