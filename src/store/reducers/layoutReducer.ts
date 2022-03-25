import layoutModel from '@store/models/layoutModel';
import ILayoutModel from '@typings/LayoutModel';
import {
  CHANGE_THEME,
  CHANGE_LANG,
  LayoutActionTypes,
  ChangeLang,
  ChangeTheme,
} from '@store/actions/layoutActions';

type Handler = (state: ILayoutModel, action: LayoutActionTypes) => ILayoutModel;

const ACTION_HANDLERS: {
    [key: string]: Handler;
} = {
  [CHANGE_THEME]: (state: ILayoutModel, action: ChangeTheme) => 
    Object.assign({}, state, {
      variant: action.payload
    }),
  [CHANGE_LANG]: (state: ILayoutModel, action: ChangeLang) =>
    Object.assign({}, state, {
      lang: action.payload,
    }),
};

export type LayoutReducer = (
    state: ILayoutModel,
    action: LayoutActionTypes
) => ILayoutModel;

const layoutReducer: LayoutReducer = (
  state = layoutModel,
  action
) => {
  const handler: Handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default layoutReducer;
