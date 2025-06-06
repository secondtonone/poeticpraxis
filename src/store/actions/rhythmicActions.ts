import type { ICurrentRhythmicState } from '@typings/RhythmicModel';
import type { IDictionary } from '@modules/workfield/dictionary';

export const SET_RHYTHMIC_STATE = 'SET_RHYTHMIC_STATE';
export const SET_WORDS_DICTIONARY = 'SET_WORDS_DICTIONARY';

export interface SetRhythmicState {
  type: typeof SET_RHYTHMIC_STATE;
  payload: Partial<ICurrentRhythmicState>;
}

export function setRhythmicState(
  payload: Partial<ICurrentRhythmicState>
): SetRhythmicState {
  return {
    type: SET_RHYTHMIC_STATE,
    payload,
  };
}

export interface SetWordsDictionary {
  type: typeof SET_WORDS_DICTIONARY;
  payload: IDictionary;
}

export function setWordsDictionary(payload: IDictionary): SetWordsDictionary {
  return {
    type: SET_WORDS_DICTIONARY,
    payload,
  };
}

export type RhythmicActionTypes = SetRhythmicState | SetWordsDictionary;

export type Payloads = Partial<ICurrentRhythmicState> | IDictionary;

export type RhythmicActions = (payload: Payloads) => RhythmicActionTypes;
