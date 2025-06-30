import React from 'react';

import dropdownIcon from '../../assets/icons/dropdown-icon.svg';
import moon from '../../assets/icons/moon.svg';
import tagClose from '../../assets/icons/tag-close.svg';

import styles from './home.module.scss';

import { Logotype } from '@app/widgets';
import { Aside } from '@app/shared/ui/aside/aside';
import { UserCard } from '@app/shared/ui/UserCard';

export const Home = () => {
  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <Logotype />
        <nav className={styles.headerNav}>
          <ul className={styles.headerMenu}>
            <li>
              <a href="/">О проекте</a>
            </li>
            <li className={styles.dropdown}>
              <a href="/">
                Все навыки{' '}
                <span className={styles.dropdownIcon}>
                  <img
                    src={dropdownIcon}
                    width={24}
                    height={24}
                    alt="dropdown"
                  />
                </span>
              </a>
            </li>
          </ul>
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
          </div>
        </nav>
      </header>
      <main className={styles.content}>
        <Aside />
        <div className={styles.resultsSection}>
          <div className={styles.resultsHeaderContainer}>
            <div className={styles.filterTags}>
              <button type="button" className={styles.filterTagBtn}>
                <span className={styles.tagCloseIcon}>
                  <img src={tagClose} alt="закрыть" width={24} height={24} />
                </span>
              </button>
            </div>
            <div className={styles.resultsHeaderRow}>
              <div className={styles.resultsTitle}>Подходящие предложения:</div>
              <button type="button" className={styles.resultsSortBtn}>
                <span>
                  {/* SVG иконка сортировки */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5636 7.82219C10.3881 7.82219 10.2125 7.75755 10.074 7.61898L7.12706 4.67207L4.18015 7.61898C3.91225 7.88688 3.46883 7.88688 3.20093 7.61898C2.93302 7.35108 2.93302 6.90766 3.20093 6.63976L6.63748 3.20321C6.76681 3.07388 6.9423 3 7.12706 3C7.31182 3 7.48737 3.07388 7.6167 3.20321L11.0532 6.63976C11.3211 6.90766 11.3211 7.35108 11.0532 7.61898C10.9146 7.75755 10.7391 7.82219 10.5636 7.82219Z"
                      fill="#253017"
                    />
                    <path
                      d="M7.12669 21.014C6.74793 21.014 6.43384 20.6999 6.43384 20.3212V3.69285C6.43384 3.31409 6.74793 3 7.12669 3C7.50544 3 7.81953 3.31409 7.81953 3.69285V20.3212C7.81953 20.6999 7.50544 21.014 7.12669 21.014Z"
                      fill="#253017"
                    />
                    <path
                      d="M16.8729 21.0133C16.6882 21.0133 16.5126 20.9394 16.3833 20.8101L12.9468 17.3735C12.6789 17.1056 12.6789 16.6622 12.9468 16.3943C13.2147 16.1264 13.6581 16.1264 13.926 16.3943L16.8729 19.3412L19.8198 16.3943C20.0877 16.1264 20.5311 16.1264 20.799 16.3943C21.0669 16.6622 21.0669 17.1056 20.799 17.3735L17.3625 20.8101C17.2332 20.9394 17.0484 21.0133 16.8729 21.0133Z"
                      fill="#253017"
                    />
                    <path
                      d="M16.8637 21.014C16.485 21.014 16.1709 20.6999 16.1709 20.3212V3.69285C16.1709 3.31409 16.485 3 16.8637 3C17.2425 3 17.5566 3.31409 17.5566 3.69285V20.3212C17.5566 20.6999 17.2517 21.014 16.8637 21.014Z"
                      fill="#253017"
                    />
                  </svg>
                </span>
                Сначала новые
              </button>
            </div>
          </div>
          <div className={styles.cardsRow}>
            <UserCard
              name="Иван"
              city="Санкт-Петербург"
              age={35}
              avatar_url="https://i.pravatar.cc/100"
              skills={[{ name: 'Английский язык', color: '#EBE5C5' }]}
              wishes={[
                { name: 'Тайм менеджмент', color: '#E7F2F6' },
                { name: 'Медитация', color: '#E9F7E7' },
                { name: 'Английский язык', color: '#EBE5C5' },
                { name: 'Английский язык', color: '#EBE5C5' },
              ]}
            />
          </div>
        </div>
      </main>
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
    </div>
  );
};
