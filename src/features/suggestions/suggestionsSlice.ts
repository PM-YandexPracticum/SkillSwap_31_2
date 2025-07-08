/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getSuggestions as getSuggestionsApi,
  getSentSuggestions as getSentSuggestionsApi,
  addSuggestion as addSuggestionApi,
  acceptSuggestion as acceptSuggestionApi,
  rejectSuggestion as rejectSuggestionApi,
} from '@api/api';

export type TSuggestion = {
  id: string;
  who_ask_id: string;
  skill_id: string;
  accepted: boolean | null;
  created_at: string;
};

export type TIncomingSuggestion = {
  id: string;
  accepted: boolean | null;
  who_ask: {
    id: string;
    name: string;
  }[];
  skill: string | null;
};

type SuggestionsState = {
  incoming: TIncomingSuggestion[];
  sent: TSuggestion[];
  loading: boolean;
  error: string | null;
};

const initialState: SuggestionsState = {
  incoming: [],
  sent: [],
  loading: false,
  error: null,
};

export const getSuggestions = createAsyncThunk(
  'suggestions/getSuggestions',
  async (currentUserId: string, thunkAPI) => {
    try {
      return await getSuggestionsApi(currentUserId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unexpected error');
    }
  }
);

export const getSentSuggestions = createAsyncThunk(
  'suggestions/getSentSuggestions',
  async (userId: string, thunkAPI) => {
    try {
      return await getSentSuggestionsApi(userId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unexpected error');
    }
  }
);

export const addSuggestion = createAsyncThunk(
  'suggestions/addSuggestion',
  async (
    { currentUserId, skillId }: { currentUserId: string; skillId: string },
    thunkAPI
  ) => {
    try {
      await addSuggestionApi(currentUserId, skillId);
      thunkAPI.dispatch(getSentSuggestions(currentUserId));
      return null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unexpected error');
    }
  }
);

export const acceptSuggestion = createAsyncThunk(
  'suggestions/acceptSuggestion',
  async (
    {
      currentUserId,
      suggestionId,
    }: { currentUserId: string; suggestionId: string },
    thunkAPI
  ) => {
    try {
      await acceptSuggestionApi(currentUserId, suggestionId);
      thunkAPI.dispatch(getSuggestions(currentUserId));
      return null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unexpected error');
    }
  }
);

export const rejectSuggestion = createAsyncThunk(
  'suggestions/rejectSuggestion',
  async (suggestionId: string, thunkAPI) => {
    try {
      await rejectSuggestionApi(suggestionId);
      return suggestionId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unexpected error');
    }
  }
);

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.incoming = action.payload;
      })
      .addCase(getSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSentSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSentSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.sent = action.payload;
      })
      .addCase(getSentSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(rejectSuggestion.fulfilled, (state, action) => {
        state.sent = state.sent.map((s) =>
          s.id === action.payload ? { ...s, accepted: false } : s
        );
      });
  },
});

export default suggestionsSlice.reducer;
