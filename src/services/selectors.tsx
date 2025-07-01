import { RootState } from './store';

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getUserisInit = (state: RootState) => state.auth.isInit;
export const getUserLoading = (state: RootState) => state.auth.isLoading;
