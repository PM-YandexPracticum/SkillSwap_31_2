/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  TCategory,
  TCategoryWithSubcategories,
  TSubcategory,
} from '@entities/Categories/types';
import {
  getCategories,
  getCategoriesWithSubcategories,
  getSubcategories,
} from '@api/api';

type TCategoryState = {
  categories: TCategory[];
  subcategories: TSubcategory[];
  allCategoris: TCategoryWithSubcategories[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TCategoryState = {
  categories: [],
  subcategories: [],
  allCategoris: [],
  isLoading: false,
  error: null,
};

export const getCategoriesThunk = createAsyncThunk(
  'get/categories',
  async (_, { rejectWithValue }) => {
    try {
      return await getCategories();
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  }
);
export const getSubCategoriesThunk = createAsyncThunk(
  'get/subcategories',
  async (_, { rejectWithValue }) => {
    try {
      return await getSubcategories();
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  }
);

export const getCategoriesWithSubcategoriesThunk = createAsyncThunk(
  'get/categoriesWithSubcategoriesThunk',
  async (_, { rejectWithValue }) => {
    try {
      return await getCategoriesWithSubcategories();
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Get categories failed';
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getSubCategoriesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubCategoriesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Get subcategories failed';
      })
      .addCase(getSubCategoriesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subcategories = action.payload;
      })
      .addCase(getCategoriesWithSubcategoriesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getCategoriesWithSubcategoriesThunk.rejected,
        (state, actions) => {
          state.isLoading = false;
          state.error = actions.error.message || 'Get all categories failed';
        }
      )
      .addCase(
        getCategoriesWithSubcategoriesThunk.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.error = null;
          state.allCategoris = action.payload;
        }
      );
  },
});

export const { clearError } = categoriesSlice.actions;

export default categoriesSlice.reducer;
