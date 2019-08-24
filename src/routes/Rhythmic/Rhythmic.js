import React, { Component } from 'react';

import { isTouchDevice } from '../../utils';
import { translations } from './translations';
import {
    getLongLink,
    sharing,
    encodeDictionary,
    linkToStateDecode
} from '../../modules/sharing';
import {
    getToneModule,
    Tone,
    getInstrument,
    Instrument
} from '../../modules/tone';

import Workfield from '../../components/Workfield';
import MessageBox from '../../components/MessageBox';
import Button from '../../components/Button';
import SecondaryMenu from '../../components/SecondaryMenu';
import Melody from '../../components/Melody';

import KeyboardCapslock from '../../components/IconSVG/KeyboardCapslock';
import ContentCopy from '../../components/IconSVG/ContentCopy';
import ZoomInIcon from '../../components/IconSVG/ZoomIn';
import ZoomOut from '../../components/IconSVG/ZoomOut';
import Lock from '../../components/IconSVG/Lock';
import LockOpen from '../../components/IconSVG/LockOpen';
import MelodyIcon from '../../components/IconSVG/Melody';
import RhythmIcon from '../../components/IconSVG/RhythmIcon';
import ShareIcon from '../../components/IconSVG/Share';
import Info from '../../components/Info';

import { List, LeftedLayout, Link, ActionBar } from '../../styles/components';

import {
    StringPauseButton,
    StringPauseButtonMobile,
    CopyButton,
    ButtonContainer
} from './styled';

export default class Rhythmic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            renderCaesuraButtonStyle: {
                top: 64
            },
            textMessage: '',
            zoomIn: false,
            isFocused: false,
            isEditable: true,
            isDevice: isTouchDevice(),
            isToolbarHidden: true,
            currentView: 'rhythmic',
            rhytmicState: {}
        };

        this.mouseTrackingTimer = 0;
    }

    async componentDidMount() {
        window.scrollTo(0, 0);

        if (URLSearchParams) {
            const searchParams = new URLSearchParams(location.search);

            let shared = searchParams.get('shared');

            linkToStateDecode(
                shared,
                ({ text, stringsDictionary }) => {
                    stringsDictionary = {
                        ...this.props.rhythmicState.stringsDictionary,
                        ...stringsDictionary
                    };

                    this.props.setRhytmicState({
                        text,
                        stringsDictionary
                    });
                },
                () => {
                    this.showMessage(
                        translations[this.props.lang].messages['WRONG']
                    );
                }
            );
        }
        /* для преждевременной загрузки звуков */
        try {
            if (!Tone) {
                await getToneModule();
            }

            if (!Instrument) {
                getInstrument('piano');
                //getInstrument('poly');
            }
        } catch (e) {}
    }

    changeView = (currentView) => {
        this.setState({
            currentView
        });
    };

    showMessage = (textMessage) => {
        this.setState({
            textMessage
        });

        setTimeout(() => {
            this.setState({
                textMessage: null
            });
        }, 2000);
    };

    copyToClipboard = () => {
        this.workfield.copyToClipboard();
        this.showMessage(translations[this.props.lang].messages['COPIED']);
    };

    makeCaesura = () => {
        this.workfield.makeCaesura();
    };

    changeMode = () => {
        let isEditable = this.state.isEditable;
        const zoomIn = false;

        if (isEditable) {
            isEditable = false;
        } else {
            isEditable = true;
        }

        this.setState({
            zoomIn,
            isEditable
        });

        this.workfield.changeZoomMode(zoomIn);
    };

    changeZoomMode = () => {
        let zoomIn = this.state.zoomIn;

        if (zoomIn) {
            zoomIn = false;
        } else {
            zoomIn = true;
        }

        this.setState({
            zoomIn
        });

        this.workfield.changeZoomMode(zoomIn);
    };

    getDataFromWorkfield = (rhytmicState) => {
        this.setState({
            rhytmicState
        });
    };

    focusHandler = (isFocused) => {
        const isEditable = this.state.isEditable;

        setTimeout(() => {
            this.setState({
                isFocused: isEditable ? isFocused : false,
                isToolbarHidden: true
            });
        }, 100);
    };

    triggerToolbar = () => {
        let isToolbarHidden = this.state.isToolbarHidden;

        this.setState({
            isToolbarHidden: isToolbarHidden ? false : true
        });
    };

    shareWithLink = () => {
        const { text, stringsDictionary } = this.props.rhythmicState;

        const sharedText = JSON.stringify([
            text,
            encodeDictionary({ text, stringsDictionary })
        ]);

        let link = getLongLink(sharedText);

        sharing(link);

        this.showMessage(translations[this.props.lang].messages['LINK_COPIED']);
    };

    mouseTracking = (e) => {
        if (this.mouseTrackingTimer) {
            window.clearTimeout(this.mouseTrackingTimer);
        }

        let transform = `translateY(${
            e.pageY - 194 < 0 ? 0 : Math.floor(e.pageY - 194)
        }px)`;

        const renderCaesuraButtonStyle = {
            transform
        };

        this.mouseTrackingTimer = setTimeout(() => {
            this.setState({
                renderCaesuraButtonStyle
            });
        }, 100);
    };

    render() {
        const {
            setRhytmicState,
            setWordsDictionary,
            rhythmicState: { text, stringsDictionary },
            wordsDictionary,
            lang = 'ru',
            variant = 'light'
        } = this.props;

        const {
            renderCaesuraButtonStyle,
            textMessage,
            zoomIn,
            isEditable,
            isFocused,
            isToolbarHidden,
            isDevice,
            currentView,
            rhytmicState
        } = this.state;

        const isFirstTime = wordsDictionary? !Object.keys(wordsDictionary).length : true;

        const secondMenu = [
            {
                value: 'rhythmic',
                icon: <RhythmIcon />,
                title: translations[lang].rhythmicMenu['RHYTHMICS'],
                content: (
                    <div>
                        <RhythmIcon />
                        <div>
                            {translations[lang].rhythmicMenu['RHYTHMICS']}
                        </div>
                    </div>
                ),
                disabled: false
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
                disabled: !text
            }
        ];

        return (
            <section>
                <MessageBox text={textMessage} bottom={120} />
                <SecondaryMenu
                    items={secondMenu}
                    handler={this.changeView}
                    current={currentView}
                />
                {isDevice && !isFocused && (
                    <ActionBar>
                        <Button
                            _rounded
                            _transparent
                            type="button"
                            disabled={!text}
                            onClick={this.copyToClipboard}
                            title="Копировать в текстовый редактор">
                            <ContentCopy _big />
                        </Button>
                        <Button
                            _rounded
                            _transparent
                            type="button"
                            disabled={!text}
                            onClick={this.shareWithLink}
                            title="Поделиться">
                            <ShareIcon _big />
                        </Button>

                        <Button
                            type="button"
                            _rounded
                            _transparent
                            onClick={() => {
                                if (isEditable) {
                                    this.changeMode();
                                }
                                this.changeZoomMode();
                            }}
                            title={zoomIn ? 'Уменьшить' : 'Увеличить'}>
                            {zoomIn ? <ZoomOut _big /> : <ZoomInIcon _big />}
                        </Button>

                        <Button
                            type="button"
                            _rounded
                            _transparent
                            disabled={!text}
                            onClick={this.changeMode}
                            title={
                                isEditable ? 'Блокировать' : 'Разблокировать'
                            }>
                            {isEditable ? <Lock _big /> : <LockOpen _big />}
                        </Button>
                    </ActionBar>
                )}
                <LeftedLayout>
                    {isFirstTime && (
                        <Info>
                            {translations[lang].messages['HOW_WORKS']}{' '}
                            <Link href="/about#rhythmic">
                                {translations[lang].messages['LEARN_MORE']}
                            </Link>
                        </Info>
                    )}
                    {currentView === 'rhythmic' && (
                        <div>
                            {isDevice && isFocused && (
                                <StringPauseButtonMobile
                                    _rounded
                                    _white
                                    _big
                                    type="button"
                                    onClick={this.makeCaesura}
                                    title="Цезура">
                                    <KeyboardCapslock _big />
                                </StringPauseButtonMobile>
                            )}

                            <List _animated>
                                {!isDevice && (
                                    <ButtonContainer>
                                        <CopyButton
                                            _rounded
                                            type="button"
                                            disabled={!text}
                                            onClick={this.copyToClipboard}
                                            title="Копировать в текстовый редактор">
                                            <ContentCopy _small />
                                        </CopyButton>
                                        <CopyButton
                                            _rounded
                                            type="button"
                                            disabled={!text}
                                            onClick={this.shareWithLink}
                                            title="Поделиться">
                                            <ShareIcon _small />
                                        </CopyButton>
                                    </ButtonContainer>
                                )}

                                <StringPauseButton
                                    _rounded
                                    _middle
                                    type="button"
                                    onClick={this.makeCaesura}
                                    style={renderCaesuraButtonStyle}
                                    title="Поставить паузу">
                                    <KeyboardCapslock />
                                </StringPauseButton>

                                <Workfield
                                    onMouseMove={this.mouseTracking}
                                    readOnly={!isEditable}
                                    text={text}
                                    transmitState={setRhytmicState}
                                    focusHandler={this.focusHandler}
                                    setWordsDictionary={setWordsDictionary}
                                    wordsDictionary={wordsDictionary}
                                    stringsDictionary={stringsDictionary}
                                    toParent={this.getDataFromWorkfield}
                                    placeHolder={`${
                                        translations[lang].placeholders[
                                            'RHYTHMICS'
                                        ]
                                    }...`}
                                    ref={(ref) => {
                                        this.workfield = ref;
                                    }}
                                />
                            </List>
                        </div>
                    )}
                    {currentView === 'melody' && (
                        <List _animated>
                            <Melody
                                lang={lang}
                                variant={variant}
                                rhytmicState={rhytmicState}
                            />
                        </List>
                    )}
                </LeftedLayout>
            </section>
        );
    }
}

/* 
    {isDevice && !isFocused && isToolbarHidden && (
        <Button
            type="button"
            _rounded
            _main
            _black
            _centred
            _animated-up
            onClick={this.triggerToolbar}
            title="Инструменты">
            <ViewDay _big />
        </Button>
    )}
*/
/* <Toolbar
    closeButton={
        <Button
            type="button"
            _rounded
            _black
            _main
            _animated-up
            onClick={this.triggerToolbar}
            title="Инструменты">
            <ArrowBack _big />
        </Button>
    }
    isHidden={isToolbarHidden}>
    <Button
        type="button"
        _rounded
        _transparent
        disabled={!text}
        onClick={this.changeMode}
        title={
            isEditable
                ? 'Блокировать'
                : 'Разблокировать'
        }>
        {isEditable ? (
            <Lock _big />
        ) : (
            <LockOpen _big />
        )}
    </Button>
    {!isEditable && (
        <Button
            type="button"
            _rounded
            _transparent
            onClick={this.changeZoomMode}
            title={
                zoomIn ? 'Уменьшить' : 'Увеличить'
            }>
            {zoomIn ? (
                <ZoomOut _big />
            ) : (
                <ZoomInIcon _big />
            )}
        </Button>
    )}
    <Button
        _rounded
        _transparent
        type="button"
        disabled={!text}
        onClick={this.copyToClipboard}
        title="Копировать в текстовый редактор">
        <ContentCopy _big />
    </Button>
    <Button
        _rounded
        _transparent
        type="button"
        disabled={!text}
        onClick={this.shareWithLink}
        title="Поделиться">
        <ShareIcon _big />
    </Button>
</Toolbar> */
