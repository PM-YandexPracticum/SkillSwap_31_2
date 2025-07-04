import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './app-header.module.scss';
import { TAppHeaderUIProps } from './type';

import { Logotype } from '@app/widgets';
import dropdownIcon from '@assets/icons/dropdown-icon.svg';
import moon from '@assets/icons/moon.svg';
import bell from '@assets/icons/bell.svg';
import like from '@assets/icons/like.svg';
import defaultAvatar from '@assets/default-avatar.png';
import { useSelector } from '@services/store';
import { getIsSearchCommitted } from '@services/selectors';
import { Search } from '@widgets/search';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ user }) => {
  const isFiltred = useSelector(getIsSearchCommitted);

  return (
    <header className={styles.header}>
      <Logotype />
      <nav className={styles.headerNav}>
        <ul className={styles.headerMenu}>
          <li>
            <Link to="/">О проекте</Link>
          </li>
          <li className={styles.dropdown}>
            <Link to="/">
              Все навыки{' '}
              <span className={styles.dropdownIcon}>
                <img src={dropdownIcon} width={24} height={24} alt="dropdown" />
              </span>
            </Link>
          </li>
        </ul>

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
              <Link
                to="/notifications"
                type="button"
                className={styles.themeSwitcher}
                title="Напоминания"
              >
                <span className={styles.bell}>
                  <img src={bell} width={24} height={24} alt="bell" />
                </span>
              </Link>
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
            <>
              <button
                type="button"
                className={`${styles.authBtn} ${styles.login}`}
              >
                Войти
              </button>
              <button
                type="button"
                className={`${styles.authBtn} ${styles.register}`}
              >
                Зарегистрироваться
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
