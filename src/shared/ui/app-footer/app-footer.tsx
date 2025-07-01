import { FC } from 'react';

import styles from './app-footer.module.scss';

import { Logotype } from '@app/widgets';

export const AppFooterUI: FC = () => {
  return (
    <footer className={styles.footer}>
      <Logotype />
      <nav className={styles.footerMenu}>
        <ul>
          <li>О проекте</li>
          <li>Контакты</li>
          <li>Политика конфиденциальности</li>
          <li>Все навыки</li>
          <li>Блог</li>
          <li>Пользовательское соглашение</li>
        </ul>
      </nav>
      <div className={styles.footerCopyright}>SkillSwap — 2025</div>
    </footer>
  );
};
