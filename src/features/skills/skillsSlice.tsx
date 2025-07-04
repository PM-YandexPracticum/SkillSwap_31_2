/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getSkills } from '@api/api';
import { TSkill } from '@entities/skills';
import { TUserState } from '@features/auth/authSlice';

type TSkillState = {
  skills: TSkill[] | [];
  isLoading: boolean;
  error: string | null;

  searchQuery: string;
  isSearchCommitted: boolean;
};

const initialState: TSkillState = {
  skills: [],
  isLoading: false,
  error: null,

  searchQuery: '',
  isSearchCommitted: false,
};

export const getSkillsThunk = createAsyncThunk(
  'get/skills',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: TUserState };
      const currentUserId = state.auth.user?.id ?? null;
      const skills = await getSkills(currentUserId);
      return skills;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  }
);

export const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchCommitted: (state, action) => {
      state.isSearchCommitted = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSkillsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSkillsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Get skills failed';
      })
      .addCase(getSkillsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skills = action.payload;
      });
  },
});

export const { clearError, setSearchQuery, setSearchCommitted } =
  skillSlice.actions;

export default skillSlice.reducer;
