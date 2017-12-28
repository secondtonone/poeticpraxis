import { SET_RHYTMIC_STATE, SET_WORDS_DICTIONARY } from './RhythmicActions';

const ACTION_HANDLERS = {
    [SET_RHYTMIC_STATE]: (state, action) => Object.assign({}, state, {
        currentRhythmicState: action.payload
    }),
    [SET_WORDS_DICTIONARY]: (state, action) => Object.assign({}, state, {
        wordsDictionary: action.payload
    })
}

const initialState = {
    currentRhythmicState: {
        text:'',
        strings:{},
        orderStrings: [],
        elements: {},
        hashTable: {},
        tags: [],
        stringsDictionary: {},
        stringLinks: {},
        wordLinks: {},
        field: {}
    },
    wordsDictionary: {}
}

export default function rhythmicReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}