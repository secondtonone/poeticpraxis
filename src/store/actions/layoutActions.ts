import ILayoutModel from '@typings/LayoutModel';

export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_LANG = 'CHANGE_LANG';

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

export type Payloads = ILayoutModel['variant'] | ILayoutModel['lang'];

export type LayoutActionTypes = ChangeTheme | ChangeLang;

export type LayoutActions = (payload: Payloads) => LayoutActionTypes;
