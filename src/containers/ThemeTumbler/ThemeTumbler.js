import { h } from 'preact';
import { useCallback } from 'preact/compat';

import { Flex } from '@styles/components';

import Button from '@components/Button';
import BrightnessIcon from '@icons/Brightness';
import Sunny from '@icons/Sunny';

const ThemeTumbler = ({ variant, changeTheme, onChange, lang = 'ru' }) => {

    const themeHandler = useCallback(() => {
        changeTheme();
        if (onChange) {
            onChange();
        }
    }, [changeTheme, onChange]);

    return (
        <Flex justify="center">
            <Button
                type="button"
                _rounded
                _transparent
                _fit
                onClick={themeHandler}>
                {variant === 'light' ? (
                    <BrightnessIcon _middle />
                ) : (
                    <Sunny _middle />
                )}
            </Button>
        </Flex>
    );
};

export default ThemeTumbler;
