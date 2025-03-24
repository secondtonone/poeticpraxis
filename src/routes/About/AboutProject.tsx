import type { FunctionalComponent } from 'preact';

import type { Langs } from '@typings/Langs';

import Container from '@components/Container';
import Flex from '@components/Flex';
import Text from '@components/Text';

import { Link, TextAccent, TextConstructor } from '@styles/components';

import Email from '@icons/Convert';
import Telegram from '@icons/Telegram';
import Vk from '@icons/Vk';

import QrCode from '@public/img/TKxwSXPsJ2M5aw7ouBASsZNCJJRmW61sPt.png';
import EtherQrCode from '@public/img/ether.png';

interface AboutProjectProps {
  mediaQuery: boolean;
  lang: Langs;
  boundHeight: number;
}

const AboutProject: FunctionalComponent<AboutProjectProps> = ({
  lang = 'ru',
  mediaQuery,
}) => {
  const isRusLang = lang === 'ru';

  return (
    <Flex
      direction="column"
      margin="150px 0 50px"
      justify="flex-start"
    >
      <Container padding="9px 0 25px" height="auto">
        <Text
          size={mediaQuery ? 64 : 128}
          lineHeight={0.7}
          align="center"
          spacing="-10">
          <TextConstructor letter="-18">POETIC</TextConstructor>
          <TextAccent>
            <TextConstructor letter="-15">PR</TextConstructor>A
            <TextConstructor letter="-16">XIS</TextConstructor>
          </TextAccent>
        </Text>
        <Text isHidden={!isRusLang} align="center">
          проект, созданный чтобы узнать, что скрыто за словами -
          <br />
          для поэтической практики.
        </Text>
        <Text isHidden={isRusLang} align="center">
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
            href="https://t.me/poeticpraxis">
            <Telegram _big />
          </Link>
          <Link
            target="_blank"
            rel="noreferrer noopener"
            href="https://vk.com/poeticpraxis">
            <Vk _big />
          </Link>
        </Flex>
        <br />
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

      <br />
      <Flex
        direction={mediaQuery ? 'column' : 'row'}
        justify="space-between"
        width="100%"
        maxWidth="700px"
      >
        <Flex
          direction="column"
          justify="space-between"
          width="300px">
          <Text isHidden={isRusLang} align="center">Support the project by TRON USDT (TRC20/TRX)</Text>
          <Text isHidden={!isRusLang} align="center">Поддержать проект в TRON USDT (TRC20/TRX)</Text>
          <img src={QrCode} width="300" height="300" />
        </Flex>
        <br />
        <br />
        <Flex
          direction="column"
          justify="space-between"
          width="300px">
          <Text isHidden={isRusLang} align="center">Support the project by Ethereum</Text>
          <Text isHidden={!isRusLang} align="center">Поддержать проект в Ethereum</Text>

          <img src={EtherQrCode} width="300" height="300" />
        </Flex>
      </Flex>

    </Flex>
  );
};

export default AboutProject;
