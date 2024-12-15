import type { FunctionalComponent } from 'preact';
import { useContext, useCallback } from 'preact/hooks';
import StateContext from '@contexts/stateContext';

import useLayoutActions from '@hooks/useLayoutActions';

import Flex from '@components/Flex';

import Button from '@components/Button';
import BrightnessIcon from '@icons/Brightness';
import Sunny from '@icons/Sunny';

interface ThemeTumblerProps {
    onChange?: () => void;
}

const ThemeTumbler: FunctionalComponent<ThemeTumblerProps> = ({ onChange }) => {
  const { Layout: { variant } } = useContext(StateContext);
  const { changeTheme } = useLayoutActions();

  const themeHandler = useCallback(() => {
    changeTheme(variant === 'light' ? 'dark' : 'light');
    if (onChange) {
      onChange();
    }
  }, [changeTheme, onChange, variant]);

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
