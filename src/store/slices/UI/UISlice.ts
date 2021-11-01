import { createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { UITypeActions } from '../../helpers';
import {
  cleanTriggerAction,
  clearErrorAction,
  clearSuccessAction,
  setErrorAction,
  setIsLoadingAction,
  setModalAction,
  setSuccessAction,
  setTriggerAction,
  toggleModalAction,
} from './actions';

export type ModalProps = {
  children?: ReactNode;
  title: string;
  heading: string;
  text?: string;
  action?: string;
};

export type UIStateType = {
  isModalOpen: boolean;
  isLoading: boolean;
  error: { hasError: boolean; msg: string | null };
  success: { hasMsg: boolean; msg: string | null };
  modal: ModalProps;
  trigger: { on: boolean; type: UITypeActions | null; data: any };
};

const initialState: UIStateType = {
  error: {
    hasError: false,
    msg: null,
  },
  isLoading: false,
  success: {
    hasMsg: false,
    msg: null,
  },
  isModalOpen: false,
  modal: {
    heading: '',
    title: '',
    text: '',
    action: '',
  },
  trigger: {
    on: false,
    type: null,
    data: {},
  },
};

export const UISlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsLoading: setIsLoadingAction,
    clearError: clearErrorAction,
    setError: setErrorAction,
    setSuccess: setSuccessAction,
    clearSuccess: clearSuccessAction,
    toggleModal: toggleModalAction,
    setModal: setModalAction,
    cleanTrigger: cleanTriggerAction,
    setTrigger: setTriggerAction,
  },
});

export const UIActions = UISlice.actions;
export default UISlice.reducer;