import IImagesEngineModel from '@typings/ImagesEngineModel';

export const SET_ENGINE_STATE = 'SET_ENGINE_STATE';
export const SHARING_TEXT = 'SHARING_TEXT';

export interface SetEngineState {
    type: typeof SET_ENGINE_STATE;
    payload: Partial<IImagesEngineModel['currentEngineState']>;
}

export function setEngineState(payload: Partial<IImagesEngineModel['currentEngineState']>): SetEngineState {
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

export type Payloads = Partial<IImagesEngineModel['currentEngineState']> | string;

export type ImagesEngineActions = (payload: Payloads) => ImagesEngineActionTypes;
