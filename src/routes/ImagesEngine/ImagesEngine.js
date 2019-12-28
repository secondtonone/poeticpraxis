import React, { Component } from 'react';

import { imaged, stringToWords } from '../../modules/imaged';
import { copying } from '../../modules/copying';
import { getWords } from '../../modules/dictionary';
import { isTouchDevice } from '../../utils';
import { translations } from './translations';

import Recorder from '../../components/Recorder';
import MatchList from '../../components/MatchList';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import ArrowBack from '../../components/IconSVG/ArrowBack';
import Widgets from '../../components/IconSVG/Widgets';
import Delete from '../../components/IconSVG/Delete';
import CheckCircle from '../../components/IconSVG/CheckCircle';
import ContentCopy from '../../components/IconSVG/ContentCopy';
import Subject from '../../components/IconSVG/Subject';
import PlaylistAddCheck from '../../components/IconSVG/PlaylistAddCheck';
import WordsIcon from '../../components/IconSVG/Words';
import SecondaryMenu from '../../components/SecondaryMenu';
import Info from '../../components/Info';
import MessageBox from '../../components/MessageBox';

import {
    FieldEditableArea,
    Hint,
    SecondaryTitle,
    LeftedLayout,
    Container,
    List,
    Link,
    ActionBar
} from '../../styles/components';

import { ButtonContainer, ButtonCentredContainer } from './styled';

export default class ImagesEngine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textMessage: '',
            words: stringToWords(props.engineState.text),
            field: {},
            sharedText: '',
            actualHeight: window.innerHeight,
            initHeight: window.innerHeight,
            isDisabledWordsview: !props.engineState.result.length
        };

        this.clearCount = false;
    }

    changeTitle = () => {
        document.title = `POETIC PRAXIS | ${
            this.props.lang === 'ru' ? 'МАШИНА ОБРАЗОВ' : 'EMAGES ENGINE'
        }${
            this.props.engineState.text
                ? ` - ${this.props.engineState.text.substring(0, 30)}...`
                : ''
        }`;
    };
    componentDidUpdate(prevProps) {
        if (this.props.lang !== prevProps.lang) {
            this.changeTitle();
        }
    }
    componentDidMount() {
        this.changeTitle();

        window.scrollTo(0, 0);

        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    getWords = async () => {
        try {
            const prevText = this.props.engineState.text;
            const wordsLength = this.state.words.length;

            const text = await getWords(prevText, wordsLength);

            this.props.setEngineState({
                text
            });
        } catch (error) {
            this.showMessage('Слова не хотят подбираться, попробуйте снова.');
        }
    };
    updateDimensions = () => {
        this.setState({
            actualHeight: window.innerHeight
        });
    };

    handleTextInput = (e) => {
        let text = e.target.value;

        this.props.setEngineState({
            text
        });

        this.setState({
            words: stringToWords(text)
        });
    };

    getMeasureField = (field) => {
        this.setState({
            field
        });
    };

    changeView = (currentView) => {
        this.props.setEngineState({
            currentView
        });
    };

    getResult = () => {
        /*let words = this.state.text.toLowerCase().match(/[a-zA-ZА-Яа-яёЁ\-]+/g) || [];*/
        const { text, wordsNumber } = this.props.engineState;

        let words = stringToWords(text);

        const result = imaged(words, wordsNumber);

        let { isDisabledWordsview } = this.state;

        isDisabledWordsview = false;

        this.toTheTop();

        this.showMessage(translations[this.props.lang].messages['PAIRS_READY']);

        this.changeView('words');

        this.setState({
            isDisabledWordsview
        });

        this.props.setEngineState({
            result
        });
    };

    setWordsNumber = (e) => {
        const wordsNumber = e.target.value;

        this.props.setEngineState({
            wordsNumber
        });
    };

    pinMatch = (e) => {
        if (!e.target.dataset.index) {
            return false;
        }

        const { result, pinned } = this.props.engineState;

        const index = e.target.dataset.index;

        const words = result.splice(index, 1);

        const match = words[0].join(' ');

        pinned.push(match);

        this.showMessage(translations[this.props.lang].messages['PAIR_ADDED']);

        this.props.setEngineState({
            pinned,
            result
        });
    };

    changePin = (index, value) => {
        let { pinned } = this.props.engineState;

        pinned[index] = value;

        this.props.setEngineState({
            pinned
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

    deleteMatch = (e) => {
        if (!e.target.dataset.index) {
            return false;
        }

        const { pinned } = this.props.engineState;

        const index = e.target.dataset.index;

        pinned.splice(index, 1);

        this.props.setEngineState({
            pinned
        });
    };

    clearInput = (e) => {
        if (!this.clearCount) {
            this.clearCount = true;
            this.showMessage(
                translations[this.props.lang].messages['CLICK_MORE']
            );
        } else {
            this.clearCount = false;
            this.toTheTop();

            this.props.setEngineState({
                text: ''
            });

            this.setState({
                words: []
            });
        }
    };

    toRhythmic = () => {
        const { pinned } = this.props.engineState;

        const sharedText = pinned.join('\n');

        this.props.sharingText(sharedText);

        this.props.history.push('/rhythmic');
    };

    toTheTop = () => {
        window.scrollTo(0, 0);
    };

    focusHandler = (isFocused) => {
        setTimeout(() => {
            this.setState({
                isFocused
            });
        }, 100);
    };

    copyToClipboard = () => {
        copying(this.props.engineState.pinned.join('\n'));
        this.showMessage(
            translations[this.props.lang].messages['PAIRS_COPIED']
        );
    };

    render() {
        const {
            setEngineState,
            engineState: {
                result,
                text,
                pinned,
                wordsNumber,
                currentView = 'material'
            },
            lang = 'ru'
        } = this.props;

        const {
            textMessage,
            isDisabledWordsview,
            actualHeight,
            initHeight
        } = this.state;

        const props = {
            onInput: this.handleTextInput,
            value: text,
            Textarea: FieldEditableArea,
            getMeasure: this.getMeasureField,
            placeHolder: `${translations[lang].placeholders['ENGINE']}...`
        };

        const secondMenu = [
            {
                value: 'material',
                icon: <Subject />,
                title: translations[lang].engineMenu['MATERIAL'],
                content: (
                    <div>
                        <Subject />
                        <div>{translations[lang].engineMenu['MATERIAL']}</div>
                    </div>
                ),
                disabled: false
            },
            {
                value: 'words',
                icon: <PlaylistAddCheck />,
                title: translations[lang].engineMenu['WORDS'],
                content: (
                    <div>
                        <PlaylistAddCheck />
                        <div>{translations[lang].engineMenu['WORDS']}</div>
                    </div>
                ),
                disabled: isDisabledWordsview
            }
        ];

        const hideWithKeyboard = !(actualHeight * 1.3 < initHeight);

        const isDevice = isTouchDevice();

        return (
            <section>
                <SecondaryMenu
                    items={secondMenu}
                    handler={this.changeView}
                    current={currentView}
                />
                {hideWithKeyboard && (
                    <ActionBar>
                        {currentView === 'material' && (
                            <Button
                                _rounded
                                _transparent
                                disabled={!text.length}
                                type="button"
                                onClick={this.clearInput}
                                title="Стереть текст">
                                <Delete _middle />
                            </Button>
                        )}
                        {currentView === 'material' && lang === 'ru' && (
                            <Button
                                _rounded
                                _transparent
                                type="button"
                                onClick={this.getWords}
                                title="Получить слова">
                                <WordsIcon _middle />
                            </Button>
                        )}
                    </ActionBar>
                )}

                {hideWithKeyboard && (
                    <Button
                        _rounded
                        _main
                        _animated-up
                        _centred
                        type="button"
                        onClick={this.getResult}
                        disabled={!text}
                        title="Монтаж">
                        <Widgets _big />
                    </Button>
                )}

                <LeftedLayout>
                    {!text && (
                        <Info>
                            {
                                translations[this.props.lang].messages[
                                    'HOW_WORKS'
                                ]
                            }{' '}
                            <Link href="/about#images-engine">
                                {
                                    translations[this.props.lang].messages[
                                        'LEARN_MORE'
                                    ]
                                }
                            </Link>
                        </Info>
                    )}

                    {currentView === 'material' && (
                        <List _animated>
                            {!isDevice && (
                                <ButtonCentredContainer>
                                    <Recorder
                                        _rounded
                                        lang={lang}
                                        title="Запись"
                                        text={text}
                                        transmitState={setEngineState}
                                        showMessage={this.showMessage}
                                    />
                                    {lang === 'ru' && (
                                        <Button
                                            _flat
                                            _transparent
                                            type="button"
                                            onClick={this.getWords}
                                            title="Получить слова">
                                            <WordsIcon
                                                _small
                                                padding="0 8px 0 0"
                                            />
                                            Получить слова
                                        </Button>
                                    )}
                                </ButtonCentredContainer>
                            )}
                            <div>
                                <Textarea {...props} />
                            </div>
                        </List>
                    )}

                    {currentView === 'words' && (
                        <List _animated>
                            <Container margin="0 0 32px">
                                <SecondaryTitle>
                                    {translations[lang].matchList['FAVORITES']}
                                </SecondaryTitle>

                                <MatchList
                                    handler={this.deleteMatch}
                                    list={pinned}
                                    type={'cancel'}
                                    changeItem={this.changePin}
                                />

                                {pinned.length ? null : (
                                    <Hint>
                                        {
                                            translations[lang].matchList[
                                                'FAVOR_HINT'
                                            ]
                                        }
                                    </Hint>
                                )}
                                {pinned.length ? (
                                    <ButtonContainer>
                                        <Button
                                            _flat
                                            _transparent
                                            type="button"
                                            margin="8px 8px"
                                            onClick={this.copyToClipboard}>
                                            {
                                                translations[lang].matchList[
                                                    'COPY'
                                                ]
                                            }{' '}
                                            <ContentCopy
                                                _small
                                                padding="0 0 0 8px"
                                            />
                                        </Button>
                                        <Button
                                            _flat
                                            _transparent
                                            _light-gray
                                            type="button"
                                            margin="8px 8px"
                                            onClick={this.toRhythmic}>
                                            {
                                                translations[lang].matchList[
                                                    'SEE_RHYTHM'
                                                ]
                                            }{' '}
                                            <ArrowBack
                                                _small
                                                _rotate-left
                                                padding="0 8px 0 0"
                                            />
                                        </Button>
                                    </ButtonContainer>
                                ) : null}
                            </Container>

                            <Container margin="0 0 32px">
                                <SecondaryTitle>
                                    {translations[lang].matchList['PAIRS']}
                                </SecondaryTitle>
                                {result.length ? null : (
                                    <Hint>
                                        {
                                            translations[lang].matchList[
                                                'PAIRS_HINT'
                                            ][0]
                                        }{' '}
                                        <Widgets _small />,<br />{' '}
                                        {
                                            translations[lang].matchList[
                                                'PAIRS_HINT'
                                            ][1]
                                        }
                                    </Hint>
                                )}
                                <MatchList
                                    handler={this.pinMatch}
                                    list={result}
                                    type={'add'}
                                    compact
                                />

                                {result.length > 30 ? (
                                    <Container margin="8px 0 0">
                                        <Button
                                            _flat
                                            _transparent
                                            _long
                                            _light-gray
                                            type="button"
                                            onClick={this.toTheTop}>
                                            {
                                                translations[lang].matchList[
                                                    'RETURN'
                                                ]
                                            }{' '}
                                            <ArrowBack _small _rotate-right />
                                        </Button>
                                    </Container>
                                ) : null}
                            </Container>
                        </List>
                    )}
                </LeftedLayout>
                <MessageBox text={textMessage} bottom={104} />
            </section>
        );
    }
}
