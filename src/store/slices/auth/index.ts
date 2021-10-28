import { createSlice } from '@reduxjs/toolkit';
import { handleLoginUser, handleLogoutUser, handleUpdateUser } from './actions';

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
  isLoggedIn: false,
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
  },
});

export default authSlice.reducer;
export const AuthActions = authSlice.actions;
export const { handleLogout } = authSlice.actions;
