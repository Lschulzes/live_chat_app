import { createSlice } from '@reduxjs/toolkit';
import { handleLogoutUser, handleUpdateUser, loadUserAction } from './actions';

export type User = {
  uid: string;
  username: string;
  avatar: string;
  favorite_rooms: any;
  premium_likes: number;
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
    favorite_rooms: {},
    premium_likes: 0,
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
