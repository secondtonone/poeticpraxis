import layoutModel from './layoutModel';
import { CHANGE_THEME, CHANGE_LANG } from './layoutActions';

const ACTION_HANDLERS = {
    [CHANGE_THEME]: (state, action) => {
        let variant = 'light';

        if (!action.payload) {
            variant = state.variant === 'light' ? 'dark' : 'light';
        }

        if (action.payload === 'dark') {
            variant = 'dark';
        }

        return Object.assign({}, state, {
            variant
        });
    },
    [CHANGE_LANG]: (state, action) => Object.assign({}, state, {
        lang: action.payload
    })
};

export default function layoutReducer(state = layoutModel, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
