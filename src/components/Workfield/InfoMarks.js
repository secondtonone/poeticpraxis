import { h } from 'preact';

import { translations } from './translations';

import {
    Syllable,
    StringNumber,
    TriangleElement,
    CircleElement
} from './styled';

import {
    rhythmPresets
} from './module';

const makeAccentSizeIdicator = (size, accent) => {
    let scheme = [];

    for (let i = 1; i <= size; i++) {
        if (i === accent) {
            scheme.push(<TriangleElement key={`tr-${i}`} />);
        } else {
            scheme.push(<CircleElement key={`cl-${i}`} />);
        }
    }

    return scheme;
};


const InfoMarks = ({
    strings,
    orderStrings,
    lineHeight = 0,
    elements,
    syllableOff,
    stringNumberOff,
    lang = 'ru'
}) => {
    let infoTags = [];

    const translation = translations[lang];

    let stringCounter = 0;

    const dataTypeAQ = 'a/q';

    const orderStringsLength = orderStrings.length;

    for (let index = 0; index < orderStringsLength; index++) {
        const stringId = orderStrings[index];

        const string = strings[stringId];
        if (string.tag) {
            const tag = string.tag;

            const size = rhythmPresets[string.rhythmPreset].size;

            const accent = rhythmPresets[string.rhythmPreset].accent;

            const title = rhythmPresets[string.rhythmPreset].title;

            const vowels = string.vowel;

            const delta = tag.height - lineHeight;

            const vowelAccentCount = vowels.filter(
                (id) => elements[id].accent === 1 || elements[id].accent === 2
            ).length;

            const lineNumber = translation['LINE_NUMBER'];

            const accentsInfo = `${translation['ACCENT']}/${translation['COUNT_METER']} - ${translation[title]}`;

            infoTags.push([
                syllableOff || !vowels.length ? null : (
                    <Syllable
                        id={stringId}
                        data-type={dataTypeAQ}
                        title={accentsInfo}
                        key={`s-${tag.top}`}
                        style={{ top: tag.top + delta }}>
                        {vowelAccentCount ? (
                            <Syllable.Accent>
                                {vowelAccentCount}
                            </Syllable.Accent>
                        ) : null}
                        {string.soundGramma.length}
                        <Syllable.AccentType>
                            {makeAccentSizeIdicator(size, accent)}
                        </Syllable.AccentType>
                    </Syllable>
                ),
                stringNumberOff || !string.words.length ? null : (
                    <StringNumber
                        key={`n-${tag.top}`}
                        title={lineNumber}
                        style={{ top: tag.top }}>
                        {++stringCounter}
                    </StringNumber>
                )
            ]); 
        }
    }

    return infoTags; 
};

export default InfoMarks;
