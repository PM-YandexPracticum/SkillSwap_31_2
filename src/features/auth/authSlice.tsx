/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getUserByEmailPassword, getUsers, addUser, patchUser } from '@api/api';
import { TUser, TLoginData } from '@entities/user';

export type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  users: TUser[];
  isUsersLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
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
      const users = await getUsers();
      const exists = users.find(
        (u) => u.email.toLowerCase() === userData.email.toLowerCase()
      );
      if (exists) {
        return rejectWithValue('User already exists');
      }

      const id = await addUser(userData.email, userData.password);
      return { ...userData, id };
    } catch (error) {
      return rejectWithValue((error as Error).message || 'Unknown error');
    }
  }
);

export const patchUserThunk = createAsyncThunk<
  Partial<TUser> & { id: string },
  Partial<TUser> & { id: string },
  { rejectValue: string }
>('user/patch', async (userData, { rejectWithValue }) => {
  try {
    await patchUser({
      user_id: userData.id,
      ...userData,
    });
    return userData;
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Unknown error');
  }
});

export const getUsersThunk = createAsyncThunk<
  TUser[],
  void,
  { rejectValue: string }
>('user/fetch', async (_, { rejectWithValue }) => {
  try {
    return await getUsers();
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Failed to load users');
  }
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
      .addCase(patchUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(patchUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...(state.user || {}),
          ...action.payload,
        } as TUser;
      })
      .addCase(patchUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getUsersThunk.pending, (state) => {
        state.isUsersLoading = true;
        state.error = null;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.isUsersLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.isUsersLoading = false;
        state.error = action.payload ?? 'Failed to fetch users';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
