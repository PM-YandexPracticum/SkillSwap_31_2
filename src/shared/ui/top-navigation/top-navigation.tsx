import { Link } from 'react-router-dom';
import React, { memo } from 'react';

import styles from './top-navigation.module.scss';

import dropdownIcon from '@assets/icons/dropdown-icon.svg';
import { TopNavigationUIProps } from '@ui/top-navigation/types';

export const TopNavigationUI: React.FC<TopNavigationUIProps> = memo(
  ({ locationState }) => {
    return (
      <ul className={styles.headerMenu}>
        <li>
          <Link to="/">О проекте</Link>
        </li>
        <li className={styles.dropdown}>
          <Link to="/menu/skills" state={locationState}>
            Все навыки
            <span className={styles.dropdownIcon}>
              <img src={dropdownIcon} width={24} height={24} alt="dropdown" />
            </span>
          </Link>
        </li>
      </ul>
    );
  }
);
