import { PayloadAction, PayloadActionCreator } from '@reduxjs/toolkit';
import { UITypeActions } from '../../../helpers/enums';
import { ModalProps, UIStateType } from '../UISlice';

export const setIsLoadingAction = (
  state: UIStateType,
  action: PayloadAction<{ loading: boolean }>
): UIStateType => {
  state.isLoading = action.payload.loading;
  return state;
};

type SetSuccessAction = PayloadAction<{ msg: string }>;
type SetErrorAction = PayloadAction<{ msg: string }>;

export const setErrorAction = (
  state: UIStateType,
  action: SetErrorAction
): UIStateType => {
  state.error.msg = action.payload.msg;
  state.error.hasError = true;
  return state;
};

export const setSuccessAction = (
  state: UIStateType,
  action: SetSuccessAction
): UIStateType => {
  state.success.msg = action.payload.msg;
  state.success.hasMsg = true;
  return state;
};

export const clearErrorAction = (state: UIStateType): UIStateType => {
  state.error.msg = null;
  state.error.hasError = false;
  return state;
};

export const clearSuccessAction = (state: UIStateType): UIStateType => {
  state.success.msg = null;
  state.success.hasMsg = false;
  return state;
};

export const toggleModalAction = (state: UIStateType): UIStateType => {
  state.isModalOpen = !state.isModalOpen;
  return state;
};

export const setModalAction = (
  state: UIStateType,
  Action: PayloadAction<ModalProps>
): UIStateType => {
  state.modal = Action.payload;
  return state;
};

type TriggerPayload = PayloadAction<{
  type?: UITypeActions;
  data?: {};
  on: boolean;
}>;

export const cleanTriggerAction = (state: UIStateType): UIStateType => {
  if (!state.trigger.on) return state;
  state.trigger = { on: false, data: {}, type: null };
  return state;
};

export const setTriggerAction = (
  state: UIStateType,
  { payload }: TriggerPayload
): UIStateType => {
  state.trigger.on = payload.on;
  if (payload.type && payload.data) {
    state.trigger.type = payload.type;
    state.trigger.data = payload.data;
  }
  return state;
};
