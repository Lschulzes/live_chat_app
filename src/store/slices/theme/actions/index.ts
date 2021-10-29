import { DefaultTheme } from 'styled-components';
import { ThemeStateType } from '..';
import { darkTheme, lightTheme } from '../../../../styles/themes/Themes';
import { persistOrGetLocalstorage } from '../../../helpers';

function getDifferentTheme(themeTitle: string): DefaultTheme {
  const newTheme = themeTitle === 'light' ? darkTheme : lightTheme;
  persistOrGetLocalstorage('theme', newTheme, true);
  return newTheme;
}

export function toggleThemeAction(state: ThemeStateType) {
  const theme = persistOrGetLocalstorage<DefaultTheme>('theme', state.theme);
  state.theme = getDifferentTheme(theme.title);
  return state;
}

export function loadThemeAction(state: ThemeStateType) {
  const theme = persistOrGetLocalstorage<DefaultTheme>('theme', state.theme);
  state.theme = theme;
  return state;
}
