import React from 'react';

import { translations } from '../../components/Workfield/translations';

import Info from '../../components/Info';

import { Container } from '../../styles/components';

import {
    StringPause,
    TriangleElement,
    CircleElement,
    Syllable
} from '../../components/Workfield/styled';

import { AccentRelative } from './styled';

export default function Help({ lang = 'ru' }) {
    return (
        <Info
            lang={lang}
            unfoldedContent={
                <div>
                    Для постановки ударений в строках, нажимайте на: <br />
                    <AccentRelative accent={'red'} /> -{' '}
                    {translations[lang].STRONG}, двойное нажатие снимает
                    ударение в слове <br />
                    <AccentRelative accent={'black'} /> -{' '}
                    {translations[lang].WEAK}, двойное нажатие убирает все метки
                    в слове и ставит ударение <br />
                    <AccentRelative accent={'red_secondary'} /> -{' '}
                    {translations[lang].SECOND} <br />
                    <AccentRelative accent={'gray'} /> -{' '}
                    {translations[lang].SILENT} <br />
                    <StringPause>&#8896;</StringPause> -{' '}
                    {translations[lang].PAUSE}
                    <br />
                    <Container width="26px" height="38" display="inline-block">
                        <Syllable.Accent>7</Syllable.Accent>15
                        <Syllable.AccentType>
                            <CircleElement />
                            <TriangleElement />
                        </Syllable.AccentType>
                    </Container>{' '}
                    - кол-во ударных/общее кол-во слогов, нажатие переключает
                    ритм строки, под цифрами указан метр
                </div>
            }
            foldedContent={<div>Что это все значит?</div>}
        />
    );
}
