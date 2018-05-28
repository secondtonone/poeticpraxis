import { CHANGE_THEME } from './LayoutActions.js';

const ACTION_HANDLERS = {
    [CHANGE_THEME]: (state, action) =>
        Object.assign({}, state, {
            variant: state.variant === 'light' ? 'dark' : 'light'
        })
};

const initialState = {
    variant: 'light'
};

export default function engineReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
