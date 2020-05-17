import layoutModel, { ILayoutModel } from './layoutModel';
import {
    CHANGE_THEME,
    CHANGE_LANG,
    LayoutActionTypes,
    ChangeLang,
    ChangeTheme,
} from './layoutActions';

type Handler = (state: ILayoutModel, action: LayoutActionTypes) => ILayoutModel;

const ACTION_HANDLERS: {
    [key: string]: Handler;
} = {
    [CHANGE_THEME]: (state: ILayoutModel, action: ChangeTheme) => {
        let variant = 'light';

        if (!action.payload) {
            variant = state.variant === 'light' ? 'dark' : 'light';
        }

        if (action.payload === 'dark') {
            variant = 'dark';
        }

        return Object.assign({}, state, {
            variant,
        });
    },
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
}

export default layoutReducer;
