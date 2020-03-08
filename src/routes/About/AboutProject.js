import { h } from 'preact';
import { useState, useCallback } from 'preact/compat';

import Button from '../../components/Button';

import {
    Text,
    Link,
    Flex,
    TextAccent,
    Container
} from '../../styles/components';

const AboutProject = ({ lang = 'ru', screenHeight, mediaQuery }) => {
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
            height={isHiddenPayment ? 'auto' : `${screenHeight - 80}px`}>
            <Container padding="9px 0 25px" height="auto">
                <Text
                    size={mediaQuery ? 64 : 128}
                    lineHeight="0.7"
                    align="center"
                    spacing="-10">
                    POETIC
                    <TextAccent>PRAXIS</TextAccent>
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
            <Flex direction="column" justify="flex-start" height="100px">
                {isRusLang ? 'Подписаться:' : 'Subscribe:'}
                <Flex
                    direction={mediaQuery ? 'column' : 'row'}
                    justify="space-evenly"
                    width="300px">
                    {isRusLang && (
                        <Link
                            target="_blank"
                            rel="noreferrer noopener"
                            href="tg://resolve?domain=poeticpraxis">
                            TELEGRAM
                        </Link>
                    )}
                    {isRusLang && (
                        <Link
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://vk.com/poeticpraxis">
                            ВКОНТАКТЕ
                        </Link>
                    )}
                    {!isRusLang && (
                        <Link
                            target="_blank"
                            rel="noreferrer noopener"
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
