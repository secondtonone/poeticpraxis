import { h, Component } from 'preact';

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

import Help from './Help';

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

import {
    List,
    LeftedLayout,
    ActionBar
} from '../../styles/components';

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
            textMessage: '',
            zoomIn: false,
            isFocused: false,
            isEditable: true,
            isDevice: isTouchDevice(),
            currentView: 'rhythmic',
            rhythmicState: {},
            isHelpInfoHidden: false
        };

        this.mouseTrackingTimer = 0;
        this.stringPauseButton = null;
        this.sectionElement = null;
    }

    changeTitle = () => {
        document.title = `POETIC PRAXIS | ${
            this.props.lang === 'ru' ? 'ПРОСОДИЯ' : 'PROSODY'
        }${
            this.props.rhythmicState.text
                ? ` - ${this.props.rhythmicState.text.substring(0, 30)}...`
                : ''
        }`;
    };
    componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) {
            this.changeTitle();
        }
    }
    async componentDidMount() {
        this.changeTitle();

        window.scrollTo(0, 0);

        if (URLSearchParams) {
            this.getShared();
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
        } catch (e) {
            this.showMessage(translations[this.props.lang].messages['NET']);
        }
    }

    getShared = () => {
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
    };

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

    getDataFromWorkfield = (rhythmicState) => {
        this.setState({
            rhythmicState
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
        const gap = this.sectionElement ? this.sectionElement.offsetTop : 168;

        let transform = `translateY(${
            e.pageY - gap < 0 ? 0 : Math.floor(e.pageY - gap - 48)
        }px)`;

        this.mouseTrackingTimer = setTimeout(() => {
            if (this.stringPauseButton) {
                this.stringPauseButton.style.transform = transform;
            }
        }, 150);
    };

    zoomHandler = () => {
        if (this.state.isEditable) {
            this.changeMode();
        }
        this.changeZoomMode();
    };

    workfieldRef = (ref) => {
        this.workfield = ref;
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
            textMessage,
            zoomIn,
            isEditable,
            isFocused,
            isToolbarHidden,
            isDevice,
            currentView,
            rhythmicState
        } = this.state;

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
                {currentView === 'rhythmic' && isDevice && !isFocused && (
                    <ActionBar>
                        <Button
                            _rounded
                            _transparent
                            type="button"
                            disabled={!text}
                            onClick={this.copyToClipboard}
                            title="Копировать в текстовый редактор">
                            <ContentCopy _middle />
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
                            onClick={this.zoomHandler}
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
                    {lang === 'ru' && <Help lang={lang} />}
                    
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

                            <List
                                _animated
                                ref={(ref) => (this.sectionElement = ref)}>
                                {!isDevice && (
                                    <ButtonContainer>
                                        <CopyButton
                                            _rounded
                                            type="button"
                                            disabled={!text}
                                            onClick={this.copyToClipboard}
                                            title="Копировать в текстовый редактор">
                                            <ContentCopy _middle />
                                        </CopyButton>
                                        <CopyButton
                                            _rounded
                                            type="button"
                                            disabled={!text}
                                            onClick={this.shareWithLink}
                                            title="Поделиться">
                                            <ShareIcon _middle />
                                        </CopyButton>
                                    </ButtonContainer>
                                )}

                                <StringPauseButton
                                    ref={(ref) =>
                                        (this.stringPauseButton = ref)
                                    }>
                                    <Button
                                        _rounded
                                        _middle
                                        type="button"
                                        onClick={this.makeCaesura}
                                        title="Поставить паузу">
                                        <KeyboardCapslock />
                                    </Button>
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
                                    lang={lang}
                                    placeHolder={`${translations[lang].placeholders['RHYTHMICS']}...`}
                                    ref={this.workfieldRef}
                                />
                            </List>
                        </div>
                    )}
                    {currentView === 'melody' && (
                        <List _animated>
                            <Melody
                                lang={lang}
                                variant={variant}
                                rhythmicState={rhythmicState}
                            />
                        </List>
                    )}
                </LeftedLayout>
            </section>
        );
    }
}
