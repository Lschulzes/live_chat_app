import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './services/firebase';
import { Global } from './styles/Global';
import AuthContext, { AuthContextProvider } from './contexts/authContext';
import Room from './pages/Room';
import useCustomTheme from './hooks/useCustomTheme';
import { useContext, useEffect } from 'react';
import AdminRoom from './pages/AdminRoom';

export default function App() {
  const { theme } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Switch>
        <Route path='/room/:id'>
          <Room />
        </Route>
        <Route path='/admin/room/:id'>
          <AdminRoom />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}
