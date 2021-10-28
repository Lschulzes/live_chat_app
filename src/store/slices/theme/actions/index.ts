import { DefaultTheme } from 'styled-components';
import { ThemeStateType } from '..';
import { darkTheme, lightTheme } from '../../../../styles/themes/Themes';

export function persistOrGetLocalstorage<T>(
  key: string,
  defaultState: any,
  overwrite: boolean = false
): T {
  const item = localStorage.getItem(key);
  // If the key is found, retrieve that key and return the value as the current state
  if (item?.length && !overwrite) return JSON.parse(item);
  // if not in localStorage return the state passed in

  // Every time the state changes, overwrite the data on localStorage
  localStorage.setItem(key, JSON.stringify(defaultState));

  return defaultState;
}

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
