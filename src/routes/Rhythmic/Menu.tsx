import type { FunctionalComponent } from 'preact';

import { rhythmicPage as translations } from '@translations';

import type { Langs } from '@typings/Langs';
import type MenuItem from '@typings/MenuItem';
import type { RhythmicViews } from '@typings/RhythmicViews';

import SecondaryMenu from '@components/SecondaryMenu';
import MelodyIcon from '@icons/Melody';
import RhythmIcon from '@icons/RhythmIcon';

const secondMenu = (lang: Langs, [first, second]: [boolean, boolean]): MenuItem<RhythmicViews>[] => [
  {
    value: 'rhythmic',
    title: translations[lang].rhythmicMenu.RHYTHMICS,
    content: (
      <div>
        <RhythmIcon />
        <div>{translations[lang].rhythmicMenu.RHYTHMICS}</div>
      </div>
    ),
    disabled: first
  },
  {
    value: 'melody',
    title: translations[lang].rhythmicMenu.MELODY,
    content: (
      <div>
        <MelodyIcon />
        <div>{translations[lang].rhythmicMenu.MELODY}</div>
      </div>
    ),
    disabled: second
  }
];

interface RhythmicMenuProps {
    lang: Langs
    current: RhythmicViews
    handler: (value: RhythmicViews) => void
    isAnalyzeReady: boolean
}

const RhythmicMenu: FunctionalComponent<RhythmicMenuProps> = ({
  lang = 'ru',
  current,
  handler,
  isAnalyzeReady
}) => {
    
  return (
    <SecondaryMenu<RhythmicViews>
      items={secondMenu(lang, [false, !isAnalyzeReady])}
      handler={handler}
      current={current}
    />
  );
};

export default RhythmicMenu;
