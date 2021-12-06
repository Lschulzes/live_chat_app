import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/theme/index';
import authReducer from './slices/auth/index';
import UIReducer from './slices/UI/UISlice';
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    UI: UIReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
