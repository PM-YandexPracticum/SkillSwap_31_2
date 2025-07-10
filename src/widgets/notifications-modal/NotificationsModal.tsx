import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NotificationsModal.module.css';

import { useSelector, useDispatch } from '@services/store';
import { ModalUI } from '@ui/modal';
import { NotificationData } from '@app/api/api';
import { readNotificationsThunk } from '@features/notification/notificationSlice';

export const NotificationsModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const newNotifications = notifications.filter((n) => !n.is_read);
  const readNotifications = notifications.filter((n) => n.is_read);

  const handleReadAll = () => {
    dispatch(readNotificationsThunk({ notification_id: null }));
  };

  const handleGoToSuggestion = (suggestionId: string) => {
    navigate(`/suggestions/${suggestionId}`);
    onClose();
  };

  return (
    <ModalUI onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.sectionHeader}>
          <h3>Новые уведомления</h3>
          {newNotifications.length > 0 && (
            <button
              type="button"
              className={styles.linkButton}
              onClick={handleReadAll}
            >
              Прочитать все
            </button>
          )}
        </div>

        {newNotifications.length === 0 ? (
          <p>Нет новых уведомлений</p>
        ) : (
          <div className={styles.list}>
            {newNotifications.map((n: NotificationData) => (
              <div key={n.id} className={styles.item}>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span>Пользователь {n.sender_id} принял ваш обмен</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleGoToSuggestion(n.suggestion_id)}
                  >
                    Перейти
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.sectionHeader}>
          <h3>Просмотренные</h3>
          {readNotifications.length > 0 && (
            <button type="button" className={styles.linkButton}>
              Очистить
            </button>
          )}
        </div>

        {readNotifications.length === 0 ? (
          <p>Нет просмотренных уведомлений</p>
        ) : (
          <div className={styles.list}>
            {readNotifications.map((n: NotificationData) => (
              <div key={n.id} className={styles.item}>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <span>Пользователь {n.sender_id} предлагает вам обмен</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalUI>
  );
};
