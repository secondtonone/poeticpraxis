import React from 'react';

import Toggle from '../Toggle';
import { Flex } from '../../styles/components';

import { translations } from './translations';

const ThemeTumbler = ({ variant, changeTheme, onChange, lang = 'ru' }) => {
    return (
        <Flex justify="space-between">
            {translations[lang].settings['NIGHT_MODE']}

            <Toggle
                checked={variant === 'dark'}
                onChange={() => {
                    changeTheme();
                    if (onChange) {
                        onChange();
                    }
                }}
            />
        </Flex>
    );
};

export default ThemeTumbler;
