export const SET_ENGINE_STATE = "SET_ENGINE_STATE";
export const SHARING_TEXT = "SHARING_TEXT";

export function setEngineState(payload) {
    return {
        type: SET_ENGINE_STATE,
        payload
    };
}

export function sharingText(payload) {
    return {
        type: SHARING_TEXT,
        payload
    };
}
