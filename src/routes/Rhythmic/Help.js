import React from 'react';

import { translations } from '../../components/Workfield/translations';

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

export default function Help({ lang = 'ru' }) {
    const maxMedia600 = maxMatchMedia(600);
    const containerWidth = maxMedia600 ? '100%' : '33%';
    return (
        <Info
            lang={lang}
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
                </div>
            }
            foldedContent={<div>С чего начать?</div>}
        />
    );
}
