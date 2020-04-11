import { h } from 'preact';

import { translations } from './translations';

import SecondaryMenu from '@components/SecondaryMenu';
import Subject from '@icons/Subject';
import PlaylistAddCheck from '@icons/PlaylistAddCheck';

const secondMenu = (lang, [first, isDisabledWordsview]) => [
    {
        value: 'material',
        title: translations[lang].engineMenu['MATERIAL'],
        content: (
            <div>
                <Subject />
                <div>{translations[lang].engineMenu['MATERIAL']}</div>
            </div>
        ),
        disabled: first
    },
    {
        value: 'words',
        title: translations[lang].engineMenu['WORDS'],
        content: (
            <div>
                <PlaylistAddCheck />
                <div>{translations[lang].engineMenu['WORDS']}</div>
            </div>
        ),
        disabled: isDisabledWordsview
    }
];
    

const ImagesEngineMenu = ({
    lang = 'ru',
    current,
    handler,
    isDisabledWordsview
}) => {
    return (
        <SecondaryMenu
            items={secondMenu(lang, [false, isDisabledWordsview])}
            handler={handler}
            current={current}
        />
    );
};

export default ImagesEngineMenu;
