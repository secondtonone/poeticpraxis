import { CHANGE_THEME, GHANGE_LANG } from './LayoutActions.js';

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
    [GHANGE_LANG]: (state, action) => Object.assign({}, state, {
        lang: action.payload
    })
};

const initialState = {
    variant: 'light',
    lang: 'ru'
};

export default function engineReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
