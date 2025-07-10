import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './app-header.module.scss';
import { TAppHeaderUIProps } from './type';

import { TopNavigation } from '@widgets/top-navigation';
import { Logotype } from '@app/widgets';
import moon from '@assets/icons/moon.svg';
import bell from '@assets/icons/bell.svg';
import like from '@assets/icons/like.svg';
import defaultAvatar from '@assets/default-avatar.png';
import { useSelector } from '@services/store';
import { getIsFiltred } from '@services/selectors';
import { Search } from '@widgets/search';
import { AuthButtons } from '@features/auth';
import { NotificationsModal } from '@widgets/notifications-modal/NotificationsModal';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ user }) => {
  const isFiltred = useSelector(getIsFiltred);

  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <header className={styles.header}>
      <Logotype />
      <nav className={styles.headerNav}>
        <TopNavigation />
        {!isFiltred && <Search placeholder="Введите навык..." />}

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.themeSwitcher}
            title="Переключить тему"
          >
            <span className={styles.moonSvg}>
              <img src={moon} width={24} height={24} alt="moon" />
            </span>
          </button>

          {user ? (
            <>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className={styles.themeSwitcher}
                title="Уведомления"
              >
                <span className={styles.bell}>
                  <img src={bell} width={24} height={24} alt="bell" />
                </span>
              </button>
              <Link
                to="/favorites"
                type="button"
                className={styles.themeSwitcher}
                title="Избранное"
              >
                <span className={styles.themeSwitcher}>
                  <img src={like} width={24} height={24} alt="like" />
                </span>
              </Link>
              <Link to="/profile" className={styles.profileLink}>
                <span className={styles.themeSwitcher}>
                  <span>{user.name}</span>
                  <img
                    src={defaultAvatar}
                    width={48}
                    height={48}
                    alt={user.name || 'Профиль'}
                    className={styles.avatar}
                  />
                </span>
              </Link>
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
      </nav>
      {isModalOpen && (
        <NotificationsModal onClose={() => setModalOpen(false)} />
      )}
    </header>
  );
};
