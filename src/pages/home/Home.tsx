import React, { useState, useRef } from 'react';

import dropdownIcon from '../../assets/icons/dropdown-icon.svg';
import moon from '../../assets/icons/moon.svg';
import tagClose from '../../assets/icons/tag-close.svg';
import { WidgetCategoriesModal } from '../../widgets/WidgetCategoriesModal/WidgetCategoriesModal';

import styles from './home.module.scss';

import { Aside } from '@ui/aside/aside';
import { FilterButtonsPanelUI } from '@ui/filter-buttons-panel';
import { SkillsList } from '@pages/skills-list';
import { skillListTypes } from '@lib/constants';

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
