import {
    SET_RHYTHMIC_STATE,
    SET_WORDS_DICTIONARY,
    SHARING_TEXT
} from './RhythmicActions';

const ACTION_HANDLERS = {
    [SET_RHYTHMIC_STATE]: (state, action) =>
        Object.assign({}, state, {
            currentRhythmicState: {
                ...state.currentRhythmicState,
                ...action.payload
            }
        }),
    [SET_WORDS_DICTIONARY]: (state, action) =>
        Object.assign({}, state, {
            wordsDictionary: action.payload
        }),
    [SHARING_TEXT]: (state, action) =>
        Object.assign({}, state, {
            currentRhythmicState: {
                text: action.payload
            }
        })
};

const initialState = {
    currentRhythmicState: {
        text: '',
        stringsDictionary: {},
        wordsCount: 0,
        mainMeter: {
            title: '',
            inPercent: 0
        },
        strings: {},
        elements: {},
        orderStrings: []
    },
    wordsDictionary: {}
};

export default function rhythmicReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
