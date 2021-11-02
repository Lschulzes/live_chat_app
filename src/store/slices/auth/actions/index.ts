import { PayloadAction } from '@reduxjs/toolkit';
import { DispatchProp } from 'react-redux';
import { AuthActions, AuthStateType, User } from '..';
import { RootState } from '../../..';
import firebase, { auth, db } from '../../../../services/firebase';
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
      favorite_rooms: undefined,
      premium_likes: 0,
    };

    const userRef = db.ref(`user`);
    const userSaved = await (await db.ref(`user/${uid}`).get()).exists();
    if (!userSaved) {
      await userRef.child(uid).set({
        username: username,
        avatar: avatar,
        premium_likes: 0,
        uid: uid,
        favorite_rooms: [],
      });
    } else {
      const user = await (await db.ref(`user/${uid}`).get()).val();
      user.favorite_rooms = user?.favorite_rooms ?? undefined;
      user.premium_likes = user?.premium_likes ?? undefined;
    }

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
  state.user = {
    avatar: '',
    uid: '',
    username: '',
    favorite_rooms: [],
    premium_likes: 0,
  };
  persistOrGetLocalstorage('isLoggedIn', false, true);
  persistOrGetLocalstorage('user', { avatar: '', uid: '', username: '' }, true);
  return state;
};

type toggleRoom = (state: AuthStateType, roomId: PayloadAction<string>) => void;

export const toggleFavoriteRoom: toggleRoom = (state, { payload }) => {
  return async (dispatch: any) => {
    if (!state.isLoggedIn || !state.user.uid?.length) return;
    // Gets the user data from firebase
    const user: User = await (
      await db.ref(`user/${state.user.uid}`).get()
    ).val();
    const dbRoom: { title: string } = await (
      await db.ref(`/room/${payload}`).get()
    ).val();
    if (!dbRoom.title) return;
    const newRoom: any = {};
    newRoom[payload] = dbRoom.title;
    // if it has no favorite room, it's assumed that it will be added
    if (!user?.favorite_rooms) {
      await db
        .ref(`user/${state.user.uid}/favorite_rooms/${payload}`)
        .set(dbRoom.title);
      user.favorite_rooms = { newRoom };
      dispatch(AuthActions.handleUpdate(user));
      return;
    }
    const roomIsFavorite = payload in user.favorite_rooms;
    // if room is favorite, remove from the user variable, else add to it

    if (roomIsFavorite) delete user.favorite_rooms[payload];
    else user.favorite_rooms[payload] = dbRoom.title;

    console.log(user.favorite_rooms);
    // independent of the operation, overwrite the db
    await db
      .ref(`user/${state.user.uid}/favorite_rooms`)
      .set(user.favorite_rooms);
    // and update the user locally
    dispatch(AuthActions.handleUpdate(user));
  };
};
