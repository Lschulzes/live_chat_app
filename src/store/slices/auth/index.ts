import { createSlice } from "@reduxjs/toolkit";
import { AuthStateType } from "../../helpers/types";
import { handleLogoutUser, handleUpdateUser, loadUserAction } from "./actions";

const initialState: AuthStateType = {
  isLoggedIn: true,
  user: {
    uid: "",
    username: "",
    avatar: "",
    favorite_rooms: {},
    active_questions: {},
    my_rooms: {},
    premium_likes: 0,
    limit_rooms: 5,
  },
};

const authSlice = createSlice({
  name: "auth",
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
