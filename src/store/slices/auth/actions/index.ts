import { PayloadAction } from '@reduxjs/toolkit';
import { DispatchProp } from 'react-redux';
import { AuthActions, AuthStateType, User } from '..';
import firebase, { auth } from '../../../../services/firebase';
import { persistOrGetLocalstorage } from '../../theme/actions';

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
  state.user = action.payload;
  state.isLoggedIn = true;
  return state;
};
export const handleLogoutUser: HandleUser = (state) => {
  firebase.auth().signOut();
  state.isLoggedIn = false;
  state.user = { avatar: '', uid: '', username: '' };
  return state;
};
