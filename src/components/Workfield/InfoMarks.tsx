import { h } from 'preact';
import { memo } from 'preact/compat';
import { translations } from './translations';
import { IStrings, OrderStrings, IElements } from '@modules/workfield/structure';
import Langs from '@typings/Langs';

import {
    StringNumber
} from './styled';

import StringAccents from './StringAccents';

import rhythmPresets from '@modules/workfield/rhythmPresets';

export interface InfoMarksProps {
    strings?: IStrings
    orderStrings?: OrderStrings
    lineHeight?: number
    elements?: IElements
    syllableOff?: boolean
    stringNumberOff?: boolean
    lang: Langs
}

const InfoMarks = memo<InfoMarksProps>(({
    strings = {},
    orderStrings = [],
    lineHeight = 0,
    elements = {},
    syllableOff,
    stringNumberOff,
    lang = 'ru'
}) => {
    const translation = translations[lang];

    let infoTags: React.ReactNode[] = [];

    let stringCounter = 0;

    const orderStringsLength = orderStrings.length;

    for (let index = 0; index < orderStringsLength; index++) {
        const stringId = orderStrings[index];

        if (strings[stringId] && strings[stringId].tag) {
            const string = strings[stringId];

            const tag = string.tag;

            const size = rhythmPresets[string.rhythmPreset].size;

            const accent = rhythmPresets[string.rhythmPreset].accent;

            const title = rhythmPresets[string.rhythmPreset].title;

            const vowels = string.vowel;

            const delta = (tag?.height || 0) - lineHeight;

            const vowelAccentCount = vowels.filter(
                (id) => elements[id].accent === 1 || elements[id].accent === 2
            ).length;

            const lineNumber = translation['LINE_NUMBER'];

            const accentsInfo = `${translation['ACCENT']}/${translation['COUNT_METER']} - ${title ? translation[title]: title}`;

            const tagTop = tag?.top || 0;

            infoTags.push([
                syllableOff || !vowels.length ? null : (
                    <StringAccents
                        id={stringId}
                        title={accentsInfo}
                        top={tagTop}
                        delta={delta}
                        vowelAccentCount={vowelAccentCount}
                        soundGrammaLength={string.soundGramma.length}
                        size={size}
                        accent={accent}
                    />
                ),
                stringNumberOff || !string.words.length ? null : (
                    <StringNumber
                        key={`n-${tagTop}`}
                        title={lineNumber}
                        style={{ top: tagTop }}>
                        {++stringCounter}
                    </StringNumber>
                )
            ]);
        } 
    }

    return <>{infoTags}</>; 
});

export default InfoMarks;
