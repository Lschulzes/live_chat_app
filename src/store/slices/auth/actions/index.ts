import { PayloadAction } from '@reduxjs/toolkit';
import { DispatchProp } from 'react-redux';
import { AuthActions, AuthStateType, User } from '..';
import { RootState } from '../../..';
import firebase, { auth } from '../../../../services/firebase';
import { persistOrGetLocalstorage } from '../../../helpers';
import { UIActions } from '../../UI/UISlice';

export const handleLoginUser = (state: AuthStateType) => {
  return async (dispatch: any) => {
    if (state.isLoggedIn) return true;
    const provider = new firebase.auth.GoogleAuthProvider();
    const signInResult = await auth.signInWithPopup(provider);
    if (!signInResult.user) return;
    const { displayName: username, photoURL: avatar, uid } = signInResult.user;
    if (!username?.length) return false;
    const user = {
      username,
      avatar: avatar ?? 'https://source.unsplash.com/user',
      uid,
    };

    dispatch(AuthActions.handleUpdate(user));
    return true;
  };
};

type HandleUser = (state: AuthStateType) => void;
type UpdateUser = (state: AuthStateType, action: PayloadAction<User>) => void;

export const handleUpdateUser: UpdateUser = (state, action) => {
  persistOrGetLocalstorage('user', action.payload, true);
  state.user = action.payload;
  state.isLoggedIn = true;
  return state;
};

export const loadUserAction = (state: AuthStateType) => {
  state.user = persistOrGetLocalstorage('user', state.user);
  const logged = state.user?.uid?.length ? true : false;
  persistOrGetLocalstorage('isLoggedIn', logged, true);
  state.isLoggedIn = logged;
  return state;
};
export const handleLogoutUser: HandleUser = (state) => {
  firebase.auth().signOut();
  state.isLoggedIn = false;
  state.user = { avatar: '', uid: '', username: '' };
  persistOrGetLocalstorage('isLoggedIn', false, true);
  persistOrGetLocalstorage('user', { avatar: '', uid: '', username: '' }, true);
  return state;
};
