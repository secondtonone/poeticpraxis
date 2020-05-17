import { ILayoutModel } from './layoutModel';

export const CHANGE_THEME: string = 'CHANGE_THEME';
export const CHANGE_LANG: string = 'CHANGE_LANG';

export interface ChangeTheme {
    type: typeof CHANGE_THEME;
    payload: ILayoutModel['variant'];
}

export function changeTheme(payload: ILayoutModel['variant']): ChangeTheme {
    return {
        type: CHANGE_THEME,
        payload,
    };
}

export interface ChangeLang {
    type: typeof CHANGE_LANG;
    payload: ILayoutModel['lang'];
}

export function changeLang(payload: ILayoutModel['lang']): ChangeLang {
    return {
        type: CHANGE_LANG,
        payload,
    };
}

export type LayoutActionTypes = ChangeTheme | ChangeLang;
