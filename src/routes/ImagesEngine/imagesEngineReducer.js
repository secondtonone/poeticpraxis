import { SET_ENGINE_STATE } from './ImagesEngineActions.js';

const ACTION_HANDLERS = {
    [SET_ENGINE_STATE]: (state, action) => Object.assign({}, state, {
        currentEngineState: action.payload
    })
}

const initialState = {
    currentEngineState: {
        result:[],
        isListHidden: true,
        isExpanded: true,
        text:'',
        words: [],
        field:{},
        pinned: [],
        wordsNumber: 2,
        sharedText: ''
    }
}

export default function engineReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}