import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

import { TCategory, TSubcategory } from '@entities/Categories/types';

export const getCurrentUser = (state: RootState) => state.auth.user;
export const getUserLoading = (state: RootState) => state.auth.isLoading;
export const getUsers = (state: RootState) => state.auth.users;
export const getAllCities = (state: RootState) => state.auth.cities;
export const getAllGenders = (state: RootState) => state.auth.genders;

export const getSkills = (state: RootState) => state.skills.skills;
export const getSkillsIsLoading = (state: RootState) => state.skills.isLoading;

export const getCategories = (state: RootState): TCategory[] =>
  state.categories.categories;
export const getCategory = (
  state: RootState,
  id: string
): TCategory | undefined =>
  state.categories.categories.find((category) => category.id === id);
export const getSubCategories = (state: RootState) => state.categories.subcategories
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
export const getFilterText = (state: RootState) => state.filter.text;

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
