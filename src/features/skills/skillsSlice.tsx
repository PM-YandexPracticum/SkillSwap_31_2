/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  addSkill,
  patchSkill,
  getSkills,
  addUserFavoriteSkill,
  removeUserFavoriteSkill,
} from '@api/api';
import { TSkill } from '@entities/skills';
import { TAuthState } from '@features/auth/services/authSlice';

type TSkillState = {
  skills: TSkill[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TSkillState = {
  skills: [],
  isLoading: false,
  error: null,
};

export const getSkillsThunk = createAsyncThunk<
  TSkill[],
  void,
  { rejectValue: string }
>('skills/get', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as { auth: TAuthState };
    const userId = state.auth.user?.id;
    // if (!userId) throw new Error('Authentication required');
    return await getSkills(userId);
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Failed to load skills');
  }
});

export const addSkillThunk = createAsyncThunk<
  void,
  {
    category_id: string;
    subcategory_id: string;
    name: string;
    description: string;
    images?: string[];
  },
  { rejectValue: string }
>('skills/add', async (payload, { getState, dispatch, rejectWithValue }) => {
  try {
    const state = getState() as { auth: TAuthState };
    const userId = state.auth.user?.id;
    if (!userId) throw new Error('Authentication required');

    const id = await addSkill(
      payload.category_id,
      payload.subcategory_id,
      payload.name,
      payload.description,
      userId,
      payload.images ?? []
    );

    await dispatch(getSkillsThunk());
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Failed to add skill');
  }
});

export const patchSkillThunk = createAsyncThunk<
  void,
  {
    skill_id: string;
    category_id?: string | null;
    subcategory_id?: string | null;
    name?: string | null;
    description?: string | null;
    images?: string[];
  },
  { rejectValue: string }
>('skills/patch', async (payload, { getState, dispatch, rejectWithValue }) => {
  try {
    const state = getState() as { auth: TAuthState };
    const userId = state.auth.user?.id;
    if (!userId) throw new Error('Authentication required');

    await patchSkill(payload);
    await dispatch(getSkillsThunk());
    return undefined;
  } catch (error) {
    return rejectWithValue(
      (error as Error).message || 'Failed to update skill'
    );
  }
});

export const toggleLikeThuhk = createAsyncThunk<
  void,
  {
    skill_id: string;
    currentUserId: string;
    is_liked: boolean;
  },
  { rejectValue: string }
>('skills/toggleLike', async (payload) => {
  if (payload.is_liked) {
    await removeUserFavoriteSkill(payload.currentUserId, payload.skill_id);
  } else {
    await addUserFavoriteSkill(payload.currentUserId, payload.skill_id);
  }
});

export const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSkillsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSkillsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skills = action.payload;
      })
      .addCase(getSkillsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load skills';
      })
      .addCase(addSkillThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addSkillThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to add skill';
      })
      .addCase(patchSkillThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(patchSkillThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(patchSkillThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update skill';
      })
      .addCase(toggleLikeThuhk.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleLikeThuhk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleLikeThuhk.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update skillLike';
      });
  },
});

export const { clearError } = skillSlice.actions;

export default skillSlice.reducer;
