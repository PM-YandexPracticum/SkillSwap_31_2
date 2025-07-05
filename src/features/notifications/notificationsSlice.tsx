import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@app/services/store';
import {
  addNotification,
  getNotifications,
  NotificationData,
  readNotifications,
  removeNotifications,
} from '@app/api/api';

const getCurrentUser = (state: RootState) => state.auth.user;

interface NotificationsState {
  loading: boolean;
  error: string | null;
}

const initialState: NotificationsState = {
  loading: false,
  error: null,
};

type ThunkApiConfig = {
  state: RootState;
  rejectValue: string;
};

type AddNotificationParams = {
  user_id: string;
  suggestion_id: string;
};

type ReadNotificationParams = {
  notification_id?: string | null;
};

// Получение уведомлений конкретного пользователя
export const fetchNotifications = createAsyncThunk<
  NotificationData[],
  void,
  ThunkApiConfig
>(
  'notifications/fetchNotifications',
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState().auth;

    if (!user?.id) {
      return rejectWithValue('User is not authorized');
    }

    try {
      // Используем готовый API-запрос вместо дублирования кода
      const notifications = await getNotifications(user.id);
      return notifications;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Unknown error occurred');
    }
  }
);

// Добавление уведомления
export const addNotificationThunk = createAsyncThunk<
  void,
  AddNotificationParams,
  ThunkApiConfig
>(
  'user/notifications/add',
  async ({ user_id, suggestion_id }, { getState, rejectWithValue }) => {
    const state = getState();
    const currentUser = getCurrentUser(state);

    if (!currentUser) {
      return rejectWithValue('Пользователь не авторизован');
    }

    try {
      await addNotification(currentUser.id, user_id, suggestion_id);
      return undefined; // Явный возврат undefined для consistent-return
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Ошибка добавления'
      );
    }
  }
);

export const readNotificationsThunk = createAsyncThunk<
  void,
  ReadNotificationParams,
  ThunkApiConfig
>(
  'user/notifications/read',
  async ({ notification_id = null }, { getState, rejectWithValue }) => {
    const state = getState();
    const currentUser = getCurrentUser(state);

    if (!currentUser) {
      return rejectWithValue('Пользователь не авторизован');
    }

    try {
      await readNotifications(currentUser.id, notification_id);
      return undefined;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Ошибка при обновлении статуса уведомления'
      );
    }
  }
);

export const removeReadNotificationsThunk = createAsyncThunk<
  void,
  void,
  ThunkApiConfig
>('user/notifications/remove', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const currentUser = getCurrentUser(state);

  if (!currentUser) {
    return rejectWithValue('Пользователь не авторизован');
  }

  try {
    await removeNotifications(currentUser.id);
    return undefined;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Не удалось удалить уведомления'
    );
  }
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotificationError: () => initialState, // сбрасываем в начальное состояние
  },
  extraReducers: (builder) => {
    const handlePending = (state: NotificationsState) => ({
      ...state,
      loading: true,
      error: null,
    });

    const handleFulfilled = (state: NotificationsState) => ({
      ...state,
      loading: false,
    });

    const handleRejected = (
      state: NotificationsState,
      action: PayloadAction<string | undefined>
    ) => ({
      ...state,
      loading: false,
      error: action.payload || 'Произошла ошибка',
    });

    builder
      .addCase(addNotificationThunk.pending, handlePending)
      .addCase(addNotificationThunk.fulfilled, handleFulfilled)
      .addCase(addNotificationThunk.rejected, handleRejected)
      .addCase(fetchNotifications.pending, handlePending)
      .addCase(fetchNotifications.fulfilled, handleFulfilled)
      .addCase(fetchNotifications.rejected, handleRejected)
      .addCase(readNotificationsThunk.pending, handlePending)
      .addCase(readNotificationsThunk.fulfilled, handleFulfilled)
      .addCase(readNotificationsThunk.rejected, handleRejected)
      .addCase(removeReadNotificationsThunk.pending, handlePending)
      .addCase(removeReadNotificationsThunk.fulfilled, handleFulfilled)
      .addCase(removeReadNotificationsThunk.rejected, handleRejected);
  },
});

export const { clearNotificationError } = notificationsSlice.actions;
export default notificationsSlice.reducer;
