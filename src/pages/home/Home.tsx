import { useState } from 'react';

import styles from './home.module.scss';

import { Aside } from '@ui/aside/aside';
import { FilterButtonsPanelUI } from '@ui/filter-buttons-panel';

import { SkillsList } from '@pages/skills-list';
import { skillListTypes } from '@lib/constants';
import tagClose from '@assets/icons/tag-close.svg';

export const Home = () => {
  // надо реализовать изменение при использовании фильтра
  const [filtered, setFiltered] = useState<boolean>(false);

  return (
    <div className={styles.homePage}>
      <main className={styles.content}>
        <Aside />

        {/* Выдаем страницу подходящих предложений, если есть фильтр */}
        {filtered ? (
          <>
            <FilterButtonsPanelUI />
            <SkillsList type={skillListTypes.appropriate} />
          </>
        ) : (
          <div className={styles.resultsSection}>
            <SkillsList type={skillListTypes.popular} />
            <SkillsList type={skillListTypes.new} />
            <SkillsList type={skillListTypes.recommended} />
          </div>
        )}
      </main>
    </div>
  );
};
