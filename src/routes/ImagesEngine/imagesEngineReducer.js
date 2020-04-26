import imagesEngineModel from './imagesEngineModel';
import { SET_ENGINE_STATE } from './imagesEngineActions';

const ACTION_HANDLERS = {
    [SET_ENGINE_STATE]: (state, action) =>
        Object.assign({}, state, {
            currentEngineState: {
                ...state.currentEngineState,
                ...action.payload
            }
        })
};

export default function engineReducer(state = imagesEngineModel, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
