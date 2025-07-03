import styles from './home.module.scss';
import { useState } from 'react';

import { Aside } from '@ui/aside/aside';
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
          <SkillsList type={skillListTypes.appropriate} />
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
