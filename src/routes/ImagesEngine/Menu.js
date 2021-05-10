import { h } from 'preact';

import { enginePage } from '@translations';

import SecondaryMenu from '@components/SecondaryMenu';
import Subject from '@icons/Subject';
import PlaylistAddCheck from '@icons/PlaylistAddCheck';
import { Badge } from '@styles/components';

const translations = enginePage;

const secondMenu = (lang, [first, isDisabledWordsview, isHidden]) => [
    {
        value: 'material',
        title: translations[lang].engineMenu['MATERIAL'],
        content: (
            <div>
                <Subject />
                <div>{translations[lang].engineMenu['MATERIAL']}</div>
            </div>
        ),
        disabled: first,
    },
    {
        value: 'words',
        title: translations[lang].engineMenu['WORDS'],
        content: (
            <div>
                <Badge isHidden={isHidden}>
                    <PlaylistAddCheck />
                </Badge>
                <div>{translations[lang].engineMenu['WORDS']}</div>
            </div>
        ),
        disabled: isDisabledWordsview,
    },
];
    

const ImagesEngineMenu = ({
    lang = 'ru',
    current,
    handler,
    isDisabledWordsview,
    isResultReady,
}) => {
    return (
        <SecondaryMenu
            items={secondMenu(lang, [
                false,
                isDisabledWordsview,
                !isResultReady,
            ])}
            handler={handler}
            current={current}
        />
    );
};

export default ImagesEngineMenu;
