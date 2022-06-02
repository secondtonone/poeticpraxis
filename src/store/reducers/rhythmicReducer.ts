import rhythmicModel from '@store/models/rhythmicModel';
import IRhythmicModel from '@typings/RhythmicModel';
import {
  SET_RHYTHMIC_STATE,
  SET_WORDS_DICTIONARY,
  RhythmicActionTypes,
  SetRhythmicState,
  SetWordsDictionary,
} from '@store/actions/rhythmicActions';

type Handler = (
  state: IRhythmicModel,
  action: RhythmicActionTypes
) => IRhythmicModel;

const ACTION_HANDLERS: {
    [key: string]: Handler;
} = {
  [SET_RHYTHMIC_STATE]: (state: IRhythmicModel, action: SetRhythmicState) =>
    Object.assign({}, state, {
      currentRhythmicState: {
        ...state.currentRhythmicState,
        ...action.payload,
      },
    }),
  [SET_WORDS_DICTIONARY]: (
    state: IRhythmicModel,
    action: SetWordsDictionary
  ) =>
    Object.assign({}, state, {
      wordsDictionary: action.payload,
    }),
};

export type RhythmicReducer = (
  state: IRhythmicModel,
  action: RhythmicActionTypes
) => IRhythmicModel;

const rhythmicReducer: RhythmicReducer = (
  state = rhythmicModel,
  action
) => {
  const handler: Handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default rhythmicReducer;
