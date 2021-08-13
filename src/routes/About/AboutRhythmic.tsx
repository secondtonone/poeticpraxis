import { h, FunctionalComponent } from 'preact';
import { lazy, Suspense } from 'preact/compat';

import { NavLink } from 'react-router-dom';

import Langs from '@typings/Langs';

import examples from './examples';
import maxMatchMedia from '@utils/maxMatchMedia';

import Button from '@components/Button';
import Loader from '@components/Loader';
import Flex from '@components/Flex';
import Container from '@components/Container';
import Text from '@components/Text';

const Workfield = lazy(() =>
    import(/* webpackChunkName: "Workfield" */ '@components/Workfield')
);

import {
    TextAccent
} from '@styles/components';

interface AboutRhythmicProps {
    mediaQuery: boolean
    lang: Langs
}

const AboutRhythmic: FunctionalComponent<AboutRhythmicProps> = ({lang, mediaQuery}) => {
    const isRusLang = lang === 'ru';

    const { text, stringsDictionary } = examples[lang];

    return (
        <Flex direction="column" margin="150px 0 0" id="rhythmic">
            <Container
                width={mediaQuery ? '100%' : '70%'}
                padding={mediaQuery ? '0 50px 0' : '9px 0 50px'}
            >
                <Text
                    as="h2"
                    size={mediaQuery ? 64 : 128}
                    lineHeight={mediaQuery ? 0.5 : 0.4}
                    align={mediaQuery ? 'left' : 'right'}
                    spacing="-10"
                >
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
            <Flex direction={mediaQuery ? 'column' : 'row'} align="flex-start">
                <Container
                    width={mediaQuery ? '100%' : '500px'}
                    padding={
                        maxMatchMedia(700) ? '50px 50px 0' : '25px 50px 0 0'
                    }>
                    <Text
                        isHidden={!isRusLang}
                        align={mediaQuery ? 'left' : 'right'}>
                        Человеческая речь похожа на музыку. Но смысл слов мешает
                        нам её услышать. Это хорошо можно понять, если послушать
                        иностранную речь. А что если звуки букв заменить
                        музыкальными звуками. Чтобы это узнать, продолжите
                        обозначать ритмичсекий рисунок стихотвроения и
                        прослушайте:
                    </Text>
                    <Text isHidden={isRusLang} align="right">
                        Human speech is like a music. But the meaning of the
                        words prevents us from hearing it. This can be well
                        understood if you listen to a foreign speech. But what
                        if the sounds of letters are replaced by musical sounds.
                        To find out, continue to outline the rhythmic pattern of
                        the poem and listen to:
                    </Text>
                </Container>
                <Container
                    width={mediaQuery ? '100%' : '500px'}
                    padding={
                        maxMatchMedia(700) ? '25px 50px 0' : '25px 0 0 50px'
                    }>
                    <Suspense fallback={<Loader height={'100%'} />}>
                        <Workfield
                            text={text}
                            stringsDictionary={stringsDictionary}
                            readOnly
                        />
                    </Suspense>
                </Container>
            </Flex>
            <Container padding="2% 0 0">
                <Flex direction="column">
                    <NavLink to="/rhythmic?shared=%5B%22%D0%94%D1%83%D1%85%D0%BE%D0%B2%D0%BD%D0%BE%D0%B9%20%D0%B6%D0%B0%D0%B6%D0%B4%D0%BE%D1%8E%20%D1%82%D0%BE%D0%BC%D0%B8%D0%BC,%5Cn%D0%92%20%D0%BF%D1%83%D1%81%D1%82%D1%8B%D0%BD%D0%B5%20%D0%BC%D1%80%D0%B0%D1%87%D0%BD%D0%BE%D0%B9%20%D1%8F%20%D0%B2%D0%BB%D0%B0%D1%87%D0%B8%D0%BB%D1%81%D1%8F,%5Cn%D0%98%20%D1%88%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D1%80%D1%8B%D0%BB%D1%8B%D0%B9%20%D1%81%D0%B5%D1%80%D0%B0%D1%84%D0%B8%D0%BC%5Cn%D0%9D%D0%B0%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BF%D1%83%D1%82%D1%8C%D0%B5%20%D0%BC%D0%BD%D0%B5%20%D1%8F%D0%B2%D0%B8%D0%BB%D1%81%D1%8F%22,%220001000000100020000100%7C00000010000010000010000010000%7C000200000100000200010%7C00002000100000010001000%22%5D">
                        <Button
                            _action--outlined
                            width="200px"
                            borderWidth="5"
                            size={16}>
                            {isRusLang ? `ПРОСЛУШАТЬ` : `Lets listen`}
                        </Button>
                    </NavLink>
                </Flex>
            </Container>
        </Flex>
    );
};

export default AboutRhythmic;
