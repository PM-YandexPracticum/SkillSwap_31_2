import { useSelector } from 'react-redux';

import styles from './home.module.scss';

import { Aside } from '@ui/aside/aside';
import { FilterButtonsPanelUI } from '@ui/filter-buttons-panel';
import { SkillsList } from '@pages/skills-list';
import { skillListTypes } from '@lib/constants';
import { getIsFiltred, getCurrentUser } from '@services/selectors';

export const Home = () => {
  const isFiltered = useSelector(getIsFiltred);
  const currentUser = useSelector(getCurrentUser);

  const renderFilteredContent = () => (
    <>
      <FilterButtonsPanelUI />
      <SkillsList type={skillListTypes.appropriate} />
    </>
  );

  const renderDefaultContent = () => {
    if (!currentUser) {
      return (
        <>
          <SkillsList type={skillListTypes.popular} />
          <SkillsList type={skillListTypes.new} />
          <SkillsList type={skillListTypes.recommended} />
        </>
      );
    }
    return (
      <>
        <SkillsList type={skillListTypes.exactly} />
        <SkillsList type={skillListTypes.newIdeas} />
        <SkillsList type={skillListTypes.recommended} />
      </>
    );
  };

  return (
    <div className={styles.homePage}>
      <main className={styles.content}>
        <Aside />
        <div className={styles.resultsSection}>
          {isFiltered ? renderFilteredContent() : renderDefaultContent()}
        </div>
      </main>
    </div>
  );
};
