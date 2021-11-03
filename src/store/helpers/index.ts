import { RootState } from '..';
import { db } from '../../services/firebase';
import { AuthActions, AuthStateType, User } from '../slices/auth';

export function persistOrGetLocalstorage<T>(
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

export enum UITypeActions {
  CLOSE_ROOM = 'CLOSE_ROOM',
  DELETE_QUESTION = 'DELETE_QUESTION',
}

export enum GlobalInitialState {
  LIMIT_ROOMS = 5,
  PREMIUM_LIKES = 0,
  LIMIT_QUESTIONS_PER_USER = 3,
}

type handleSyncUserType = (uid: string, dispatch: any) => Promise<User>;

export const handleSyncUserHelper: handleSyncUserType = async (
  uid,
  dispatch
) => {
  const user: User = await (await db.ref(`user/${uid}`).get()).val();

  dispatch(AuthActions.handleUpdate(user));
  return user;
};
