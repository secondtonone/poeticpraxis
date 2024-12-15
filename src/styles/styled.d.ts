import 'styled-components';
import type { ThemeVariants } from '@typings/ThemeVariants';

declare module 'styled-components' {
  export interface ThemeSettings {
    primaryRed: '#DE2420';
    secondRed: '#f5baba';
    thirdRed: '#92130e';
    primaryBlack: '#181311';
    primaryWhite: '#F9F8F7';
    secondWhite: '#FFF';
    primaryGray: '#717171';
    secondGray: '#F9F9F9';
    path: '../../../public';

    primaryColor: string;
    secondColor: string;
    accentColor: string;
    grayColor: string;
    lightGray: string;

    mainFont: '"Montserrat", Verdana, sans-serif';
  }

  export interface Light extends ThemeSettings {
    name: 'light';
  }

  export interface Dark extends ThemeSettings {
    name: 'dark';
    grayDarkColor: '#212121';
  }

  export interface Theme
    extends Omit<ThemeSettings, 'accentColor' | 'lightGray'> {
    light: Light;
    dark: Dark;
  }

  export interface DefaultTheme extends ThemeSettings {
    name: ThemeVariants;
    grayDarkColor?: string;
  }
}
