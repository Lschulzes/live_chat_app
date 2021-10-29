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
import { Toast } from './components/toast/Toast';
import { loadUser } from './store/slices/auth';
import ReactModal from 'react-modal';
import Modal from './components/UI/Modal/Modal';

ReactModal.setAppElement('#root');
export default function App() {
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTheme());
    dispatch(loadUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Modal />
      <Toast />
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
