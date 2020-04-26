import rhythmicModel from './rhythmicModel';
import {
    SET_RHYTHMIC_STATE,
    SET_WORDS_DICTIONARY,
    SHARING_TEXT
} from './rhythmicActions';

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

export default function rhythmicReducer(state = rhythmicModel, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
