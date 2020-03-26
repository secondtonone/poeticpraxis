import { h, Component } from 'preact';

import wordByNumber from '@utils/wordByNumber';
import isTouchDevice from '@utils/isTouchDevice';
import changePageTitle from '@utils/changePageTitle';

import { translations } from './translations';

import {
    getLongLink,
    sharing,
    encodeDictionary,
    linkToStateDecode
} from '@modules/sharing';

import {
    getToneModule,
    Tone,
    getInstrument,
    Instrument
} from '@modules/tone';

import Help from './Help';
import RhythmicMenu from './RhythmicMenu';

import Workfield from '@components/Workfield';
import MessageBox from '@components/MessageBox';
import Button from '@components/Button';
import Melody from '@components/Melody';
import Zoom from '@components/Zoom';

import KeyboardCapslock from '@icons/KeyboardCapslock';
import ContentCopy from '@icons/ContentCopy';
import ZoomInIcon from '@icons/ZoomIn';
import ZoomOut from '@icons/ZoomOut';
import Lock from '@icons/Lock';
import LockOpen from '@icons/LockOpen';
import ShareIcon from '@icons/Share';

import {
    List,
    LeftedLayout,
    ActionBar,
    Flex,
    TextMinor
} from '@styles/components';

import {
    StringPauseButton,
    StringPauseButtonMobile,
    CopyButton,
    FlexSided
} from './styled';

export default class Rhythmic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textMessage: '',
            zoomIn: false,
            isFocused: false,
            isEditable: true,
            currentView: 'rhythmic',
            isHelpInfoHidden: false
        };

        this.isDevice = isTouchDevice();

        this.stringPauseButton = null;
        this.sectionElement = null;
    }

    changeTitle = () => {
        changePageTitle(`${this.props.lang === 'ru' ? 'ПРОСОДИЯ' : 'PROSODY'}${
            this.props.rhythmicState.text
                ? ` - ${this.props.rhythmicState.text.substring(0, 30)}...`
                : ''}`);
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
            this.zoomOutHandler();
        } else {
            this.zoomInHandler();
        }
    };

    zoomInHandler = () => {
        if (!this.state.zoomIn) {
            const zoomIn = true;
            this.setState({
                zoomIn
            });

            this.workfield.changeZoomMode(zoomIn);
        }
    }

    zoomOutHandler = () => {
        if (this.state.zoomIn) {
            const zoomIn = false;
            this.setState({
                zoomIn
            });

            this.workfield.changeZoomMode(zoomIn);
        }
    }

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
        const sectionGap = this.sectionElement ? this.sectionElement.offsetTop : 196;

        const beginButtonGap = this.stringPauseButton.offsetTop;

        const buttonHeight = 19;

        let transform = `translateY(${
            e.pageY < sectionGap
                ? 0
                : Math.ceil(e.pageY - sectionGap - beginButtonGap - buttonHeight)
        }px)`;

        if (this.stringPauseButton) {
            requestAnimationFrame(() => {
                this.stringPauseButton.style.transform = transform;
            });
        }
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
            rhythmicState,
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
            currentView
        } = this.state;

        const {
            text,
            stringsDictionary,
            wordsCount = 0,
            mainMeter = {
                title: '',
                inPercent: 0
            }
        } = rhythmicState;

        const isDevice = this.isDevice;

        const wordsNumberString = `${wordsCount} ${wordByNumber(
            lang,
            wordsCount,
            translations[lang].rhythmic['WORDS_AMOUNT']
        )}`;

        const mainMeterString = `, ${mainMeter.title} - ${mainMeter.inPercent}%`;

        return (
            <section>
                <MessageBox text={textMessage} bottom={120} />
                <RhythmicMenu
                    handler={this.changeView}
                    current={currentView}
                    lang={lang}
                    text={text}
                />
                {currentView === 'rhythmic' && isDevice && !isFocused && (
                    <ActionBar>
                        <Button
                            _rounded
                            _transparent
                            type="button"
                            disabled={!text}
                            onClick={this.copyToClipboard}
                            title={translations[lang].rhythmic['COPY']}>
                            <ContentCopy _middle />
                        </Button>
                        <Button
                            _rounded
                            _transparent
                            type="button"
                            disabled={!text}
                            onClick={this.shareWithLink}
                            title={translations[lang].rhythmic['SHARE']}>
                            <ShareIcon _big />
                        </Button>

                        <Button
                            type="button"
                            _rounded
                            _transparent
                            onClick={this.zoomHandler}
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
                            onClick={this.changeMode}
                            title={
                                isEditable
                                    ? translations[lang].rhythmic['BLOCK']
                                    : translations[lang].rhythmic['UNBLOCK']
                            }>
                            {isEditable ? <Lock _big /> : <LockOpen _big />}
                        </Button>
                    </ActionBar>
                )}
                <LeftedLayout>
                    <Help lang={lang} />

                    {currentView === 'rhythmic' && (
                        <Zoom
                            onZoomIn={this.zoomHandler}
                            onZoomOut={this.zoomHandler}>
                            {isDevice && isFocused && (
                                <StringPauseButtonMobile
                                    _rounded
                                    _white
                                    _big
                                    type="button"
                                    onClick={this.makeCaesura}
                                    title={
                                        translations[lang].rhythmic['CAESURA']
                                    }>
                                    <KeyboardCapslock _big />
                                </StringPauseButtonMobile>
                            )}

                            <List
                                _animated
                                sidePaddingMobile={'0'}
                                ref={(ref) => (this.sectionElement = ref)}>
                                {!isDevice && (
                                    <Flex margin="0 0 16px">
                                        <CopyButton
                                            _rounded
                                            type="button"
                                            disabled={!text}
                                            onClick={this.copyToClipboard}
                                            title={
                                                translations[lang].rhythmic[
                                                    'COPY'
                                                ]
                                            }>
                                            <ContentCopy _middle />
                                        </CopyButton>
                                        <CopyButton
                                            _rounded
                                            type="button"
                                            disabled={!text}
                                            onClick={this.shareWithLink}
                                            title={
                                                translations[lang].rhythmic[
                                                    'SHARE'
                                                ]
                                            }>
                                            <ShareIcon _middle />
                                        </CopyButton>
                                    </Flex>
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
                                        title={
                                            translations[lang].rhythmic[
                                                'CAESURA'
                                            ]
                                        }>
                                        <KeyboardCapslock />
                                    </Button>
                                </StringPauseButton>

                                <Workfield
                                    text={text}
                                    placeHolder={`${translations[lang].placeholders['RHYTHMICS']}...`}
                                    readOnly={!isEditable}
                                    lang={lang}
                                    wordsDictionary={wordsDictionary}
                                    stringsDictionary={stringsDictionary}
                                    onMouseMove={this.mouseTracking}
                                    onError={this.showMessage}
                                    onFocus={this.focusHandler}
                                    onUpdate={setRhytmicState}
                                    setWordsDictionary={setWordsDictionary}
                                    ref={this.workfieldRef}
                                />

                                <FlexSided justify="flex-end">
                                    <TextMinor>
                                        {wordsCount ? wordsNumberString : null}
                                        {wordsCount && mainMeter
                                            ? mainMeterString
                                            : null}
                                    </TextMinor>
                                </FlexSided>
                            </List>
                        </Zoom>
                    )}

                    {currentView === 'melody' && (
                        <List>
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
