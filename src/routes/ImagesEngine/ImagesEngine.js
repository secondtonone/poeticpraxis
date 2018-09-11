import { h, Component } from 'preact';
import imaged from '../../modules/imaged';

import {
    FieldEditableArea,
    Hint,
    SecondaryTitle,
    LeftedLayout,
    Container,
    List
} from '../../styles/components';

import { isTouchDevice } from '../../utils';

import Recorder from '../../components/Recorder';
import MatchList from '../../components/MatchList';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import ArrowBack from '../../components/IconSVG/ArrowBack';
import Widgets from '../../components/IconSVG/Widgets';
import Delete from '../../components/IconSVG/Delete';
import CheckCircle from '../../components/IconSVG/CheckCircle';
import Subject from '../../components/IconSVG/Subject';
import PlaylistAddCheck from '../../components/IconSVG/PlaylistAddCheck';
import SecondaryMenu from '../../components/SecondaryMenu';

import { MainSelect, FieldClearButton } from './styled';
import MessageBox from '../../components/MessageBox';

export default class ImagesEngine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textMessage: '',
            words: [],
            field: {},
            sharedText: '',
            actualHeight: window.innerHeight,
            initHeight: window.innerHeight,
            views: [
                {
                    value: 'material',
                    icon: <Subject />,
                    title: 'Материал',
                    disabled: false
                },
                {
                    value: 'words',
                    icon: <PlaylistAddCheck />,
                    title: 'Слова',
                    disabled: true
                }
            ]
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        let { views } = this.state;
        const { result } = this.props.engineState;

        if (result.length) {
            views[1].disabled = false;

            this.setState({
                views
            });
        }

        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

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
        let words =
            text
                .toLowerCase()
                .match(/[a-zA-ZА-Яа-яёЁ'-]+/g)
                .filter((n) => {
                    return /[^'-]/g.test(n);
                }) || [];

        const result = imaged(words, wordsNumber);

        let { views } = this.state;

        views[1].disabled = false;

        this.toTheTop();

        this.showMessage('Словосочетания составлены.');

        this.changeView('words');

        this.setState({
            views
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

        this.showMessage('Словосочетание добавлено.');

        this.props.setEngineState({
            pinned,
            result
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

    clearInput = () => {
        let text = '';

        this.toTheTop();

        this.props.setEngineState({
            text
        });
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

    render(
        {
            setEngineState,
            engineState: { result, text, pinned, wordsNumber, currentView }
        },
        { textMessage, views, actualHeight, initHeight }
    ) {
        const props = {
            onInput: this.handleTextInput,
            value: text,
            Textarea: FieldEditableArea,
            getMeasure: this.getMeasureField,
            placeHolder: 'Введите слова или вставьте текст...'
        };

        const wordNumberSelectOptions = [
            {
                value: 2,
                title: '2'
            },
            {
                value: 3,
                title: '3'
            }
        ];

        const secondMenu = [
            {
                value: 'material',
                icon: <Subject />,
                title: 'Материал',
                content: (
                    <div>
                        <Subject />
                        <div>Материал</div>
                    </div>
                ),
                disabled: views[0].disabled
            },
            {
                value: 'words',
                icon: <PlaylistAddCheck />,
                title: 'Слова',
                content: (
                    <div>
                        <PlaylistAddCheck />
                        <div>Слова</div>
                    </div>
                ),
                disabled: views[1].disabled
            }
        ];

        return (
            <section class="images-engine">
                <SecondaryMenu
                    items={secondMenu}
                    handler={this.changeView}
                    current={currentView}>
                    {currentView === 'material' && (
                        <Button
                            _rounded
                            _transparent
                            _small
                            disabled={!text.length}
                            type="button"
                            onClick={this.clearInput}
                            title="Стереть текст">
                            <Delete _middle />
                        </Button>
                    )}
                </SecondaryMenu>

                {!(actualHeight * 1.3 < initHeight) && (
                    
                <Button
                            _rounded
                            _main
                            _animated-up
                            type="button"
                            onClick={this.getResult}
                            disabled={!text}
                            title="Монтаж">
                            <Widgets _big />
                        </Button>
                    
                )}

                <LeftedLayout>
                    {currentView === 'material' && (
                        <List _animated>
                            <div class="work-field">
                                <Textarea {...props} />
                            </div>
                            {!isTouchDevice() && (
                                <Recorder
                                    _rounded
                                    _top-centred
                                    title="Запись"
                                    text={text}
                                    transmitState={setEngineState}
                                    showMessage={this.showMessage}
                                />
                            )}
                        </List>
                    )}

                    {currentView === 'words' && (
                        <List _animated>
                            <Container margin="0 0 32px">
                                <SecondaryTitle>Выбранные</SecondaryTitle>

                                <MatchList
                                    handler={this.deleteMatch}
                                    list={pinned}
                                    type={'cancel'}
                                />

                                {pinned.length ? null : (
                                    <Hint>
                                        Выберите сочетание,<br /> нажав на{' '}
                                        <Button _flat _transparent>
                                            <CheckCircle _small />
                                        </Button>
                                    </Hint>
                                )}
                                {pinned.length ? (
                                    <Container margin="8px 0 0">
                                        <Button
                                            _flat
                                            _transparent
                                            _long
                                            _light-gray
                                            type="button"
                                            onClick={this.toRhythmic}>
                                            Посмотреть ритм{' '}
                                            <ArrowBack _small _rotate-left />
                                        </Button>
                                    </Container>
                                ) : null}
                            </Container>

                            <Container margin="0 0 32px">
                                <SecondaryTitle>Сочетания</SecondaryTitle>
                                {result.length ? null : (
                                    <Hint>
                                        Нажмите снова на <Widgets _small />,<br />{' '}
                                        чтобы получить новые сочетаиния
                                    </Hint>
                                )}
                                <MatchList
                                    handler={this.pinMatch}
                                    list={result}
                                    type={'add'}
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
                                            Вернуться наверх{' '}
                                            <ArrowBack _small _rotate-right />
                                        </Button>
                                    </Container>
                                ) : null}
                            </Container>
                        </List>
                    )}
                </LeftedLayout>
                <MessageBox text={textMessage} bottom={190} />
            </section>
        );
    }
}

/* <FieldClearButton
    _rounded
    _top-centred
    disabled={!text.length}
    type="button"
    onClick={this.clearInput}
    title="Стереть текст">
    <Delete _small />
</FieldClearButton> */

/* <MainSelect
    label="Словосочетание из:"
    id="wordNumber"
    value={wordsNumber}
    onChange={this.setWordsNumber}
    options={wordNumberSelectOptions}
/> */
