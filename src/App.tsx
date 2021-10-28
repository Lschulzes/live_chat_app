import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './services/firebase';
import { Global } from './styles/Global';
import Room from './pages/Room';
import { useEffect } from 'react';
import AdminRoom from './pages/AdminRoom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { loadTheme } from './store/slices/theme';

export default function App() {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTheme());
  }, []);

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
