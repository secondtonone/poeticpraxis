import { h, Component } from 'preact';

import examples from './examples';

import Workfield from '../../components/Workfield';
import Button from '../../components/Button';
import SecondaryMenu from '../../components/SecondaryMenu';
import Settings from '../../components/Settings';

import ArrowBack from '../../components/IconSVG/ArrowBack';
import Widgets from '../../components/IconSVG/Widgets';
import KeyboardCapslock from '../../components/IconSVG/KeyboardCapslock';
import ContentCopy from '../../components/IconSVG/ContentCopy';

import { Text, Link, Footer, List, Span } from '../../styles/components';

export default class About extends Component {
    state = { isHiddenPayment: false };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    togglePayment = () => {
        this.setState({
            isHiddenPayment: !this.state.isHiddenPayment
        });
    };

    render({ lang = 'ru', variant = 'light' }, { isHiddenPayment }) {
        const isRusLang = lang === 'ru';

        const { text, stringsDictionary } = examples[lang];

        return (
            <section>
                <SecondaryMenu variant={variant}>
                    <Settings />
                </SecondaryMenu>

                <List _animated>
                    <Text.Title>POETIC PRAXIS?</Text.Title>
                    <Text isHidden={!isRusLang}>
                        POETIC PRAXIS{' '}
                        <Span textTransform="uppercase">
                            (Ποιητικός Πράξις)
                        </Span>{' '}
                        - это проект, созданный для поэтической практики.
                    </Text>
                    <Text isHidden={isRusLang}>
                        It's a project, made for poetic practice.
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
                                    frameborder="0"
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
                    </Text>
                    <Text isHidden={!isRusLang}>
                        Все выбранные сочетания можно перенести в{' '}
                        <Link target="_blank" href="/rhythmic">
                            ПРОСОДИЮ
                        </Link>
                        , нажимая на{' '}
                        <Button _flat _transparent type="button">
                            Посмотреть ритм <ArrowBack _small _rotate-left />
                        </Button>
                        .
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
                        {isRusLang ? 'Ритмика' : 'Rhythm'}
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
                        <Link
                            target="_blank"
                            href="https://vk.com/write-165098979">
                            Макс А. Ю.
                        </Link>{' '}
                        2016 - {new Date().getFullYear()}
                    </Footer>
                </List>
            </section>
        );
    }
}
