import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@app/services/store';
import {
  getNotifications,
  NotificationData,
  readNotifications,
  removeNotifications,
} from '@app/api/api';

type NotificationsState = {
  loading: boolean;
  error: string | null;
  notifications: NotificationData[];
};

const initialState: NotificationsState = {
  loading: false,
  error: null,
  notifications: [],
};

type ThunkApiConfig = {
  state: RootState;
  rejectValue: string;
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
      return rejectWithValue('Пользователь не авторизован');
    }

    try {
      const notifications = await getNotifications(user.id);
      return notifications;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ошибка');
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
    const currentUser = state.auth.user;

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
  const currentUser = state.auth.user;

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
    clearNotificationError: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка при добавлении уведомления';
      })
      .addCase(readNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readNotificationsThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(readNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка';
      })
      .addCase(removeReadNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeReadNotificationsThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeReadNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при удалении уведомлений';
      });
  },

  selectors: {
    selectorNotification: (state) => state.notifications,
  },
});

export const { selectorNotification } = notificationsSlice.selectors;
export const { clearNotificationError } = notificationsSlice.actions;
export default notificationsSlice.reducer;
