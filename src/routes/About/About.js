import { h, Component } from 'preact';

import Workfield from '../../components/Workfield';
import Button from '../../components/Button';

import ArrowBack from '../../components/IconSVG/ArrowBack';
import Widgets from '../../components/IconSVG/Widgets';
import KeyboardCapslock from '../../components/IconSVG/KeyboardCapslock';
import ContentCopy from '../../components/IconSVG/ContentCopy';

import { Text, Link, Footer, List, Span } from '../../styles/components';

export default class About extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const text = `Духовной жаждою томим,\nВ пустыне мрачной я влачился,\nИ шестикрылый серафим\nНа перепутье мне явился...`;

        /* const stringsDictionary = JSON.parse(
            '{"духовной жаждою томим,":{"accents":[{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{"type":2},{},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{}]},"в пустыне мрачной я влачился,":{"accents":[{"type":0},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{"type":0},{},{"type":1},{},{"type":0},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{}]},"и шестикрылый серафим":{"accents":[{"type":0},{},{"type":0},{"type":2},{"type":0},{"type":0},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":2},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0}]},"на перепутье мне явился...":{"accents":[{"type":0},{"type":0},{},{"type":0},{"type":2},{"type":0},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{},{"type":0},{"type":0},{"type":1},{},{"type":0},{"type":0},{"type":1},{"type":0},{"type":0},{"type":0},{},{},{}]}}'
        ); */

        return (
            <List _animated>
                <Text.Title>POETIC PRAXIS?</Text.Title>
                <Text>
                    POETIC PRAXIS{' '}
                    <Span textTransform="uppercase">(Ποιητικός Πράξις)</Span> -
                    это проект, созданный для поэтической практики.
                </Text>
                <Text>
                    Блог в Яндекс Дзен:{' '}
                    <Link href="https://zen.yandex.ru/id/5acdd7635991d30775549af1">
                        Поэтическая практика
                    </Link>
                </Text>
                <Text>
                    Канал проекта в Telegram:{' '}
                    <Link href="https://t.me/poeticpraxis">@poeticpraxis</Link>
                </Text>
                <Text>
                    Сообщество в VK:{' '}
                    <Link href="https://vk.com/poeticpraxis">
                        vk.com/poeticpraxis
                    </Link>
                </Text>

                <Text.Title id="images-engine">Машина образов или прием монтажа</Text.Title>
                <Text>
                    Новые технологии дарят нам новые возможности и инструменты.
                    "Машина образов", изобретённая С. А. Есениным, позволяет из
                    любого набора слов, составлять случайные пары или семьи,
                    когда слов больше двух, получая неожиданные образы. Для
                    лучшего результата, нужно использовать существиетльные и
                    приглагательные. Здесь машина претерпела изменения. Что если
                    попробовать получить новые сочетания не из простого набора
                    слов, а из не подготовленного материала: случайной статьи,
                    переписки, отрывка из книги, а может даже из стихотворения?
                    А из нескольких? Или слов ваших друзей. Смешивая ваши
                    нарративы, вам стоит узнать, что из этого выйдет. Без бумаги
                    и ножниц. Быстро и сколько угодно.
                </Text>

                <Text>
                    Работает она очень просто. Напишите слова или вставьте текст
                    на странице{' '}
                    <Link href="/images-engine">МАШИНА ОБРАЗОВ</Link> и нажмите
                    на кнопку{' '}
                    <Button _rounded _transparent type="button">
                        <Widgets _small />
                    </Button>
                    . После этого будут составлены сочетания слов из которых вы
                    выбираете интересные вам и не очень. Можно сгенерировать
                    новые сочетания нажимая на ту же кнопку, они заменят
                    предыдущие, но выбранные вами останутся.
                </Text>

                <Text>
                    Все выбранные сочетания можно перенести в{' '}
                    <Link href="/rhythmic">РИТМИКУ</Link>, нажимая на{' '}
                    <Button _flat _transparent type="button">
                        Посмотреть ритм <ArrowBack _small _rotate-left />
                    </Button>
                    .
                </Text>

                <Text.Title id="rhythmic">Ритмика</Text.Title>
                <Text>
                    Ритм стиха - немаловажный аспект. Но ритм существует не
                    только в стихах, его можно встретить и в ритмической прозе.
                    На странице <Link href="/rhythmic">РИТМИКА</Link> можно
                    исследовать текст. Редактор обозначает гласные буквы, но
                    исследователь сам ставит акценты нажатием на букву.
                    Попробуйте ниже:
                </Text>

                <Text.Wrapper>
                    <Workfield text={text} readOnly />
                </Text.Wrapper>

                <Text>
                    Редактор запоминает ударения только на одном и том же
                    устройстве. В знакомых словах он сам будет обзаначать их.
                    Показывает справа от строки количество в ней акцентных
                    слогов на количество слогов в общем. Есть возможность
                    расставлять паузы кнопкой{' '}
                    <Button _rounded _transparent type="button">
                        <KeyboardCapslock _small />
                    </Button>
                    .
                </Text>

                <Text>
                    Полученную ритмическую картину можно перенести в текстовый
                    редактор (Google Docs, Microsoft Word и т.д.) кнопкой{' '}
                    <Button _rounded _transparent type="button">
                        <ContentCopy _small />
                    </Button>
                    .
                </Text>

                <Text>
                    Это лишь инструмент в познании и творчестве. За вас он
                    ничего не сделает. Однако это хорошее подспорье.
                </Text>

                <Text.Title>Что дальше?</Text.Title>
                <Text>
                    К инструментам время от времени добавляются новые функции,
                    которые открывают новые возможности. Исследуйте и творите.
                </Text>

                <Footer>
                    &copy; Макс А. Ю. 2016 - {new Date().getFullYear()}
                </Footer>
            </List>
        );
    }
}

/* Когда наступит время */
/* <Text>
    Если сайт для вас был полезен, можете его поддержать:
    <iframe
        src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0&targets-hint=&default-sum=&button-text=12&payment-type-choice=on&hint=&successURL=&quickpay=shop&account=410014951905022"
        width="100%"
        height="220"
        frameborder="0"
        allowtransparency="true"
        scrolling="no"
    />
</Text> */
