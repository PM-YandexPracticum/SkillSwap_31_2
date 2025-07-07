/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getUserByEmailPassword, getUsers } from '@api/api';
import { TUser, TLoginData } from '@entities/user';

export type TUserState = {
  user: TUser | null;
  isInit: boolean;
  isLoading: boolean;
  users: TUser[];
  isUsersLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isInit: false,
  isLoading: false,
  users: [],
  isUsersLoading: false,
  error: null,
};

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const user = await getUserByEmailPassword(data);
      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  }
);

export const getUsersThunk = createAsyncThunk('user/fetch', async () => {
  return getUsers();
});

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
      .addCase(getUsersThunk.pending, (state) => {
        state.isUsersLoading = true;
        state.error = null;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isUsersLoading = false;
        state.error = action.error.message || 'Get Users failed';
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      });
  },
});

export const { clearError, initUser } = authSlice.actions;
export default authSlice.reducer;
