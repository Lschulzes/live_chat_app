import { createSlice } from '@reduxjs/toolkit';
import {
  handleLoginUser,
  handleLogoutUser,
  handleUpdateUser,
  loadUserAction,
} from './actions';

export type User = {
  uid: string;
  username: string;
  avatar: string;
};

export type AuthStateType = {
  isLoggedIn: boolean;
  user: User;
};

const initialState: AuthStateType = {
  isLoggedIn: true,
  user: {
    uid: '',
    username: '',
    avatar: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogout: handleLogoutUser,
    handleUpdate: handleUpdateUser,
    loadUser: loadUserAction,
  },
});

export default authSlice.reducer;
export const AuthActions = authSlice.actions;
export const { handleLogout, loadUser } = authSlice.actions;
