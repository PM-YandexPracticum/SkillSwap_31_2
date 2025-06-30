import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getUsers, getUserByEmailPassword } from '@api/api';
import { TUser, TLoginData } from '@entities/user';

type TUserState = {
  user: TUser | null;
  isInit: boolean;
  isUserLoading: boolean;
  users: TUser[] | [];
  isUsersLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isInit: false,
  isUserLoading: false,
  users: [],
  isUsersLoading: false,
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
        state.isUserLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload;
        state.isInit = true;
      })

      // Получение пользователей
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
