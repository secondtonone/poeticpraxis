import { h } from 'preact';

import { translations } from '@components/Workfield/translations';
import useSessionStorage from '@hooks/useSessionStorage';

import Info from '@components/Info';

import Container from '@components/Container';
import Flex from '@components/Flex';

import maxMatchMedia from '@utils/maxMatchMedia';

import {
    StringPause,
    TriangleElement,
    CircleElement,
    Syllable
} from '@components/Workfield/styled';

import { AccentRelative } from './styled';

const helpState = () => {
    const [valueSessionStorage, setValueSessionStorage] = useSessionStorage(
        'isHideRhythmicHelp'
    );

    return [valueSessionStorage, () => setValueSessionStorage(true)];
};
export default function Help({ lang = 'ru' }) {
    const maxMedia600 = maxMatchMedia(600);
    const containerWidth = maxMedia600 ? '100%' : '33%';
    const isLangRU = lang === 'ru';

    const [isHidden, hideHelp] = helpState();

    if (isHidden) {
        return null;
    }

    return (
        <Info
            lang={lang}
            onClose={hideHelp}
            unfoldedContent={
                <div>
                    {isLangRU
                        ? 'Для постановки ударений в строках, нажимайте на'
                        : 'To set the accents in the lines, click on'}
                    <Flex
                        align="flex-start"
                        margin="10px 0 0"
                        direction={maxMedia600 ? 'column' : 'row'}>
                        <Container width={containerWidth}>
                            <AccentRelative accent={'red'} /> -{' '}
                            {translations[lang].STRONG},{' '}
                            {isLangRU
                                ? 'двойное нажатие снимает ударение в слове'
                                : 'by double tap cleaning accent in the word'}{' '}
                        </Container>
                        <Container width={containerWidth}>
                            <AccentRelative accent={'black'} /> -{' '}
                            {translations[lang].WEAK},{' '}
                            {isLangRU
                                ? 'двойное нажатие убирает все метки в слове и ставит ударение'
                                : 'by double tap cleaning all marks and set accent in the word'}{' '}
                        </Container>
                        <Flex
                            align="baseline"
                            width={containerWidth}
                            direction={maxMedia600 ? 'row' : 'column'}>
                            <Container>
                                <AccentRelative accent={'gray'} /> -{' '}
                                {translations[lang].SILENT}
                            </Container>
                            <Container>
                                <StringPause>&#8896;</StringPause> -{' '}
                                {translations[lang].PAUSE}
                            </Container>
                            <Container>
                                <AccentRelative accent={'red_secondary'} /> -{' '}
                                {translations[lang].SECOND}
                            </Container>
                        </Flex>
                    </Flex>
                    <Flex align="baseline" margin="10px 0 0">
                        <Container>
                            <Container
                                width="26px"
                                height="38px"
                                display="inline-block">
                                <Syllable.Accent>7</Syllable.Accent>15
                                <Syllable.AccentType>
                                    <CircleElement />
                                    <TriangleElement />
                                </Syllable.AccentType>
                            </Container>{' '}
                            -{' '}
                            {isLangRU
                                ? 'кол-во ударных/общее кол-во слогов, нажатие переключает ритм строки, под цифрами указан метр'
                                : 'number of stressed vowel/total syllables, under them - meter, click for changing the line rhythm'}
                        </Container>
                    </Flex>
                    <Container margin="10px 0 0">
                        {isLangRU
                            ? 'После переходите на вкладку "Мелодия", что бы узнать: Что скрыто за словами?'
                            : 'After all, go to "Melody" tab to find out: What is hidden behind the words?'}
                    </Container>
                </div>
            }
            foldedContent={
                <div>
                    {isLangRU
                        ? 'Cлова играют музыку. Как её услышать?'
                        : 'Words play music. How to hear it?'}
                </div>
            }
        />
    );
}
