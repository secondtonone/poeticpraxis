import { SET_ENGINE_STATE } from './ImagesEngineActions.js';

const ACTION_HANDLERS = {
    [SET_ENGINE_STATE]: (state, action) =>
        Object.assign({}, state, {
            currentEngineState: {
                ...state.currentEngineState,
                ...action.payload
            }
        })
};

const initialState = {
    currentEngineState: {
        result: [],
        text: '',
        pinned: [],
        wordsNumber: 2,
        currentView: 'material'
    }
};

export default function engineReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
