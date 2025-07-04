import React, { ChangeEvent, FC, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './app-header.module.scss';
import { TAppHeaderUIProps } from './type';

import { Logotype } from '@app/widgets';
import dropdownIcon from '@assets/icons/dropdown-icon.svg';
import moon from '@assets/icons/moon.svg';
import bell from '@assets/icons/bell.svg';
import like from '@assets/icons/like.svg';
import defaultAvatar from '@assets/default-avatar.png';
import { SearchUI } from '@ui/search';
import { useSelector, useDispatch } from '@services/store';
import { getSkillsFilterStatus, getSearchQuery } from '@services/selectors';
import { setSearchQuery } from '@features/skills/skillsSlice';
import { WidgetCategoriesModal } from '@widgets/WidgetCategoriesModal/WidgetCategoriesModal.tsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ user }) => {
  const dispatch = useDispatch();
  const isFiltred = useSelector(getSkillsFilterStatus);
  const searchValue = useSelector(getSearchQuery);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearchClear = () => {
    dispatch(setSearchQuery(''));
  };
  const [modalOpen, setModalOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setModalOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setModalOpen(false), 250);
  };

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

        {!isFiltred && (
          <SearchUI
            value={searchValue}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
          />
        )}

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
      <WidgetCategoriesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </header>
  );
};
