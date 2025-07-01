import React from 'react';
import clsx from 'clsx';

import footerLogo from '../../assets/icons/logo.svg';

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={clsx(styles.footer)}>
      <div className={clsx(styles.footerLogo)}>
        <img src={footerLogo} alt="SkillSwap logo" />
        <span>SkillSwap</span>
      </div>

      <div className={clsx(styles.footerNav)}>
        <ul className={clsx(styles.footerList)}>
          <li>
            <a href="/about">О проекте</a>
          </li>
          <li>
            <a href="/skills">Все навыки</a>
          </li>
        </ul>

        <ul className={clsx(styles.footerList)}>
          <li>
            <a href="/contacts">Контакты</a>
          </li>
          <li>
            <a href="/blog">Блог</a>
          </li>
        </ul>

        <ul className={clsx(styles.footerList)}>
          <li>
            <a href="/privacy-policy">Политика конфиденциальности</a>
          </li>
          <li>
            <a href="/terms-of-service">Пользовательское соглашение</a>
          </li>
        </ul>
      </div>

      <div className={clsx(styles.footerCopyright)}>
        <p>SkillSwap — 2025</p>
      </div>
    </footer>
  );
};
