import { PayloadAction } from '@reduxjs/toolkit';
import { AuthActions, AuthStateType, User } from '..';
import firebase, { auth, db } from '../../../../services/firebase';
import { persistOrGetLocalstorage } from '../../../helpers';
import { GlobalInitialState } from '../../../helpers/enums';

const setUser = (user: User): User => {
  user.favorite_rooms = user?.favorite_rooms ?? [];
  user.active_questions = user?.active_questions ?? [];
  user.my_rooms = user?.my_rooms ?? [];
  user.premium_likes = user?.premium_likes ?? GlobalInitialState.PREMIUM_LIKES;
  user.limit_rooms = user?.limit_rooms ?? GlobalInitialState.LIMIT_ROOMS;
  return user;
};

export const handleLoginUser = (state: AuthStateType) => {
  return async (dispatch: any) => {
    if (state.isLoggedIn) return true;
    const provider = new firebase.auth.GoogleAuthProvider();
    const signInResult = await auth.signInWithPopup(provider);
    if (!signInResult.user) return;
    const { displayName: username, photoURL: avatar, uid } = signInResult.user;
    if (!username?.length) return false;
    const user = defaultUser;
    user.username = username;
    user.avatar = avatar ?? 'https://source.unsplash.com/user';
    user.uid = uid;

    const userRef = db.ref(`user`);
    const userSaved = await (await db.ref(`user/${uid}`).get()).exists();
    if (!userSaved) await userRef.child(uid).set(user);
    else {
      const userFromDB = await (await db.ref(`user/${uid}`).get()).val();
      const user = setUser(userFromDB);
    }

    dispatch(AuthActions.handleUpdate(user));
    return true;
  };
};

export type SingleQuestion = {
  content: string;
  author: {
    name: string;
    avatar: string;
    uid: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
};

export type SingleRoom = {
  title: string;
  authorId: string;
  limit_questions: number;
  questions?: { questionId: SingleQuestion }[];
};

export const defaultUser = {
  avatar: '',
  uid: '',
  username: '',
  favorite_rooms: [],
  active_questions: [],
  my_rooms: [],
  premium_likes: GlobalInitialState.PREMIUM_LIKES,
  limit_rooms: GlobalInitialState.LIMIT_ROOMS,
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
  state.user = defaultUser;
  persistOrGetLocalstorage('isLoggedIn', false, true);
  persistOrGetLocalstorage('user', defaultUser, true);
  return state;
};

export const getValueFromDB = async (path: string): Promise<any> => {
  return await (await db.ref(path).get()).val();
};

export const getUserFromDB = async (uid: string): Promise<User> => {
  return getValueFromDB(`user/${uid}`);
};

export const getRoomFromDB = async (roomCode: string): Promise<SingleRoom> => {
  return getValueFromDB(`/room/${roomCode}`);
};

type ToggleRoom = (
  state: AuthStateType,
  roomId: { payload: string; type: string }
) => void;

const isUserLoggedIn = (state: AuthStateType): boolean => {
  return !state.isLoggedIn || !state.user.uid?.length ? false : true;
};

export const toggleRoom: ToggleRoom = (state, { payload, type }) => {
  return async (dispatch: any) => {
    if (!isUserLoggedIn(state)) return;
    // Gets the user data from firebase
    const user: any = await getUserFromDB(state.user.uid);
    const dbRoom = await getRoomFromDB(payload);
    if (!dbRoom?.title) return;
    const newRoom: any = {};
    newRoom[payload] = dbRoom.title;
    // if it has no favorite room, it's assumed that it will be added
    if (!user?.[type]) {
      await db
        .ref(`user/${state.user.uid}/${type}/${payload}`)
        .set(dbRoom.title);
      user[type] = newRoom;
      dispatch(AuthActions.handleUpdate(user));
      return;
    }
    const roomIsFavorite = payload in user[type];
    // if room is favorite, remove from the user variable, else add to it

    if (roomIsFavorite) delete user[type][payload];
    else user[type][payload] = dbRoom.title;
    // independent of the operation, overwrite the db
    await db.ref(`user/${state.user.uid}/${type}`).set(user[type]);
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

const userHasActiveQuestionInRoom = (user: User, roomId: string): boolean => {
  return user?.active_questions && roomId in user.active_questions
    ? true
    : false;
};

const setAmountOfActiveQuestionsInARoom = async (
  user: User,
  roomId: string,
  activeQuestions: number
): Promise<number> => {
  await db
    .ref(`user/${user.uid}/active_questions/${roomId}`)
    .set(activeQuestions);
  return activeQuestions;
};

export const addOrSubtractActiveQuestionsInARoom: activeQuestions = (
  state,
  { payload }
) => {
  return async (dispatch: any) => {
    if (!state.isLoggedIn) return;
    const { add, roomCode, uid, currentUser } = payload;
    const amountToAdd = add ? 1 : -1;
    // Gets the user data from firebase
    const user: User = await getValueFromDB(`user/${uid}`);
    const roomQuestionMark: any = {};
    roomQuestionMark[roomCode] = 1;

    let activeQuestionsInRoom: number;
    // if room is favorite, remove from the user variable, else add to it

    if (userHasActiveQuestionInRoom(user, roomCode)) {
      activeQuestionsInRoom = user.active_questions[roomCode] + amountToAdd;
      user.active_questions = {};
      user.active_questions[roomCode] = await setAmountOfActiveQuestionsInARoom(
        user,
        roomCode,
        activeQuestionsInRoom
      );
    } else {
      activeQuestionsInRoom = 1;
    }
    // independent of the operation, overwrite the db
    if (activeQuestionsInRoom > 0) {
      await db
        .ref(`user/${uid}/active_questions/${roomCode}`)
        .set(activeQuestionsInRoom);
    } else {
      await db.ref(`user/${uid}/active_questions/${roomCode}`).remove();
      delete user.active_questions[roomCode];
    }
    // and update the user locally
    if (currentUser) dispatch(AuthActions.handleUpdate(user));
  };
};
