import { Link } from 'react-router-dom';
import React from 'react';

import styles from './top-navigation.module.scss';

import dropdownIcon from '@assets/icons/dropdown-icon.svg';

export const TopNavigationUI = () => {
  return (
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
  );
};
