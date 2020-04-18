import { h } from 'preact';
import { useState, useCallback } from 'preact/compat';

import Button from '@components/Button';
import Flex from '@components/Flex';
import Container from '@components/Container';
import Text from '@components/Text';

import { Link, TextAccent, TextConstructor } from '@styles/components';

import Telegram from '@icons/Telegram';
import Insta from '@icons/Insta';
import Reddit from '@icons/Reddit';
import Vk from '@icons/Vk';
import Email from '@icons/Convert';

const AboutProject = ({ lang = 'ru', mediaQuery, boundHeight }) => {
    const [isHiddenPayment, setPaymentVisibility] = useState(false);

    const togglePayment = useCallback(() => {
        setPaymentVisibility(!isHiddenPayment);
    }, [isHiddenPayment]);

    const isRusLang = lang === 'ru';

    return (
        <Flex
            direction="column"
            margin="150px 0 50px"
            justify="flex-start"
            height={isHiddenPayment ? 'auto' : `${boundHeight - 80}px`}>
            <Container padding="9px 0 25px" height="auto">
                <Text
                    size={mediaQuery ? 64 : 128}
                    lineHeight="0.7"
                    align="center"
                    spacing="-10">
                    <TextConstructor letter="-18">POETIC</TextConstructor>
                    <TextAccent>
                        <TextConstructor letter="-15">PR</TextConstructor>A
                        <TextConstructor letter="-16">XIS</TextConstructor>
                    </TextAccent>
                </Text>
                <Text isHidden={!isRusLang} size={14} align="center">
                    проект, созданный чтобы узнать, что скрыто за словами -
                    <br />
                    для поэтической практики.
                </Text>
                <Text isHidden={isRusLang} size={14} align="center">
                    the project created to find out what is hidden behind words
                    -
                    <br />
                    for poetic practice.
                </Text>
            </Container>
            <Flex justify="space-between" direction="column" height="100px">
                <Flex justify="space-around" width="300px">
                    <Link
                        target="_blank"
                        rel="noreferrer noopener"
                        href="tg://resolve?domain=poeticpraxis">
                        <Telegram _big />
                    </Link>
                    <Link
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://vk.com/poeticpraxis">
                        <Vk _big />
                    </Link>
                    <Link
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://instagram.com/poeticpraxis">
                        <Insta _big />
                    </Link>
                    <Link
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://www.reddit.com/r/poeticpraxis/">
                        <Reddit _big />
                    </Link>
                </Flex>

                <Flex
                    direction={mediaQuery ? 'column' : 'row'}
                    justify="space-evenly"
                    width="300px">
                    <Link href="mailto:thearchitect@poeticpraxis.ru">
                        <Flex align="flex-start">
                            <Email _small padding="0 8px 0 0" />{' '}
                            thearchitect@poeticpraxis.ru
                        </Flex>
                    </Link>
                </Flex>
            </Flex>
            {isRusLang && (
                <Button
                    _action--outlined
                    width="300px"
                    size={16}
                    type="button"
                    borderWidth="5"
                    margin="42px 0 24px"
                    onClick={togglePayment}>
                    {!isHiddenPayment
                        ? 'поддержать проект'
                        : 'В следующий раз 😅'}
                </Button>
            )}
            <br />
            {isHiddenPayment ? (
                <iframe
                    src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0&targets-hint=&default-sum=2&button-text=11&payment-type-choice=on&hint=&successURL=&quickpay=shop&account=410014951905022"
                    width="300"
                    height="220"
                    frameBorder="0"
                    allowTransparency="true"
                    scrolling="no"
                />
            ) : null}
        </Flex>
    );
};

export default AboutProject;
