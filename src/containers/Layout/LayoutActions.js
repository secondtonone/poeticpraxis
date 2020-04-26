export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_LANG = 'CHANGE_LANG';

export function changeTheme(payload) {
    return {
        type: CHANGE_THEME,
        payload
    };
}

export function changeLang(payload) {
    return {
        type: CHANGE_LANG,
        payload
    };
}
