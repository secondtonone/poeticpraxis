import React, { Component } from 'react';

import examples from './examples';
import { scrollToAnchor, maxMatchMedia } from '../../utils';

import Workfield from '../../components/Workfield';
import Button from '../../components/Button';
import SecondaryMenu from '../../components/SecondaryMenu';
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
    DesctopHiddenContainer
} from '../../styles/components';

export default class About extends Component {
    state = { isHiddenPayment: false, innerWidth: window.innerWidth };

    componentDidMount() {
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
                    <Flex direction="column" height={screenHeight}>
                        <DesctopHiddenContainer>
                            <Flex direction="column" margin="16px 0 0">
                                <Logo height={36} />
                            </Flex>
                        </DesctopHiddenContainer>
                        <Flex direction="column">
                            <Text
                                size={mediaQuery ? 60 : 128}
                                weight={400}
                                mb={64}
                                lineHeight={mediaQuery ? 0.7 : 0.4}
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
                                onClick={() => {
                                    this.scrollToBlock(screenHeight - 100);
                                }}>
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
                                lineHeight={mediaQuery ? 0.7 : 0.4}
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
                            <Button
                                _action--outlined
                                width="200px"
                                size={16}
                                target="_blank"
                                href="/images-engine"
                                as="a">
                                {isRusLang ? `ПОПРОБОВАТЬ` : `Lets try`}
                            </Button>
                        </Flex>
                    </Container>
                </Flex>

                <Flex direction="column" margin="150px 0 0" id="rhythmic">
                    <Container
                        width={mediaQuery ? '100%' : '70%'}
                        padding={mediaQuery ? '0 50px 0' : '9px 0 50px'}>
                        <Text
                            size={mediaQuery ? 64 : 128}
                            lineHeight={mediaQuery ? 0.7 : 0.4}
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
                            <Button
                                _action--outlined
                                width="200px"
                                size={16}
                                target="_blank"
                                href="/rhythmic?shared=%5B%22%D0%94%D1%83%D1%85%D0%BE%D0%B2%D0%BD%D0%BE%D0%B9%20%D0%B6%D0%B0%D0%B6%D0%B4%D0%BE%D1%8E%20%D1%82%D0%BE%D0%BC%D0%B8%D0%BC,%5Cn%D0%92%20%D0%BF%D1%83%D1%81%D1%82%D1%8B%D0%BD%D0%B5%20%D0%BC%D1%80%D0%B0%D1%87%D0%BD%D0%BE%D0%B9%20%D1%8F%20%D0%B2%D0%BB%D0%B0%D1%87%D0%B8%D0%BB%D1%81%D1%8F,%5Cn%D0%98%20%D1%88%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D1%80%D1%8B%D0%BB%D1%8B%D0%B9%20%D1%81%D0%B5%D1%80%D0%B0%D1%84%D0%B8%D0%BC%5Cn%D0%9D%D0%B0%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BF%D1%83%D1%82%D1%8C%D0%B5%20%D0%BC%D0%BD%D0%B5%20%D1%8F%D0%B2%D0%B8%D0%BB%D1%81%D1%8F%22,%220001000000100020000100%7C00000010000010000010000010000%7C000200000100000200010%7C00002000100000010001000%22%5D"
                                as="a">
                                {isRusLang ? `ПРОСЛУШАТЬ` : `Lets listen`}
                            </Button>
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
                    <Flex direction="column" justify="flex-start" height="100">
                        {isRusLang ? 'Подписаться:' : 'Subscribe:'}
                        <Flex
                            direction={mediaQuery ? 'column' : 'row'}
                            justify="space-evenly"
                            width="300">
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
                    &copy; 2016 - {new Date().getFullYear()} POETIC PRAXIS
                    {' ▴ '}
                    <Link href="mailto:thearchitect@poeticpraxis.ru">
                        {isRusLang
                            ? `Помощь и предложения`
                            : `Help and suggestions`}
                    </Link>{' '}
                </Footer>
            </section>
        );
    }
}

/* <List _animated>
    <Text.Title>ЧТО СКРЫТО ЗА СЛОВАМИ?</Text.Title>
    <Text isHidden={!isRusLang}>
        POETIC PRAXIS{' '}
        <Span textTransform="uppercase">
            (Ποιητικός Πράξις)
        </Span>{' '}
        - проект, созданный как раз для того чтобы это узнать,
        для поэтической практики.
    </Text>
    <Text isHidden={isRusLang}>
        It's a project, made for poetic practice.
    </Text>
    <Text isHidden={isRusLang}>
        On Reddit:{' '}
        <Link
            target="_blank"
            href="https://www.reddit.com/r/poeticpraxis/">
            r/poeticpraxis
        </Link>
    </Text>
    <Text isHidden={!isRusLang}>
        Блог в Яндекс Дзен:{' '}
        <Link
            target="_blank"
            href="https://zen.yandex.ru/id/5acdd7635991d30775549af1">
            Поэтическая практика
        </Link>
        <br />
        Канал проекта в Telegram:{' '}
        <Link target="_blank" href="https://t.me/poeticpraxis">
            @poeticpraxis
        </Link>
        <br />
        Сообщество в VK:{' '}
        <Link
            target="_blank"
            href="https://vk.com/poeticpraxis">
            vk.com/poeticpraxis
        </Link>
        <br />
        <Button
            _flat
            type="button"
            margin="16px 0"
            onClick={this.togglePayment}>
            {!isHiddenPayment
                ? 'поддержать проект'
                : 'В следующий раз 😅'}
        </Button>
        <br />
        {isHiddenPayment && (
            <Text>
                <iframe
                    src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0&targets-hint=&default-sum=2&button-text=11&payment-type-choice=on&hint=&successURL=&quickpay=shop&account=410014951905022"
                    width="300"
                    height="220"
                    frameBorder="0"
                    allowtransparency="true"
                    scrolling="no"
                />
            </Text>
        )}
    </Text>
    <Text.Title id="images-engine">
        {isRusLang
            ? 'Машина образов или прием монтажа'
            : 'Images engine or montage method'}
    </Text.Title>
    <Text isHidden={!isRusLang}>
        Новые технологии дарят нам новые возможности и
        инструменты. "Машина образов", изобретённая С. А.
        Есениным, позволяет из любого набора слов, составлять
        случайные пары, получая неожиданные образы. Для лучшего
        результата, нужно использовать существиетльные и
        приглагательные. Вообще можно использовать всё кроме
        глаголов, но если вы хотите использовать и их, то никто
        мешать конечно же не будет. Что если попробовать
        получить новые сочетания не из простого набора слов, а
        из подготовленного материала: случайной статьи,
        переписки, отрывка из книги, а может даже из
        стихотворений? А из нескольких? Или слов ваших друзей.
        Смешивая ваши нарративы, вам стоит узнать, что из этого
        выйдет. Без бумаги и ножниц. Быстро и сколько угодно. 
        "Машина образов", изобретённая С. А. Есениным, позволяет
        из любого набора слов, составлять случайные пары,
        получая неожиданные образы. Как её использовать?
    </Text>
    <Text isHidden={!isRusLang}>
        <SimplList>
            <SimplList.Item>
                1. Введите слова, которые приходят вам на ум или
                вашим друзьям (лучше существиетльные и
                приглагательные). Возможен и голосовой ввод по
                кнопке{' '}
                <Button _rounded _transparent type="button">
                    <MicIcon _small />
                </Button>
                .
            </SimplList.Item>
            <SimplList.Item>
                2. Нажмите на кнопку{' '}
                <Button _rounded _transparent type="button">
                    <Widgets _small />
                </Button>
                .
            </SimplList.Item>
            <SimplList.Item>
                3. Выберите из списка сочетания, которые вам
                понравились.
            </SimplList.Item>
            <SimplList.Item>
                4. Выбранные можно сразу же редактировать,
                дополняя их своими мыслями.
            </SimplList.Item>
            <SimplList.Item>
                5. Повторите п. 2, чтобы получить новые
                сочетания, уже выбранные вами сочетания
                сохраняются.
            </SimplList.Item>
        </SimplList>
    </Text>
    <Text isHidden={isRusLang}>
        New technologies give us new possibilities and
        instruments. "Images engine", created by russian poet{' '}
        <Link
            target="_blank"
            href="https://en.wikipedia.org/wiki/Sergei_Yesenin">
            S.A. Yesenin
        </Link>{' '}
        , make from any words random pairs. It gives us
        intresting images. For best result better use noun and
        adjective. You can try not only words. You can do it
        with random texts, articles, excerpts from books, poems
        or with your friends. Without paper and scissors.
    </Text>
    <Text isHidden={!isRusLang}>
        Работает она очень просто. Напишите слова или вставьте
        текст на странице{' '}
        <Link target="_blank" href="/images-engine">
            МАШИНА ОБРАЗОВ
        </Link>{' '}
        и нажмите на кнопку{' '}
        <Button _rounded _transparent type="button">
            <Widgets _small />
        </Button>
        . После этого будут составлены сочетания слов из которых
        вы выбираете интересные вам и не очень. Можно
        сгенерировать новые сочетания нажимая на ту же кнопку,
        они заменят предыдущие, но выбранные вами останутся.
    </Text>
    <Text isHidden={isRusLang}>
        How it works? Write words or paste text on the page{' '}
        <Link target="_blank" href="/images-engine">
            IMAGES ENGINE
        </Link>{' '}
        and push{' '}
        <Button _rounded _transparent type="button">
            <Widgets _small />
        </Button>
        button. After, you see pairs of words. You can add
        intresting pairs to favorites. You can try again get
        another pairs, but pairs in favorites will be stayed.
    </Text>}
    <Text isHidden={!isRusLang}>
        Все выбранные сочетания можно перенести в раздел{' '}
        <Link target="_blank" href="/rhythmic">
            ПРОСОДИЯ
        </Link>
        , нажимая на{' '}
        <Button _flat _transparent type="button">
            Посмотреть ритм <ArrowBack _small _rotate-left />
        </Button>{' '}
        или скопировать их.
    </Text>
    <Text isHidden={isRusLang}>
        All favorite pairs you can transpose in{' '}
        <Link target="_blank" href="/rhythmic">
            PROSODY
        </Link>
        , by{' '}
        <Button _flat _transparent type="button">
            See rhythm <ArrowBack _small _rotate-left />
        </Button>{' '}
        button, to see their rhythm.
    </Text>
    <Text.Title id="rhythmic">
        {isRusLang ? 'Музыка слов' : 'Music of words'}
    </Text.Title>
    <Text isHidden={!isRusLang}>
        Ритм стихотворения - немаловажный аспект. Но ритм
        существует не только в стихах, его можно встретить и в
        ритмической прозе. На странице{' '}
        <Link target="_blank" href="/rhythmic">
            ПРОСОДИЯ
        </Link>{' '}
        можно исследовать текст. Редактор обозначает гласные
        буквы, но исследователь сам ставит акценты нажатием на
        букву. Попробуйте продолжить ниже:
    </Text>
    <Text isHidden={isRusLang}>
        Rhythm in poetry - non-trivial aspect. On the page{' '}
        <Link target="_blank" href="/rhythmic">
            PROSODY
        </Link>{' '}
        you can research text. Editor marks syllables, but
        researcher marks stressed syllables yourself by clicking
        on letters. Try to continue it below:
    </Text>
    <Text.Wrapper>
        <Workfield
            text={text}
            stringsDictionary={stringsDictionary}
            readOnly
        />
    </Text.Wrapper>
    <Text isHidden={!isRusLang}>
        Редактор запоминает ударения только на одном и том же
        устройстве. В знакомых словах он сам будет обзаначать
        их. Показывает справа от строки количество в ней
        акцентных слогов на количество слогов в общем. Есть
        возможность расставлять паузы кнопкой{' '}
        <Button _rounded _transparent type="button">
            <KeyboardCapslock _small />
        </Button>
        .
    </Text>
    <Text isHidden={isRusLang}>
        Editor memorizes stressed syllables but only on one
        device. In known words it will be marking syllables
        itself. You can make pause or caesura by{' '}
        <Button _rounded _transparent type="button">
            <KeyboardCapslock _small />
        </Button>{' '}
        button.
    </Text>
    <Text isHidden={!isRusLang}>
        Полученную ритмическую картину можно перенести в
        текстовый редактор (Google Docs, Microsoft Word и т.д.)
        кнопкой{' '}
        <Button _rounded _transparent type="button">
            <ContentCopy _small />
        </Button>
        .
    </Text>
    <Text isHidden={isRusLang}>
        Ready rhythmic picture can be copied to text editors
        (Google Docs, MS Word and etc.) by{' '}
        <Button _rounded _transparent type="button">
            <ContentCopy _small />
        </Button>
        button.
    </Text>
    <Text isHidden={!isRusLang}>
        Это лишь инструмент в познании и творчестве. За вас он
        ничего не сделает. Однако это хорошее подспорье.
    </Text>
    <Text isHidden={isRusLang}>
        It doesn't do all the work for you. It is just
        instrument in your researching, for your creation.
    </Text>
    <Text.Title>
        {isRusLang ? 'Что дальше?' : 'So, what next?'}
    </Text.Title>
    <Text isHidden={!isRusLang}>
        К инструментам время от времени добавляются новые
        функции, которые открывают новые возможности. Исследуйте
        и творите!
    </Text>
    <Text isHidden={isRusLang}>
        Sometimes, instruments are getting new features, that
        give new opportunities. Just go research and create!
    </Text>
    <Footer>
        &copy;{' '}
        <Link href="mailto:thearchitect@poeticpraxis.ru">
            Макс А. Ю.
        </Link>{' '}
        2016 - {new Date().getFullYear()}
    </Footer>
</List> */
