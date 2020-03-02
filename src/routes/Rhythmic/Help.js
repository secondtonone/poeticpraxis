import { h } from 'preact';

import { translations } from '../../components/Workfield/translations';
import useSessionStorage from '../../hooks/useSessionStorage';

import Info from '../../components/Info';

import { Container, Flex } from '../../styles/components';

import { maxMatchMedia } from '../../utils';

import {
    StringPause,
    TriangleElement,
    CircleElement,
    Syllable
} from '../../components/Workfield/styled';

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

    const [isHadden, hideHelp] = helpState();

    if (isHadden) {
        return null;
    }

    return (
        <Info
            lang={lang}
            onClose={hideHelp}
            unfoldedContent={
                <div>
                    Для постановки ударений в строках, нажимайте на:
                    <Flex
                        align="flex-start"
                        margin="10px 0 0"
                        direction={maxMedia600 ? 'column' : 'row'}>
                        <Container width={containerWidth}>
                            <AccentRelative accent={'red'} /> -{' '}
                            {translations[lang].STRONG}, двойное нажатие снимает
                            ударение в слове{' '}
                        </Container>
                        <Container width={containerWidth}>
                            <AccentRelative accent={'black'} /> -{' '}
                            {translations[lang].WEAK}, двойное нажатие убирает
                            все метки в слове и ставит ударение{' '}
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
                            - кол-во ударных/общее кол-во слогов, нажатие
                            переключает ритм строки, под цифрами указан метр
                        </Container>
                    </Flex>
                    <Container margin="10px 0 0">
                        После переходите на вкладку "Мелодия", что бы узнать: Что скрыто за словами?
                    </Container>
                </div>
            }
            foldedContent={<div>Cлова играют музыку. Как её услышать?</div>}
        />
    );
}
