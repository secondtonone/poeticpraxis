import { h, Component } from 'preact';
import { isTouchDevice } from '../../utils';
import { translations } from './translations';
import { getLongLink, sharing } from '../../modules/sharing';

import Workfield from '../../components/Workfield';
import MessageBox from '../../components/MessageBox';
import Button from '../../components/Button';
import Toolbar from '../../components/Toolbar';
import SecondaryMenu from '../../components/SecondaryMenu';
import Settings from '../../components/Settings';
import Melody from '../../components/Melody';

import KeyboardCapslock from '../../components/IconSVG/KeyboardCapslock';
import ContentCopy from '../../components/IconSVG/ContentCopy';
import ZoomInIcon from '../../components/IconSVG/ZoomIn';
import ZoomOut from '../../components/IconSVG/ZoomOut';
import Lock from '../../components/IconSVG/Lock';
import LockOpen from '../../components/IconSVG/LockOpen';
import ViewDay from '../../components/IconSVG/ViewDay';
import ArrowBack from '../../components/IconSVG/ArrowBack';
import MelodyIcon from '../../components/IconSVG/Melody';
import RhythmIcon from '../../components/IconSVG/RhythmIcon';
import ShareIcon from '../../components/IconSVG/Share';

import { List, LeftedLayout } from '../../styles/components';

import {
    StringPauseButton,
    StringPauseButtonMobile,
    CopyButton,
    ToolbarButton
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

    componentDidMount() {
        window.scrollTo(0, 0);

        if (URLSearchParams) {
            const searchParams = new URLSearchParams(location.search);

            let sharedText = searchParams.get('shared');

            if (searchParams.get('shared')) {
                try {
                    sharedText = JSON.parse(sharedText);

                    const text = sharedText.text || '';
                    /* const stringsDictionary =
                        sharedText.stringsDictionary || {}; */

                    if (text) {
                        this.props.setRhytmicState({
                            text /* ,
                            stringsDictionary */
                        });
                    }
                } catch (error) {
                    this.showMessage(
                        translations[this.props.lang].messages['WRONG']
                    );
                }
            }
        }
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

        const sharedText = JSON.stringify({
            text /* ,
            stringsDictionary */
        });

        let link = getLongLink(sharedText);

        /* try {
            link = await getShortLink(sharedText);
        } catch (error) {
            link = getLongLink(sharedText);
        } */

        sharing(link);

        this.showMessage(translations[this.props.lang].messages['COPIED']);
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

    render(
        {
            setRhytmicState,
            setWordsDictionary,
            rhythmicState: { text, stringsDictionary },
            wordsDictionary,
            lang = 'ru',
            variant = 'light'
        },
        {
            renderCaesuraButtonStyle,
            textMessage,
            zoomIn,
            isEditable,
            isFocused,
            isToolbarHidden,
            isDevice,
            currentView,
            rhytmicState
        }
    ) {
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
                <MessageBox text={textMessage} bottom={216} />
                <SecondaryMenu
                    items={secondMenu}
                    handler={this.changeView}
                    current={currentView}>
                    <Settings />
                </SecondaryMenu>
                <LeftedLayout>
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
                            {isDevice && !isFocused && isToolbarHidden && (
                                <ToolbarButton
                                    type="button"
                                    _rounded
                                    _main
                                    _black
                                    _animated-up
                                    onClick={this.triggerToolbar}
                                    title="Инструменты">
                                    <ViewDay _big />
                                </ToolbarButton>
                            )}
                            <List _animated>
                                {!isDevice && (
                                    <CopyButton
                                        _rounded
                                        _top-centred
                                        type="button"
                                        disabled={!text}
                                        onClick={this.copyToClipboard}
                                        title="Копировать в текстовый редактор">
                                        <ContentCopy _small />
                                    </CopyButton>
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

                            <Toolbar isHidden={isToolbarHidden}>
                                <Button
                                    _rounded
                                    _transparent
                                    type="button"
                                    onClick={this.triggerToolbar}
                                    title="Закрыть">
                                    <ArrowBack _big />
                                </Button>
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
                            </Toolbar>
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
