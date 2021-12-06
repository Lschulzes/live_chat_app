import { createSlice } from '@reduxjs/toolkit';
import { DefaultTheme } from 'styled-components';
import { darkTheme, lightTheme } from '../../../styles/themes/Themes';
import { loadThemeAction, toggleThemeAction } from './actions';

export type ThemeStateType = {
  theme: DefaultTheme;
};

const initialState: ThemeStateType = {
  theme: lightTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: toggleThemeAction,
    loadTheme: loadThemeAction,
  },
});

export const { loadTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
