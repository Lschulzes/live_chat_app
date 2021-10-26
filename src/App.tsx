import React, { useState } from 'react';
import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';

import './services/firebase';
import { Global } from './styles/Global';
import { darkTheme, lightTheme } from './styles/themes/Themes';
import usePersistState from './hooks/usePersistState';

export default function App() {
  const [theme, setTheme] = usePersistState('theme', lightTheme);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? darkTheme : lightTheme);
  };
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Home toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}
