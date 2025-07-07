import { RootState } from './store';

import { TCategory, TSubcategory } from '@entities/Categories/types';

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getUserisInit = (state: RootState) => state.auth.isInit;
export const getUserLoading = (state: RootState) => state.auth.isLoading;
export const getUsers = (state: RootState) => state.auth.users;

export const getSkills = (state: RootState) => state.skills.skills;
export const getSearchQuery = (state: RootState) => state.skills.searchQuery;
export const getIsSearchCommitted = (state: RootState) =>
  state.skills.isSearchCommitted;

export const getCategories = (state: RootState): TCategory[] =>
  state.categories.categories;
export const getCategory = (
  state: RootState,
  id: string
): TCategory | undefined =>
  state.categories.categories.find((category) => category.id === id);
export const getSubCategories = (
  state: RootState,
  id: string | undefined
): TSubcategory[] => {
  if (!id) {
    return state.categories.subcategories;
  }
  return state.categories.subcategories.filter(
    (category) => category.category_id === id
  );
};

export const getSubCategory = (
  state: RootState,
  id: string | undefined
): TSubcategory | undefined =>
  state.categories.subcategories.find((category) => category.id === id);

export const getAllCategories = (state: RootState) => state.categories.allCategoris;