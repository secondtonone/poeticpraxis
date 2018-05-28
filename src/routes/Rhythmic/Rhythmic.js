import { h, Component } from 'preact';

import { isTouchDevice } from '../../utils';

import Workfield from '../../components/Workfield';
import MessageBox from '../../components/MessageBox';
import Button from '../../components/Button';
import Toolbar from '../../components/Toolbar';
import Toggle from '../../components/Toggle';

import KeyboardCapslock from '../../components/IconSVG/KeyboardCapslock';
import ContentCopy from '../../components/IconSVG/ContentCopy';
import ZoomInIcon from '../../components/IconSVG/ZoomIn';
import ZoomOut from '../../components/IconSVG/ZoomOut';
import Lock from '../../components/IconSVG/Lock';
import LockOpen from '../../components/IconSVG/LockOpen';
import ViewDay from '../../components/IconSVG/ViewDay';
import ArrowBack from '../../components/IconSVG/ArrowBack';

import { List, InlineContainer } from '../../styles/components';

import {
    ChangeModeButton,
    StringPauseButton,
    StringPauseButtonMobile,
    CopyButton,
    CopyButtonMobile,
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
            isEditable: !isTouchDevice() || !props.rhythmicState.text,
            isDevice: isTouchDevice(),
            isToolbarHidden: true
        };

        this.mouseTrackingTimer = 0;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

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
        this.showMessage('Текст скопирован в буфер.');
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

    getChildData = (data) => {
        this.setState(data);
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
            rhythmicState,
            wordsDictionary,
            variant
        },
        {
            renderCaesuraButtonStyle,
            textMessage,
            zoomIn,
            isEditable,
            isFocused,
            isToolbarHidden,
            isDevice
        }
    ) {
        return (
            <section>
                <MessageBox text={textMessage} bottom={216} />

                {isDevice &&
                    isFocused && (
                        <StringPauseButtonMobile
                            _rounded
                            _big
                            type="button"
                            onClick={this.makeCaesura}
                            title="Поставить паузу">
                            <KeyboardCapslock _big />
                        </StringPauseButtonMobile>
                    )}
                {isDevice &&
                    !isFocused && (
                        <ToolbarButton
                            type="button"
                            _rounded
                            _main
                            _white
                            _animated-up
                            onClick={this.triggerToolbar}
                            title="Инструменты">
                            {isToolbarHidden ? (
                                <ViewDay _big />
                            ) : (
                                <ArrowBack _big />
                            )}
                        </ToolbarButton>
                    )}

                <List _animated>
                    {!isDevice && (
                        <CopyButton
                            _rounded
                            _top-centred
                            type="button"
                            disabled={!rhythmicState.text}
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

                    <div onMouseMove={this.mouseTracking}>
                        <Workfield
                            readOnly={!isEditable}
                            text={rhythmicState.text}
                            transmitState={setRhytmicState}
                            focusHandler={this.focusHandler}
                            setWordsDictionary={setWordsDictionary}
                            wordsDictionary={wordsDictionary}
                            stringDictionary={rhythmicState.stringsDictionary}
                            ref={(ref) => {
                                this.workfield = ref;
                            }}
                        />
                    </div>
                </List>
                <Toolbar isHidden={isToolbarHidden}>
                    <Button
                        type="button"
                        _rounded
                        _transparent
                        disabled={!rhythmicState.text}
                        onClick={this.changeMode}
                        title={isEditable ? 'Блокировать' : 'Разблокировать'}>
                        {isEditable ? <Lock _big /> : <LockOpen _big />}
                    </Button>
                    {!isEditable && (
                        <Button
                            type="button"
                            _rounded
                            _transparent
                            onClick={this.changeZoomMode}
                            title={zoomIn ? 'Уменьшить' : 'Увеличить'}>
                            {zoomIn ? <ZoomOut _big /> : <ZoomInIcon _big />}
                        </Button>
                    )}
                    <Button
                        _rounded
                        _transparent
                        type="button"
                        disabled={!rhythmicState.text}
                        onClick={this.copyToClipboard}
                        title="Копировать в текстовый редактор">
                        <ContentCopy _big />
                    </Button>
                </Toolbar>
            </section>
        );
    }
}
