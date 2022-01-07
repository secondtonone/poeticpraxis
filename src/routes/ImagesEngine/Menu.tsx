import { FunctionalComponent } from 'preact';

import { enginePage } from '@translations';

import Langs from '@typings/Langs';
import { Views } from '@typings/ImagesEngineModel';
import MenuItem from '@typings/MenuItem';

import SecondaryMenu from '@components/SecondaryMenu';
import Subject from '@icons/Subject';
import PlaylistAddCheck from '@icons/PlaylistAddCheck';
import { Badge } from '@styles/components';

const translations = enginePage;

const secondMenu = (lang: Langs, [first, isDisabledWordsview, isHidden]: [boolean, boolean, boolean]): MenuItem<Views>[] => [
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


interface ImagesEngineMenuProps {
    lang: Langs
    current: Views
    handler: (value: Views) => void
    isDisabledWordsview: boolean
    isResultReady: boolean
}

const ImagesEngineMenu: FunctionalComponent<ImagesEngineMenuProps> = ({
    lang = 'ru',
    current,
    handler,
    isDisabledWordsview,
    isResultReady,
}) => {
    return (
        <SecondaryMenu<Views>
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
