import type { FunctionalComponent } from 'preact';
import { useContext, useLayoutEffect } from 'preact/hooks';
import { ThemeProvider } from 'styled-components';

import theme from '@styles/theme';

import StateContext from '@contexts/stateContext';
import useLayoutActions from '@hooks/useLayoutActions';

const ThemeContextContainer: FunctionalComponent = ({ children }) => {
  const { Layout: { variant }} = useContext(StateContext);
  const { changeTheme } = useLayoutActions();

  useLayoutEffect(() => {
    const selector = '(prefers-color-scheme: dark)';
    const handler = (e: MediaQueryListEvent) => {
      const newColorScheme = e.matches ? 'dark' : 'light';
      changeTheme(newColorScheme);
    };
        
    window.matchMedia(selector).addEventListener('change', handler);

    return () => {
      window.matchMedia(selector).removeEventListener('change', handler);
    };
  });

  return (<ThemeProvider theme={theme[variant]}>
    {children}
  </ThemeProvider>);
};

export default ThemeContextContainer;
