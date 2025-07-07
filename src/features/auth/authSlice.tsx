/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getUserByEmailPassword, getUsers, addUser } from '@api/api';
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

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (userData: TUser, { rejectWithValue }) => {
    try {
      const id = await addUser(userData.email, userData.password);
      return { ...userData, id };
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
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsersThunk.rejected, (state) => {
        state.isUsersLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;