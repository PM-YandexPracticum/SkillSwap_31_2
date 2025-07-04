import { useSelector } from 'react-redux';

import styles from './home.module.scss';

import { Aside } from '@ui/aside/aside';
import { FilterButtonsPanelUI } from '@ui/filter-buttons-panel';
import { SkillsList } from '@pages/skills-list';
import { skillListTypes } from '@lib/constants';
import { RootState } from '@services/store';

export const Home = () => {
  const isSearchCommitted = useSelector(
    (state: RootState) => state.skills.isSearchCommitted
  );

  return (
    <div className={styles.homePage}>
      <main className={styles.content}>
        <Aside />
        {isSearchCommitted ? (
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
