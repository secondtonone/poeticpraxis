import { h, Component } from 'preact';

import { imaged, stringToWords } from '@modules/imaged';
import { copying } from '@modules/copying';
import { getWords } from '@modules/dictionary';

import wordByNumber from '@utils/wordByNumber';
import isSupportRecognition from '@utils/isSupportRecognition';
import isTouchDevice from '@utils/isTouchDevice';

import { translations } from './translations';

import Recorder from '@components/Recorder';
import MatchList from '@components/MatchList';
import Textarea from '@components/Textarea';
import Button from '@components/Button';
import MessageBox from '@components/MessageBox';

import ArrowBack from '@icons/ArrowBack';
import Widgets from '@icons/Widgets';
import Delete from '@icons/Delete';
import ContentCopy from '@icons/ContentCopy';
import WordsIcon from '@icons/Words';

import {
    FieldEditableArea,
    Hint,
    SecondaryTitle,
    LeftedLayout,
    Container,
    Flex,
    List,
    Link,
    TextMinor,
    ActionBar
} from '@styles/components';

import Help from './Help';
import ImagesEngineMenu from './ImagesEngineMenu';

import { ButtonContainer, MainButton } from './styled';

export default class ImagesEngine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textMessage: '',
            words: stringToWords(props.engineState.text),
            field: {},
            sharedText: '',
            isDisabledWordsview: !props.engineState.result.length
        };

        this.clearCount = false;

        this.initHeight = window.innerHeight;
    }

    changeTitle = () => {
        document.title = `POETIC PRAXIS | ${
            this.props.isRusLang ? 'МАШИНА ОБРАЗОВ' : 'EMAGES ENGINE'
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
                currentView = 'material'
            },
            lang = 'ru'
        } = this.props;

        const { textMessage, isDisabledWordsview } = this.state;

        const wordsNumber = stringToWords(text).length;

        const heightForKeyboard = Math.floor(this.initHeight / 1.3);

        const isDevice = isTouchDevice();

        const isRusLang = lang === 'ru';

        return (
            <section>
                <ImagesEngineMenu
                    isDisabledWordsview={isDisabledWordsview}
                    handler={this.changeView}
                    current={currentView}
                    lang={lang}
                />
                <ActionBar minHeight={`${heightForKeyboard}px`}>
                    {currentView === 'material' && (
                        <Button
                            _rounded
                            _transparent
                            disabled={!text.length}
                            type="button"
                            onClick={this.clearInput}
                            title={translations[lang].engine['CLEAR']}>
                            <Delete _middle />
                        </Button>
                    )}
                    {currentView === 'material' && isRusLang && (
                        <Button
                            _rounded
                            _transparent
                            type="button"
                            onClick={this.getWords}
                            title={translations[lang].engine['GET']}>
                            <WordsIcon _middle />
                        </Button>
                    )}
                </ActionBar>
                {isDevice ? (
                    <MainButton
                        _rounded
                        _main
                        _animated-up
                        _centred
                        type="button"
                        minHeight={`${heightForKeyboard}px`}
                        onClick={this.getResult}
                        disabled={!text}
                        title={translations[lang].engine['MONTAGE']}>
                        <Widgets _big />
                    </MainButton>
                ) : (
                    <MainButton
                        _main
                        _action
                        _animated-up
                        width="160px"
                        size={16}
                        type="button"
                        disabled={!text}
                        onClick={this.getResult}>
                        <Widgets _small />{' '}
                        {translations[lang].engine['MONTAGE']}
                    </MainButton>
                )}
                <LeftedLayout>
                    <Help lang={lang} />

                    {currentView === 'material' && (
                        <List _animated>
                            {!isDevice && (
                                <Container
                                    maxWidth="380px"
                                    width="100%"
                                    margin="0 auto">
                                    <Flex
                                        justify={
                                            isRusLang && isSupportRecognition()
                                                ? 'space-between'
                                                : 'center'
                                        }>
                                        <Recorder
                                            lang={lang}
                                            title={
                                                translations[lang].engine[
                                                    'RECORD'
                                                ]
                                            }
                                            text={text}
                                            transmitState={setEngineState}
                                            showMessage={this.showMessage}
                                        />
                                        {isRusLang && (
                                            <Button
                                                _flat
                                                _transparent
                                                type="button"
                                                onClick={this.getWords}
                                                title={
                                                    translations[lang].engine[
                                                        'GET'
                                                    ]
                                                }>
                                                <WordsIcon
                                                    _small
                                                    padding="0 8px 0 0"
                                                />
                                                {
                                                    translations[lang].engine[
                                                        'GET'
                                                    ]
                                                }
                                            </Button>
                                        )}
                                    </Flex>
                                </Container>
                            )}
                            <div>
                                <Textarea
                                    onInput={this.handleTextInput}
                                    value={text}
                                    Textarea={FieldEditableArea}
                                    getMeasure={this.getMeasureField}
                                    placeHolder={`${translations[lang].placeholders['ENGINE']}...`}
                                />
                            </div>
                            <Flex justify="flex-end">
                                <TextMinor>
                                    {wordsNumber
                                        ? `${wordsNumber} ${wordByNumber(
                                            lang,
                                            wordsNumber,
                                            translations[lang].engine[
                                                'WORDS_AMOUNT'
                                            ]
                                        )}`
                                        : null}
                                </TextMinor>
                            </Flex>
                        </List>
                    )}

                    {currentView === 'words' && (
                        <List _animated>
                            <Container margin="0 0 32px">
                                <SecondaryTitle>
                                    {translations[lang].matchList['FAVORITES']}{' '}
                                    <TextMinor>({pinned.length})</TextMinor>
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
                                    {translations[lang].matchList['PAIRS']}{' '}
                                    <TextMinor>({result.length})</TextMinor>
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
                                    <Flex
                                        justify={
                                            isDevice
                                                ? 'center'
                                                : 'space-between'
                                        }
                                        margin="8px 0 0">
                                        <Button
                                            _flat
                                            _transparent
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
                                    </Flex>
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
