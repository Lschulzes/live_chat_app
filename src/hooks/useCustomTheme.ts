import { useCallback, useContext, useEffect, useState } from 'react';
import { DefaultTheme, ThemeContext } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/themes/Themes';
import usePersistState from './usePersistState';

type UseThemeType = [theme: DefaultTheme, toggleTheme: () => void];

const useCustomTheme = (): UseThemeType => {
  const [theme, setTheme] = usePersistState('theme', lightTheme);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? darkTheme : lightTheme);
  };

  return [theme, toggleTheme];
};

export default useCustomTheme;
