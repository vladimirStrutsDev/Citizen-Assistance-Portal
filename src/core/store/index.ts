import { configureStore } from '@reduxjs/toolkit';
import assistanceRequestReducer from './slices/assistanceRequestSlice';

export const store = configureStore({
  reducer: {
    assistanceRequest: assistanceRequestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;