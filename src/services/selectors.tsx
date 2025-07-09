import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { TCategory, TSubcategory } from '@entities/Categories/types';

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getUserLoading = (state: RootState) => state.auth.isLoading;
export const getUsers = (state: RootState) => state.auth.users;
export const getAllCities = (state: RootState) => state.auth.cities;
export const getAllGenders = (state: RootState) => state.auth.genders;

export const getSkills = (state: RootState) => state.skills.skills;
export const getSkillsIsLoading = (state: RootState) => state.skills.isLoading;
export const getSkillById = (id: string) => (state: RootState) => state.skills.skills.find((skill) => skill.id === id);

export const getUserFirstSkill = (id: string) => (state: RootState) => {
  const skill = state.auth.users.find((user) => user.id === id)?.skills_ids[0];
  return skill;
}
export const getUserById = (id: string) => (state: RootState) => {
  const user = state.auth.users.find((user) => user.id === id);
  return user;
}

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

export const getAllCategories = (state: RootState) =>
  state.categories.allCategoris;

export const getAllSubcategories = (state: RootState) => state.categories.subcategories;

export const getIsFiltred = (state: RootState) => state.filter.is_filtred;
export const getFilterCities = (state: RootState) => state.filter.cities;
export const getFilterGender = (state: RootState) => state.filter.gender;
export const getFilterMain = (state: RootState) => state.filter.main;
export const getFilterSubcategories = (state: RootState) =>
  state.filter.subcategories;
export const getFilterText = (state: RootState) => state.filter.text;
