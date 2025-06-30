/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getUserByEmailPassword } from '@api/api';
import { TUser, TLoginData } from '@entities/user';

export type TUserState = {
  user: TUser | null;
  isInit: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isInit: false,
  isLoading: false,
  error: null,
};

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      return await getUserByEmailPassword(data);
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  }
);

export const getUsersThunk = createAsyncThunk(
  'user/fetch',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: TUserState };
      const currentUserId = state.auth.user?.id ?? null;
      const users = await getUsers(null, currentUserId);
      return users;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initUser: (state) => {
      state.isInit = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Логин
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isInit = true;
      })
  },
});

export const { clearError, initUser } = authSlice.actions;

export default authSlice.reducer;
