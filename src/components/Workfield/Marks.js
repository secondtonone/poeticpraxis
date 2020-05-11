import { h } from 'preact';

import {
    StringPauseRelative,
    AccentRelative
} from './styled';

import { translations } from './translations';

import {
    accents
} from '@modules/workfield';


const Marks = ({tags, lang}) => {
    const renderedTags = [];

    const tagsLength = tags.length;

    const wordId = '';

    const translation = translations[lang ? lang : 'ru'];

    const description = Object.values(translation);

    for (let index = 0; index < tagsLength; index++) {
        const sign = tags[index];

        const style = {
            top: sign.tag.top,
            left: sign.tag.left,
            height: sign.tag.height,
            width: sign.tag.width
        };

        if (sign.type === 'p') {
            renderedTags.push(
                <StringPauseRelative
                    key={`spr-${sign.id}`}
                    id={sign.id}
                    style={style}
                    data-type={sign.type}
                    title={translation.PAUSE}>
                    &#8896;
                </StringPauseRelative>
            );
        }

        renderedTags.push(
            <AccentRelative
                accent={accents[sign.accent]}
                data-accent={accents[sign.accent]}
                key={`acr-${sign.id}`}
                id={sign.id}
                style={style}
                data-type={sign.type}
                title={description[sign.accent]}
            />
        );
    }

    return renderedTags;
};

export default Marks;
