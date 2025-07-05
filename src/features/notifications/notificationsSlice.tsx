import { addNotification, getNotifications, readNotifications, removeNotifications } from '@app/api/api';
import { getCurrentUser } from '@app/services/selectors';
import { RootState } from '@app/services/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


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
}

type ReadNotificationParams = {
  notification_id?: string | null;
}


//Получение уведомлений конкретного пользователя
export const fetchNotifications = createAsyncThunk(
  'user/notifications',
  async (_, { getState }) => {
    const { user } = (getState() as RootState).auth;
    if (!user?.id) throw new Error('Пользователь не авторизован');
    return getNotifications(user.id);
  }
);

//Добавление уведомления
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
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка добавления');
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
>(
  'user/notifications/remove',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const currentUser = getCurrentUser(state);
      
      if (!currentUser) {
        return rejectWithValue('Пользователь не авторизован');
      }

      await removeNotifications(currentUser.id);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error 
          ? error.message 
          : 'Не удалось удалить уведомления'
      );
    }
  }
);

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotificationError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNotificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
       console.log("1");
      })
      .addCase(addNotificationThunk.fulfilled, (state,action) => {
        state.loading = false;
        console.log(action.payload);
         console.log("2");
      })
      .addCase(addNotificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при добавлении уведомления';
      })
       .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state) => {
        state.loading = false;
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
});


export const { clearNotificationError } = notificationsSlice.actions;
export default notificationsSlice.reducer;