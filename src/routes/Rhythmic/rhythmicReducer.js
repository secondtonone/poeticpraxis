import { SET_RHYTMIC_STATE } from './RhythmicActions';

const ACTION_HANDLERS = {
    [SET_RHYTMIC_STATE]: (state, action) => Object.assign({}, state, {
        currentRhythmicState: action.payload
    })
}

const initialState = {
    currentRhythmicState: {
        text:'',
        strings:{},
        orderStrings: [],
        elements: {},
        tags: [],
        stringsDictionary: {},
        stringLinks: {},
        wordsDictionary: {},
        wordLinks: {},
        field: {}
    }
}

export default function rhythmicReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}