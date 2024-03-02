import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import successReducer from './successReducer';

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  success: successReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
