import imagesEngineModel, { IImagesEngineModel } from './imagesEngineModel';
import {
    SET_ENGINE_STATE,
    SetEngineState,
    ImagesEngineActionTypes,
} from './imagesEngineActions';

type Handler = (
    state: IImagesEngineModel,
    action: ImagesEngineActionTypes
) => IImagesEngineModel;

const ACTION_HANDLERS: {
    [key: string]: Handler;
} = {
    [SET_ENGINE_STATE]: (state: IImagesEngineModel, action: SetEngineState) =>
        Object.assign({}, state, {
            currentEngineState: {
                ...state.currentEngineState,
                ...action.payload,
            },
        }),
};

export type EngineReducer = (
    state: IImagesEngineModel,
    action: ImagesEngineActionTypes
) => IImagesEngineModel;

const engineReducer: EngineReducer = (
    state = imagesEngineModel,
    action
) => {
    const handler: Handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}

export default engineReducer;
