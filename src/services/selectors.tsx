import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

import { TCategory, TSubcategory } from '@entities/Categories/types';

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getUserLoading = (state: RootState) => state.auth.isLoading;
export const getIsRegistration = (state: RootState) =>
  state.auth.isRegistration;
export const getUsers = (state: RootState) => state.auth.users;
export const getUsersbyEmail = (state: RootState, email: string) =>
  state.auth.users.find((user) => user.email === email);

export const getRegistrationStep = (state: RootState) =>
  state.auth.registration.step;
export const getRegistrationMaxStep = (state: RootState) =>
  state.auth.registration.maxStep;

export const getRegistrationData = (state: RootState) =>
  state.auth.registration;
export const getAllCities = (state: RootState) => state.auth.cities;
export const getAllGenders = (state: RootState) => state.auth.genders;

export const getSkills = (state: RootState) => state.skills.skills;
export const getSkillsIsLoading = (state: RootState) => state.skills.isLoading;
export const getSkillById = (id: string) => (state: RootState) =>
  state.skills.skills.find((skill) => skill.id === id);

export const getUserFirstSkill = (id: string) => (state: RootState) =>
  state.auth.users.find((user) => user.id === id)?.skills_ids[0];

export const getUserById = (id: string) => (state: RootState) =>
  state.auth.users.find((user) => user.id === id);

export const getCategories = (state: RootState): TCategory[] =>
  state.categories.categories;
export const getCategory = (
  state: RootState,
  id: string
): TCategory | undefined =>
  state.categories.categories.find((category) => category.id === id);
export const getSubCategories = (
  state: RootState,
  id: string
): TSubcategory[] => {
  return state.categories.subcategories.filter(
    (category) => category.category_id === id
  );
};
export const getAllSubCategories = (state: RootState): TSubcategory[] =>
  state.categories.subcategories;

export const getSubCategory = (
  state: RootState,
  id: string | undefined
): TSubcategory | undefined =>
  state.categories.subcategories.find((category) => category.id === id);

export const getAllCategories = (state: RootState) =>
  state.categories.allCategoris;

export const getIsFiltred = (state: RootState) => state.filter.is_filtred;
export const getFilterCities = (state: RootState) => state.filter.cities;
export const getFilterGender = (state: RootState) => state.filter.gender;
export const getFilterMain = (state: RootState) => state.filter.main;
export const getFilterSubcategories = (state: RootState) =>
  state.filter.subcategories;

export const getFilterSubcategoriesByIds = (state: RootState, ids: string[]) =>
  state.categories.subcategories.filter((item) => ids.includes(item.id));
export const getFilterText = (state: RootState) => state.filter.text;

export const getIncomingSuggestions = (state: RootState) =>
  state.suggestions.incoming;
// получение списка всех тегов фильтра
export const getFilterTags = createSelector(
  [
    getFilterMain,
    getFilterGender,
    getFilterText,
    getFilterSubcategories,
    getFilterCities,
  ],
  (main, gender, text, subcategories, cities) => [
    ...(main ? [main] : []),
    ...(gender ? [gender] : []),
    ...(text ? [text] : []),
    ...subcategories,
    ...cities,
  ]
);
