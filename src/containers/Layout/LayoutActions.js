export const CHANGE_THEME = 'CHANGE_THEME';
export const GHANGE_LANG = 'GHANGE_LANG';

export function changeTheme(payload) {
    return {
        type: CHANGE_THEME,
        payload
    };
}

export function changeLang(payload) {
    return {
        type: GHANGE_LANG,
        payload
    };
}
