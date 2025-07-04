import { RootState } from './store';

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getUserisInit = (state: RootState) => state.auth.isInit;
export const getUserLoading = (state: RootState) => state.auth.isLoading;
export const getUsers = (state: RootState) => state.auth.users;

export const getSkills = (state: RootState) => state.skills.skills;

export const getSearchQuery = (state: RootState) => state.skills.searchQuery;

export const getSkillsFilterStatus = (state: RootState) => {
  return state.skills.isSearchCommitted;
};
