import { h } from 'preact';

import { NavLink } from 'react-router-dom';

import { maxMatchMedia } from '../../utils';

import Button from '../../components/Button';

import {
    Text,
    Link,
    Flex,
    TextAccent,
    Container,
    Strong,
    TextMinor,
} from '../../styles/components';

const AboutEngine = ({ lang = 'ru', mediaQuery }) => {
    const isRusLang = lang === 'ru';

    return (
        <section>
            <Flex direction="column" margin="50px 0 0" id="images-engine">
                <Flex
                    direction={mediaQuery ? 'column' : 'row'}
                    align="flex-start">
                    <Container
                        width={mediaQuery ? '100%' : '50%'}
                        padding={
                            maxMatchMedia(700) ? '0 50px 0' : '27px 50px 0 0'
                        }>
                        <Text
                            size={mediaQuery ? 64 : 128}
                            lineHeight={mediaQuery ? 0.5 : 0.4}
                            align={mediaQuery ? 'left' : 'right'}
                            spacing="-10">
                            {isRusLang ? (
                                <span>
                                    НОВЫЕ
                                    <br />
                                    <TextAccent>ИДЕИ</TextAccent>
                                </span>
                            ) : (
                                <span>
                                    NEW
                                    <br />
                                    <TextAccent>IDEAS</TextAccent>
                                </span>
                            )}
                        </Text>
                    </Container>
                    <Container
                        width={mediaQuery ? '100%' : '500px'}
                        padding={
                            maxMatchMedia(700) ? '50px 50px 0' : '0 0 0 50px'
                        }>
                        <Text isHidden={!isRusLang}>
                            Прием монтажа меняет порядок кадров, тем самым,
                            меняет и смысл повествования, то же и со словами.
                            "Машина образов" (изобретённая С. А. Есениным)
                            позволяет из любого набора слов
                            <TextMinor>(1)</TextMinor>, составлять случайные
                            пары<TextMinor>(2)</TextMinor>, получая неожиданные
                            образы<TextMinor>(3)</TextMinor>.
                        </Text>
                        <Text isHidden={isRusLang}>
                            Reception editing changes the order of frames,
                            thereby changing the meaning of the story, the same
                            with words. The “Machine of Images” (invented by{' '}
                            <Link
                                href="https://en.wikipedia.org/wiki/Sergei_Yesenin"
                                rel="noreferrer noopener"
                                target="_blank">
                                S. A. Yesenin
                            </Link>
                            ) allows you to make random pairs{' '}
                            <TextMinor>(2)</TextMinor> from any set of words{' '}
                            <TextMinor>(1)</TextMinor>, resulting in unexpected
                            images <TextMinor>(3)</TextMinor>.
                        </Text>
                    </Container>
                </Flex>
                <Flex
                    direction={mediaQuery ? 'column' : 'row'}
                    align="flex-start">
                    <Container
                        padding={mediaQuery ? '25px 50px 0' : '5% 2% 0'}
                        width={mediaQuery ? '100%' : '33%'}>
                        <Container
                            position="absolute"
                            right="5%"
                            top="-2%"
                            width="auto"
                            zIndex="-1">
                            <Text size={96} align="right">
                                <TextMinor>1</TextMinor>
                            </Text>
                        </Container>
                        <Text isHidden={!isRusLang} align="right">
                            конструктор день фон вязь вода отражение архитип
                            троица зеркала таблетка синь глубина алогизм алтарь
                        </Text>
                        <Text isHidden={isRusLang} align="right">
                            constructor day background ligature water reflection
                            archetype trinity mirrors tablet blue depth illogism
                            altar
                        </Text>
                    </Container>
                    <Container
                        padding={mediaQuery ? '25px 50px 0' : '5% 2% 0'}
                        width={mediaQuery ? '100%' : '33%'}>
                        <Container
                            position="absolute"
                            top="-2%"
                            width="auto"
                            left="0"
                            right="0"
                            zIndex="-1">
                            <Text size={96} align="center">
                                <TextMinor>2</TextMinor>
                            </Text>
                        </Container>
                        <Text isHidden={!isRusLang} align="center">
                            <Strong>глубина зеркала</Strong> <br /> таблетка
                            синь <br />
                            <Strong>конструктор алогизм</Strong> <br />
                            архитип троица <br />
                            <Strong>алтарь день</Strong> <br /> вода отражение{' '}
                            <br />
                            фон вязь
                        </Text>
                        <Text isHidden={isRusLang} align="center">
                            <Strong>mirror depth</Strong> <br /> blue tablet{' '}
                            <br />
                            <Strong>constructor illogism</Strong> <br />
                            archetype trinity <br />
                            <Strong>altar day</Strong> <br /> water reflection{' '}
                            <br />
                            background ligature
                        </Text>
                    </Container>
                    <Container
                        padding={mediaQuery ? '25px 50px 0' : '5% 2% 0'}
                        width={mediaQuery ? '100%' : '33%'}>
                        <Container
                            position="absolute"
                            left="5%"
                            top="-2%"
                            width="auto"
                            zIndex="-1">
                            <Text size={96} align="left">
                                <TextMinor>3</TextMinor>
                            </Text>
                        </Container>
                        <Text isHidden={!isRusLang}>
                            молчат немые <Strong>глубины зеркал</Strong> <br />{' '}
                            собирают жизнь -{' '}
                            <Strong>алогичный конструктор</Strong> <br /> в
                            жертву на <Strong>алтарь</Strong> прожорливого{' '}
                            <Strong>дня</Strong>
                        </Text>
                        <Text isHidden={isRusLang}>
                            silent <Strong>depths of mirrors</Strong> <br />{' '}
                            collect the life -{' '}
                            <Strong>illogical constructor</Strong> <br />
                            sacrificed on the <Strong>altar</Strong> of a
                            gluttonous <Strong>day</Strong>
                        </Text>
                    </Container>
                </Flex>
                <Container padding="5% 0 0">
                    <Flex direction="column">
                        <NavLink to="/images-engine">
                            <Button _action--outlined width="200px" size={16}>
                                {isRusLang ? `ПОПРОБОВАТЬ` : `Lets try`}
                            </Button>
                        </NavLink>
                    </Flex>
                </Container>
            </Flex>
        </section>
    );
};

export default AboutEngine;
