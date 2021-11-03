import { PayloadAction } from '@reduxjs/toolkit';
import { AuthActions, AuthStateType, User } from '..';
import firebase, { auth, db } from '../../../../services/firebase';
import { GlobalInitialState, persistOrGetLocalstorage } from '../../../helpers';

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
      favorite_rooms: [],
      active_questions: [],
      my_rooms: [],
      premium_likes: GlobalInitialState.PREMIUM_LIKES,
      limit_rooms: GlobalInitialState.LIMIT_ROOMS,
    };

    const userRef = db.ref(`user`);
    const userSaved = await (await db.ref(`user/${uid}`).get()).exists();
    if (!userSaved) {
      await userRef.child(uid).set({
        username: username,
        avatar: avatar,
        premium_likes: GlobalInitialState.PREMIUM_LIKES,
        uid: uid,
        favorite_rooms: [],
        active_questions: [],
        my_rooms: [],
        limit_rooms: GlobalInitialState.LIMIT_ROOMS,
      });
    } else {
      const user = await (await db.ref(`user/${uid}`).get()).val();
      user.favorite_rooms = user?.favorite_rooms ?? [];
      user.active_questions = user?.active_questions ?? [];
      user.my_rooms = user?.my_rooms ?? [];
      user.premium_likes =
        user?.premium_likes ?? GlobalInitialState.PREMIUM_LIKES;
      user.limit_rooms = user?.limit_rooms ?? GlobalInitialState.LIMIT_ROOMS;
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
    active_questions: [],
    my_rooms: [],
    premium_likes: GlobalInitialState.PREMIUM_LIKES,
    limit_rooms: GlobalInitialState.LIMIT_ROOMS,
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
      user.favorite_rooms = newRoom;
      dispatch(AuthActions.handleUpdate(user));
      return;
    }
    const roomIsFavorite = payload in user.favorite_rooms;
    // if room is favorite, remove from the user variable, else add to it

    if (roomIsFavorite) delete user.favorite_rooms[payload];
    else user.favorite_rooms[payload] = dbRoom.title;
    // independent of the operation, overwrite the db
    await db
      .ref(`user/${state.user.uid}/favorite_rooms`)
      .set(user.favorite_rooms);
    // and update the user locally
    dispatch(AuthActions.handleUpdate(user));
  };
};

export const toggleMyRoom: toggleRoom = (state, { payload }) => {
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
    // if it has no  room, it's assumed that it will be added
    if (!user?.my_rooms) {
      await db
        .ref(`user/${state.user.uid}/my_rooms/${payload}`)
        .set(dbRoom.title);
      user.my_rooms = newRoom;
      dispatch(AuthActions.handleUpdate(user));
      return;
    }
    const roomIsMine = payload in user.my_rooms;
    // if room is in, remove from the user variable, else add to it

    if (roomIsMine) delete user.my_rooms[payload];
    else user.my_rooms[payload] = dbRoom.title;
    // independent of the operation, overwrite the db
    await db.ref(`user/${state.user.uid}/my_rooms`).set(user.my_rooms);
    // and update the user locally
    dispatch(AuthActions.handleUpdate(user));
  };
};

type activeQuestions = (
  state: AuthStateType,
  action: PayloadAction<{
    add: boolean;
    roomCode: string;
    uid: string;
    currentUser: boolean;
  }>
) => void;

export const addOrSubtractActiveQuestionsInARoom: activeQuestions = (
  state,
  { payload }
) => {
  return async (dispatch: any) => {
    if (!state.isLoggedIn) return;
    const { add, roomCode, uid, currentUser } = payload;
    const amountToAdd = add ? 1 : -1;
    // Gets the user data from firebase
    const user: User = await (await db.ref(`user/${uid}`).get()).val();
    const roomQuestionMark: any = {};
    roomQuestionMark[roomCode] = 1;

    let activeQuestionsInRoom: number;
    // if room is favorite, remove from the user variable, else add to it

    if (user?.active_questions && roomCode in user.active_questions) {
      activeQuestionsInRoom = user.active_questions[roomCode] + amountToAdd;
    } else activeQuestionsInRoom = 1;
    // independent of the operation, overwrite the db
    if (activeQuestionsInRoom > 0) {
      await db
        .ref(`user/${uid}/active_questions/${roomCode}`)
        .set(activeQuestionsInRoom);
      user.active_questions = {};
      user.active_questions[roomCode] = activeQuestionsInRoom;
    } else {
      await db.ref(`user/${uid}/active_questions/${roomCode}`).remove();
      delete user.active_questions[roomCode];
    }
    // and update the user locally
    if (currentUser) dispatch(AuthActions.handleUpdate(user));
  };
};

type handleSyncUserType = (state: AuthStateType) => void;
