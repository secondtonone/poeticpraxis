import { FunctionalComponent } from 'preact';

import { rhythmicPage as translations } from '@translations';

import Langs from '@typings/Langs';

import Button from '@components/Button';

import ContentCopy from '@icons/ContentCopy';
import ZoomInIcon from '@icons/ZoomIn';
import ZoomOut from '@icons/ZoomOut';
import Lock from '@icons/Lock';
import LockOpen from '@icons/LockOpen';
import ShareIcon from '@icons/Share';

import {
  ActionBar
} from '@styles/components';

interface ActionButtonBarProps {
    text: string
    lang: Langs
    zoomIn: boolean
    isEditable: boolean
    copyToClipboard: () => void
    shareWithLink: () => void
    zoomHandler: () => void
    changeMode: () => void
}

const ActionButtonBar: FunctionalComponent<ActionButtonBarProps> = ({
  text,
  lang = 'ru',
  zoomIn,
  isEditable,
  copyToClipboard,
  shareWithLink,
  zoomHandler,
  changeMode
}) => {
  return (
    <ActionBar>
      <Button
        _rounded
        _transparent
        type="button"
        disabled={!text}
        onClick={copyToClipboard}
        title={translations[lang].rhythmic['COPY']}>
        <ContentCopy _middle />
      </Button>
      <Button
        _rounded
        _transparent
        type="button"
        disabled={!text}
        onClick={shareWithLink}
        title={translations[lang].rhythmic['SHARE']}>
        <ShareIcon _middle />
      </Button>

      <Button
        type="button"
        _rounded
        _transparent
        onClick={zoomHandler}
        title={
          zoomIn
            ? translations[lang].rhythmic['ZOOMOUT']
            : translations[lang].rhythmic['ZOOMIN']
        }>
        {zoomIn ? <ZoomOut _middle /> : <ZoomInIcon _middle />}
      </Button>

      <Button
        type="button"
        _rounded
        _transparent
        disabled={!text}
        onClick={changeMode}
        title={
          isEditable
            ? translations[lang].rhythmic['BLOCK']
            : translations[lang].rhythmic['UNBLOCK']
        }>
        {isEditable ? <Lock _middle /> : <LockOpen _middle />}
      </Button>
    </ActionBar>
  );
};

export default ActionButtonBar;
