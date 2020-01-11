import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import examples from './examples';
import { scrollToAnchor, maxMatchMedia, getDaysFromNow } from '../../utils';

import Workfield from '../../components/Workfield';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

import {
    Text,
    Link,
    Footer,
    Flex,
    LandingContainer,
    TextAccent,
    Container,
    Strong,
    TextMinor,
    DesctopHiddenContainer,
    BetaSign
} from '../../styles/components';

export default class About extends Component {
    state = { isHiddenPayment: false, innerWidth: window.innerWidth };

    changeTitle = () => {
        document.title = `POETIC PRAXIS | ${
            this.props.lang === 'ru' ? 'ГЛАВНАЯ' : 'HOME'
        }`;
    };
    componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) {
            this.changeTitle();
        }
    }
    componentDidMount() {
        this.changeTitle();

        window.scrollTo(0, 0);

        scrollToAnchor();

        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        if (window.innerWidth !== this.state.innerWidth) {
            this.setState({
                innerWidth: window.innerWidth
            });
        }
    };

    togglePayment = () => {
        this.setState({
            isHiddenPayment: !this.state.isHiddenPayment
        });
    };

    scrollToBlock = (top) => {
        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    };

    reavelButtonHandler = () => {
        this.scrollToBlock(window.innerHeight - 100);
    };

    render() {
        const { lang = 'ru', variant = 'light' } = this.props;
        const { isHiddenPayment } = this.state;
        const isRusLang = lang === 'ru';
        const screenHeight = window.innerHeight;
        const mediaQuery = maxMatchMedia(800);

        const { text, stringsDictionary } = examples[lang];

        return (
            <section>
                <LandingContainer>
                    <Flex direction="column" height={`${screenHeight}px`}>
                        <DesctopHiddenContainer>
                            <Flex direction="column" margin="16px 0 0">
                                <BetaSign>
                                    <Logo height={36} />
                                </BetaSign>
                            </Flex>
                        </DesctopHiddenContainer>
                        <Flex direction="column">
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
                                onClick={this.reavelButtonHandler}>
                                {isRusLang ? `Явить сейчас` : `Reveal now`}
                            </Button>
                        </Flex>
                    </Flex>
                </LandingContainer>
                <Flex direction="column" margin="50px 0 0" id="images-engine">
                    <Flex
                        direction={mediaQuery ? 'column' : 'row'}
                        align="flex-start">
                        <Container
                            width={mediaQuery ? '100%' : '50%'}
                            padding={
                                maxMatchMedia(700)
                                    ? '0 50px 0'
                                    : '27px 50px 0 0'
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
                                maxMatchMedia(700)
                                    ? '50px 50px 0'
                                    : '0 0 0 50px'
                            }>
                            <Text isHidden={!isRusLang}>
                                Прием монтажа меняет порядок кадров, тем самым,
                                меняет и смысл повествования, то же и со
                                словами. "Машина образов" (изобретённая С. А.
                                Есениным) позволяет из любого набора слов
                                <TextMinor>(1)</TextMinor>, составлять случайные
                                пары<TextMinor>(2)</TextMinor>, получая
                                неожиданные образы<TextMinor>(3)</TextMinor>.
                            </Text>
                            <Text isHidden={isRusLang}>
                                Reception editing changes the order of frames,
                                thereby changing the meaning of the story, the
                                same with words. The “Machine of Images”
                                (invented by{' '}
                                <Link
                                    href="https://en.wikipedia.org/wiki/Sergei_Yesenin"
                                    target="_blank">
                                    S. A. Yesenin
                                </Link>
                                ) allows you to make random pairs{' '}
                                <TextMinor>(2)</TextMinor> from any set of words{' '}
                                <TextMinor>(1)</TextMinor>, resulting in
                                unexpected images <TextMinor>(3)</TextMinor>.
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
                                троица зеркала таблетка синь глубина алогизм
                                алтарь
                            </Text>
                            <Text isHidden={isRusLang} align="right">
                                constructor day background ligature water
                                reflection archetype trinity mirrors tablet blue
                                depth illogism altar
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
                                <Strong>алтарь день</Strong> <br /> вода
                                отражение <br />
                                фон вязь
                            </Text>
                            <Text isHidden={isRusLang} align="center">
                                <Strong>mirror depth</Strong> <br /> blue tablet{' '}
                                <br />
                                <Strong>constructor illogism</Strong> <br />
                                archetype trinity <br />
                                <Strong>altar day</Strong> <br /> water
                                reflection <br />
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
                                молчат немые <Strong>глубины зеркал</Strong>{' '}
                                <br /> собирают жизнь -{' '}
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
                                <Button
                                    _action--outlined
                                    width="200px"
                                    size={16}>
                                    {isRusLang ? `ПОПРОБОВАТЬ` : `Lets try`}
                                </Button>
                            </NavLink>
                        </Flex>
                    </Container>
                </Flex>

                <Flex direction="column" margin="150px 0 0" id="rhythmic">
                    <Container
                        width={mediaQuery ? '100%' : '70%'}
                        padding={mediaQuery ? '0 50px 0' : '9px 0 50px'}>
                        <Text
                            size={mediaQuery ? 64 : 128}
                            lineHeight={mediaQuery ? 0.5 : 0.4}
                            align={mediaQuery ? 'left' : 'right'}
                            spacing="-10">
                            {isRusLang ? (
                                <span>
                                    МУЗЫКА
                                    <br />
                                    <TextAccent>МЕЖДУ СТРОК</TextAccent>
                                </span>
                            ) : (
                                <span>
                                    MUSIC
                                    <br />
                                    <TextAccent>BETWEEN LINES</TextAccent>
                                </span>
                            )}
                        </Text>
                    </Container>
                    <Flex
                        direction={mediaQuery ? 'column' : 'row'}
                        align="flex-start">
                        <Container
                            width={mediaQuery ? '100%' : '500px'}
                            padding={
                                maxMatchMedia(700)
                                    ? '50px 50px 0'
                                    : '25px 50px 0 0'
                            }>
                            <Text
                                isHidden={!isRusLang}
                                align={mediaQuery ? 'left' : 'right'}>
                                Человеческая речь похожа на музыку. Но смысл
                                слов мешает нам её услышать. Это хорошо можно
                                понять, если послушать иностранную речь. А что
                                если звуки букв заменить музыкальными звуками.
                                Чтобы это узнать, продолжите обозначать
                                ритмичсекий рисунок стихотвроения и прослушайте:
                            </Text>
                            <Text isHidden={isRusLang} align="right">
                                Human speech is like a music. But the meaning of
                                the words prevents us from hearing it. This can
                                be well understood if you listen to a foreign
                                speech. But what if the sounds of letters are
                                replaced by musical sounds. To find out,
                                continue to outline the rhythmic pattern of the
                                poem and listen to:
                            </Text>
                        </Container>
                        <Container
                            width={mediaQuery ? '100%' : '500px'}
                            padding={
                                maxMatchMedia(700)
                                    ? '25px 50px 0'
                                    : '25px 0 0 50px'
                            }>
                            <Workfield
                                text={text}
                                stringsDictionary={stringsDictionary}
                                readOnly
                            />
                        </Container>
                    </Flex>
                    <Container padding="2% 0 0">
                        <Flex direction="column">
                            <NavLink to="/rhythmic?shared=%5B%22%D0%94%D1%83%D1%85%D0%BE%D0%B2%D0%BD%D0%BE%D0%B9%20%D0%B6%D0%B0%D0%B6%D0%B4%D0%BE%D1%8E%20%D1%82%D0%BE%D0%BC%D0%B8%D0%BC,%5Cn%D0%92%20%D0%BF%D1%83%D1%81%D1%82%D1%8B%D0%BD%D0%B5%20%D0%BC%D1%80%D0%B0%D1%87%D0%BD%D0%BE%D0%B9%20%D1%8F%20%D0%B2%D0%BB%D0%B0%D1%87%D0%B8%D0%BB%D1%81%D1%8F,%5Cn%D0%98%20%D1%88%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D1%80%D1%8B%D0%BB%D1%8B%D0%B9%20%D1%81%D0%B5%D1%80%D0%B0%D1%84%D0%B8%D0%BC%5Cn%D0%9D%D0%B0%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BF%D1%83%D1%82%D1%8C%D0%B5%20%D0%BC%D0%BD%D0%B5%20%D1%8F%D0%B2%D0%B8%D0%BB%D1%81%D1%8F%22,%220001000000100020000100%7C00000010000010000010000010000%7C000200000100000200010%7C00002000100000010001000%22%5D">
                                <Button
                                    _action--outlined
                                    width="200px"
                                    size={16}>
                                    {isRusLang ? `ПРОСЛУШАТЬ` : `Lets listen`}
                                </Button>
                            </NavLink>
                        </Flex>
                    </Container>
                </Flex>

                <Flex
                    direction="column"
                    margin="150px 0 0"
                    justify="flex-start">
                    <Container padding="9px 0 25px">
                        <Text
                            size={mediaQuery ? 64 : 128}
                            lineHeight="0.7"
                            align="center"
                            spacing="-10">
                            POETIC
                            <TextAccent>PRAXIS</TextAccent>
                        </Text>
                        <Text isHidden={!isRusLang} size={14} align="center">
                            проект, созданный чтобы узнать, что скрыто за
                            словами -
                            <br />
                            для поэтической практики.
                        </Text>
                        <Text isHidden={isRusLang} size={14} align="center">
                            the project created to find out what is hidden
                            behind words -
                            <br />
                            for poetic practice.
                        </Text>
                    </Container>
                    <Flex direction="column" justify="flex-start" height="100px">
                        {isRusLang ? 'Подписаться:' : 'Subscribe:'}
                        <Flex
                            direction={mediaQuery ? 'column' : 'row'}
                            justify="space-evenly"
                            width="300px">
                            {isRusLang && (
                                <Link
                                    target="_blank"
                                    href="tg://resolve?domain=poeticpraxis">
                                    TELEGRAM
                                </Link>
                            )}
                            {isRusLang && (
                                <Link
                                    target="_blank"
                                    href="https://vk.com/poeticpraxis">
                                    ВКОНТАКТЕ
                                </Link>
                            )}
                            {!isRusLang && (
                                <Link
                                    target="_blank"
                                    href="https://www.reddit.com/r/poeticpraxis/">
                                    REDDIT
                                </Link>
                            )}
                        </Flex>
                    </Flex>
                    {isRusLang && (
                        <Button
                            _action--outlined
                            width="300px"
                            size={16}
                            type="button"
                            margin="24px 0"
                            onClick={this.togglePayment}>
                            {!isHiddenPayment
                                ? 'поддержать проект'
                                : 'В следующий раз 😅'}
                        </Button>
                    )}
                    <br />
                    <Text isHidden={!isHiddenPayment}>
                        <iframe
                            src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0&targets-hint=&default-sum=2&button-text=11&payment-type-choice=on&hint=&successURL=&quickpay=shop&account=410014951905022"
                            width="300"
                            height="220"
                            frameBorder="0"
                            allowtransparency="true"
                            scrolling="no"
                        />
                    </Text>
                </Flex>

                <Footer>
                    &copy; POETIC PRAXIS {getDaysFromNow(new Date(2016, 4, 25))}{' '}
                    {lang === 'ru' ? 'день' : 'day'}
                    {mediaQuery && <br />}
                    {' ▴ '}
                    {mediaQuery && <br />}
                    <Link href="mailto:thearchitect@poeticpraxis.ru">
                        {isRusLang
                            ? 'Жалобы и предложения'
                            : 'Complaints and suggestions'}
                    </Link>{' '}
                </Footer>
            </section>
        );
    }
}
