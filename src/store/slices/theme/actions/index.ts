import { DefaultTheme } from "styled-components";
import { ThemeStateType } from "..";
import { darkTheme, lightTheme } from "../../../../styles/themes/Themes";
import { persistLocalstorage, getLocalstorage } from "../../../helpers";

function getDifferentTheme(themeTitle: string): DefaultTheme {
  const newTheme = themeTitle === "light" ? darkTheme : lightTheme;
  persistLocalstorage("theme", newTheme);
  return newTheme;
}

export function toggleThemeAction(state: ThemeStateType) {
  const theme = getLocalstorage<DefaultTheme>("theme", state.theme);
  state.theme = getDifferentTheme(theme.title);
  return state;
}

export function loadThemeAction(state: ThemeStateType) {
  const theme = getLocalstorage<DefaultTheme>("theme", state.theme);
  state.theme = theme;
  return state;
}
