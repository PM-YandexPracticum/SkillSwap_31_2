/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getSuggestions as getSuggestionsApi,
  addSuggestion as addSuggestionApi,
  acceptSuggestion as acceptSuggestionApi,
  rejectSuggestion as rejectSuggestionApi,
} from '@api/api';

export type TSuggestion = {
  id: string;
  who_ask_id: string;
  skill_id: string | null;
  accepted: boolean | null;
  created_at: string;
};

type TIncomingSuggestion = {
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

export const fetchSuggestions = createAsyncThunk<
  { type: 'sent' | 'incoming'; data: TSuggestion[] | TIncomingSuggestion[] },
  { userId: string; type: 'sent' | 'incoming' }
>('suggestions/fetchSuggestions', async ({ userId, type }, thunkAPI) => {
  try {
    const data = await getSuggestionsApi(userId, type);
    return { type, data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unexpected error');
  }
});

export const addSuggestion = createAsyncThunk(
  'suggestions/addSuggestion',
  async (
    { currentUserId, skillId }: { currentUserId: string; skillId: string },
    thunkAPI
  ) => {
    try {
      await addSuggestionApi(currentUserId, skillId);
      thunkAPI.dispatch(
        fetchSuggestions({ userId: currentUserId, type: 'sent' })
      );
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
      thunkAPI.dispatch(
        fetchSuggestions({ userId: currentUserId, type: 'incoming' })
      );
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
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        const { type, data } = action.payload;

        if (type === 'sent') {
          state.sent = data as TSuggestion[];
        } else {
          state.incoming = data as TIncomingSuggestion[];
        }
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
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