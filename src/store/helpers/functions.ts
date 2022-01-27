import { AuthStateType, SingleQuestion, User } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { db } from "../../services/firebase";
import { AuthActions } from "../slices/auth";
import {
  addOrSubtractActiveQuestionsInARoom,
  toggleRoom,
} from "../slices/auth/actions";

function persistOrGetLocalstorage<T>(
  key: string,
  defaultState: any,
  overwrite: boolean = false
): T {
  const item = localStorage.getItem(key);
  // If the key is found, retrieve that key and return the value as the current state
  if (item?.length && !overwrite) return JSON.parse(item);
  // if not in localStorage return the state passed in

  // Every time the state changes, overwrite the data on localStorage
  localStorage.setItem(key, JSON.stringify(defaultState));

  return defaultState;
}

export const persistLocalstorage = <T>(key: string, defaultState: T): T =>
  persistOrGetLocalstorage<T>(key, defaultState, true);

export const getLocalstorage = <T>(key: string, defaultState: any): T =>
  persistOrGetLocalstorage<T>(key, defaultState);

type handleSyncUserType = (uid: string, dispatch: any) => Promise<User>;

export const handleSyncUserHelper: handleSyncUserType = async (
  uid,
  dispatch
) => {
  const user: User = await (await db.ref(`user/${uid}`).get()).val();

  dispatch(AuthActions.handleUpdate(user));
  return user;
};

type DeleteQuestionArgs = (
  state: AuthStateType,
  action: PayloadAction<{ roomId: string; questionId: string }>
) => void;

export const deleteQuestionFromDB: DeleteQuestionArgs = (state, action) => {
  return async (dispatch: any) => {
    const questionRef = db.ref(
      `room/${action.payload.roomId}/questions/${action.payload.questionId}`
    );
    const question: SingleQuestion = await (await questionRef.get()).val();
    questionRef.remove();
    if (question.isAnswered) return;
    dispatch(
      addOrSubtractActiveQuestionsInARoom(state, {
        payload: {
          add: false,
          roomCode: action.payload.roomId,
          uid: question.author.uid,
          currentUser: false,
        },
        type: "",
      })
    );
  };
};

type CloseRoomArgs = (
  state: AuthStateType,
  action: PayloadAction<{ roomId: string }>
) => void;

export const CloseRoomFromDB: CloseRoomArgs = (state, action) => {
  return async (dispatch: any) => {
    await db.ref(`room/${action.payload.roomId}`).update({
      endedAt: new Date(),
    });
    dispatch(
      toggleRoom(state, { payload: action.payload.roomId, type: "my_rooms" })
    );
  };
};
