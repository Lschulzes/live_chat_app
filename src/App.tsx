import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './services/firebase';
import { Global } from './styles/Global';
import { darkTheme, lightTheme } from './styles/themes/Themes';
import usePersistState from './hooks/usePersistState';
import { AuthContextProvider } from './contexts/authContext';
import Room from './pages/Room';

export default function App() {
  const [theme, setTheme] = usePersistState('theme', lightTheme);
  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? darkTheme : lightTheme);
  };
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <Global />
          <Switch>
            <Route path='/room/:id'>
              <Room />
            </Route>
            <Route path='/'>
              <Home toggleTheme={toggleTheme} />
            </Route>
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
