export const SET_RHYTHMIC_STATE = "SET_RHYTHMIC_STATE";
export const SET_WORDS_DICTIONARY = "SET_WORDS_DICTIONARY";
export const SHARING_TEXT = "SHARING_TEXT";

export function setRhythmicState(payload) {
    return {
        type: SET_RHYTHMIC_STATE,
        payload
    };
}

export function setWordsDictionary(payload) {
    return {
        type: SET_WORDS_DICTIONARY,
        payload
    };
}

/* export function sharingText(payload) {
    return {
        type: SHARING_TEXT,
        payload
    };
} */
