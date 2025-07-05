import { RootState } from './store';

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getUserisInit = (state: RootState) => state.auth.isInit;
export const getUserLoading = (state: RootState) => state.auth.isLoading;
export const getUsers = (state: RootState) => state.auth.users;

export const getSkills = (state: RootState) => state.skills.skills;
export const getSearchQuery = (state: RootState) => state.skills.searchQuery;
export const getIsSearchCommitted = (state: RootState) =>
  state.skills.isSearchCommitted;

export const getCategories = (state: RootState) => state.categories.categories;
export const getCategory = (state: RootState, id: string) =>
  state.categories.categories.find((category) => category.id === id);
export const getSubCategories = (state: RootState, id: string | undefined) => {
  if (!id) {
    return state.categories.subcategories;
  }
  return state.categories.subcategories.find(
    (category) => category.category_id === id
  );
};
