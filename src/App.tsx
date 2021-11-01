import { ThemeProvider } from 'styled-components';
import './services/firebase';
import { Global } from './styles/Global';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { loadTheme } from './store/slices/theme';
import { Toast } from './components/toast/Toast';
import { loadUser } from './store/slices/auth';
import ReactModal from 'react-modal';
import Modal from './components/UI/Modal/Modal';
import Routes from './Routes';

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
      <Routes />
    </ThemeProvider>
  );
}
