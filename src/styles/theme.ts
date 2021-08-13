import { Theme, Light, Dark } from 'styled-components';

const light: Light = {
    name: 'light',
    primaryRed: '#DE2420',
    secondRed: '#f5baba',
    thirdRed: '#92130e',
    primaryBlack: '#181311',
    primaryWhite: '#F9F8F7',
    secondWhite: '#FFF',
    primaryGray: '#717171',
    secondGray: '#F9F9F9',
    path: '../../../public',

    primaryColor: '#F9F8F7',
    secondColor: '#181311',
    accentColor: '#DE2420',
    grayColor: '#d6d6d6',
    lightGray: 'rgba(162, 162, 162, 0.1)',

    mainFont: '"Montserrat", Verdana, sans-serif',
} as const;

const dark: Dark = {
    name: 'dark',
    primaryRed: '#DE2420',
    secondRed: '#f5baba',
    thirdRed: '#92130e',
    primaryBlack: '#181311',
    primaryWhite: '#F9F8F7',
    secondWhite: '#FFF',
    primaryGray: '#717171',
    secondGray: '#F9F9F9',
    path: '../../../public',

    primaryColor: '#191919',
    secondColor: '#F9F8F7',
    accentColor: '#ea5d5a',
    grayColor: '#6d6c6c',
    grayDarkColor: '#212121',
    lightGray: 'rgba(162, 162, 162, 0.1)',

    mainFont: '"Montserrat", Verdana, sans-serif',
} as const;

const theme: Theme = {
    primaryRed: '#DE2420',
    secondRed: '#f5baba',
    thirdRed: '#92130e',
    primaryBlack: '#181311',
    primaryWhite: '#F9F8F7',
    secondWhite: '#FFF',
    primaryGray: '#717171',
    secondGray: '#F9F9F9',
    path: '../../../public',

    primaryColor: '#F9F8F7',
    secondColor: '#181311',

    mainFont: '"Montserrat", Verdana, sans-serif',
    light,
    dark,
} as const;

export default theme;
