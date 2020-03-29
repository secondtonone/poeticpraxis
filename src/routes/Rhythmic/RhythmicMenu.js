import { h } from 'preact';

import { translations } from './translations';

import SecondaryMenu from '@components/SecondaryMenu';
import MelodyIcon from '@icons/Melody';
import RhythmIcon from '@icons/RhythmIcon';

const secondMenu = (lang, [first, second]) => [
    {
        value: 'rhythmic',
        icon: <RhythmIcon />,
        title: translations[lang].rhythmicMenu['RHYTHMICS'],
        content: (
            <div>
                <RhythmIcon />
                <div>{translations[lang].rhythmicMenu['RHYTHMICS']}</div>
            </div>
        ),
        disabled: first
    },
    {
        value: 'melody',
        icon: <MelodyIcon />,
        title: translations[lang].rhythmicMenu['MELODY'],
        content: (
            <div>
                <MelodyIcon />
                <div>{translations[lang].rhythmicMenu['MELODY']}</div>
            </div>
        ),
        disabled: second
    }
];

const RhythmicMenu = ({lang = 'ru', current, handler, text}) => {

    return (
        <SecondaryMenu
            items={secondMenu(lang, [false,!text])}
            handler={handler}
            current={current}
        />
    );
}

export default RhythmicMenu;
