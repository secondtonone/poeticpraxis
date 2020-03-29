import { h } from 'preact';

import { translations } from './translations';

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

const ActionButtonBar = ({
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
                <ShareIcon _big />
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
                {zoomIn ? <ZoomOut _big /> : <ZoomInIcon _big />}
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
                {isEditable ? <Lock _big /> : <LockOpen _big />}
            </Button>
        </ActionBar>
    );
};

export default ActionButtonBar;
