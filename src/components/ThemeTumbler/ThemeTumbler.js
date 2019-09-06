import React from 'react';

import Toggle from '../Toggle';
import { Flex, Mirrored } from '../../styles/components';

import { translations } from './translations';

import Button from '../Button';
import BrightnessIcon from '../IconSVG/Brightness';
import Sunny from '../IconSVG/Sunny';

const ThemeTumbler = ({ variant, changeTheme, onChange, lang = 'ru' }) => {
    return (
        <Flex justify="center">
            <Button
                type="button"
                _rounded
                _transparent
                _fit
                onClick={() => {
                    changeTheme();
                    if (onChange) {
                        onChange();
                    }
                }}>
                {variant === 'light' ? (
                    <BrightnessIcon _small />
                ) : (
                    <Sunny _small />
                )}
            </Button>

            {/* <Toggle
                checked={variant === 'dark'}
                onChange={() => {
                    changeTheme();
                    if (onChange) {
                        onChange();
                    }
                }}
            /> */}
        </Flex>
    );
};

export default ThemeTumbler;