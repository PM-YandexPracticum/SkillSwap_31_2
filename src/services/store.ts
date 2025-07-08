import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';

import auth from '@features/auth/services/authSlice';
import skills from '@features/skills/skillsSlice';
import categories from '@app/features/categories/categoriesSlice';
import filter from '@features/filter/filterSlice';

export const rootReducer = combineReducers({
  auth,
  skills,
  categories,
  filter,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
