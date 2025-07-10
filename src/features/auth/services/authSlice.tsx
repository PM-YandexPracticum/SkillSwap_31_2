/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUserByEmailPassword,
  getUsers,
  addUser,
  patchUser,
  getCities,
  getGenders,
} from '@api/api';
import {
  TUser,
  TLoginData,
  TRegistrationState,
  TRegUser,
} from '@entities/user';
import { TCityItem } from '@entities/cities';
import { TGenderItem } from '@entities/genders';
import { TRegSkill } from '@entities/skills.tsx';

export type TAuthState = {
  user: TUser | null;
  isLoading: boolean;
  users: TUser[];
  isUsersLoading: boolean;
  error: string | null;
  cities: TCityItem[];
  genders: TGenderItem[];
  isRegistration: boolean;
  registration: TRegistrationState;
};

const initialState: TAuthState = {
  user: null,
  isLoading: false,
  users: [],
  isUsersLoading: false,
  isRegistration: false,
  error: null,
  cities: [],
  genders: [],
  registration: {
    user: {} as TRegUser,
    skill: {} as TRegSkill,
    step: 1,
    maxStep: 3,
  },
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
  async (regUserData: TRegUser, { getState, rejectWithValue }) => {
    const userData: TUser = {
      ...regUserData,
      id: '',
      age: 0,
      about: '',
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
    };
    const { auth } = getState() as { auth: TAuthState };
    try {
      const users = await getUsers();
      const exists = users.find(
        (u) => u.email.toLowerCase() === userData.email.toLowerCase()
      );
      if (exists) {
        return rejectWithValue('User already exists');
      }

      userData.id = await addUser(userData.email, userData.password);
      await patchUser({
        user_id: userData.id,
        gender_id:
          auth.genders.find((item) => item.name === (regUserData.gender || ''))
            ?.id || null,
        city_id:
          auth.cities.find((item) => item.name === (regUserData.city || ''))
            ?.id || null,
        name: userData.name || null,
        about: userData.about || null,
        avatar_url: userData.avatar_url || null,
        birthday: userData.birthday || null,
      });
      return userData;
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

export const getCitiesThunk = createAsyncThunk<TCityItem[]>(
  'user/getAllCities',
  async (_, { rejectWithValue }) => {
    try {
      return await getCities();
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Failed to load users'
      );
    }
  }
);

export const getGendersThunk = createAsyncThunk<TGenderItem[]>(
  'user/getAllGenders',
  async (_, { rejectWithValue }) => {
    try {
      return await getGenders();
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Failed to load users'
      );
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
    nextRegistrationStep(state, payload) {
      switch (state.registration.step) {
        case 1:
          state.registration.step += 1;
          if (payload.payload) {
            state.registration.user.email = payload.payload.email;
            state.registration.user.password = payload.payload.password;
          }
          break;
        case 2:
          state.registration.step += 1;
          state.registration.user.avatar_url = payload.payload.avatar;
          state.registration.user.name = payload.payload.name;
          state.registration.user.birthday = payload.payload.birthday;
          state.registration.user.gender = payload.payload.gender;
          state.registration.user.city = payload.payload.city;
          state.registration.user.wishes_ids = payload.payload.wishes_ids;
          break;
        case 3:
          state.registration.skill = payload.payload;
          state.isRegistration = true;
          break;
        default:
      }
    },
    backRegistrationStep(state) {
      if (state.registration.step > 1) state.registration.step -= 1;
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

    builder
      .addCase(getCitiesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCitiesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      })
      .addCase(getCitiesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch cities';
      });

    builder
      .addCase(getGendersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGendersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.genders = action.payload;
      })
      .addCase(getGendersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch genders';
      });
  },
});

export const { logout, nextRegistrationStep, backRegistrationStep } =
  authSlice.actions;
export default authSlice.reducer;
