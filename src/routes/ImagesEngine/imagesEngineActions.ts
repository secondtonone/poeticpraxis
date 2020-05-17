import { IImagesEngineModel } from './imagesEngineModel';

export const SET_ENGINE_STATE: string = 'SET_ENGINE_STATE';
export const SHARING_TEXT: string = 'SHARING_TEXT';

export interface SetEngineState {
    type: typeof SET_ENGINE_STATE;
    payload: Partial<IImagesEngineModel>;
}

export function setEngineState(payload: Partial<IImagesEngineModel>): SetEngineState {
    return {
        type: SET_ENGINE_STATE,
        payload,
    };
}

export interface SharingText {
    type: typeof SHARING_TEXT;
    payload: string;
}

export function sharingText(payload: string): SharingText {
    return {
        type: SHARING_TEXT,
        payload,
    };
}

export type ImagesEngineActionTypes = SetEngineState | SharingText;
