import firebase, { auth } from '../services/firebase';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router';
import usePersistState from '../hooks/usePersistState';
import { DefaultTheme } from 'styled-components';
import useCustomTheme from '../hooks/useCustomTheme';

type User = {
  uid: string;
  username: string;
  avatar: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  handleLoginUser: () => Promise<boolean | undefined>;
  handleLogoutUser: () => void;
  user: User;
  theme: DefaultTheme;
  toggleTheme: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = (props: PropsWithChildren<any>) => {
  const history = useHistory();
  const [theme, toggleTheme] = useCustomTheme();
  const [user, setUser] = usePersistState('user', {} as User);
  const [isLoggedIn, setIsLoggedIn] = usePersistState('isLoggedIn', false);
  const handleLoginUser = async () => {
    if (isLoggedIn) return true;
    const provider = new firebase.auth.GoogleAuthProvider();
    const signInResult = await auth.signInWithPopup(provider);
    if (!signInResult.user) return;
    const { displayName: username, photoURL: avatar, uid } = signInResult.user;

    if (!username?.length) return false;
    setIsLoggedIn(true);
    setUser({
      username,
      avatar: avatar ?? 'https://source.unsplash.com/user',
      uid,
    });
    return true;
  };

  const handleLogoutUser = () => {
    firebase.auth().signOut();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (!isLoggedIn) history.push('/');
  }, [isLoggedIn]);

  const contextValue = {
    isLoggedIn,
    handleLoginUser,
    handleLogoutUser,
    user,
    theme,
    toggleTheme,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
