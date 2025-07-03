import styles from './home.module.scss';

import { Aside } from '@ui/aside/aside';
import { SkillsList } from '@pages/skills-list';
import { skillListTypes } from '@lib/constants';

export const Home = () => {
  const filtred: boolean = true;

  return (
    <div className={styles.homePage}>
      <main className={styles.content}>
        <Aside />
        if (filtred) {
          <SkillsList type={skillListTypes.appropriate} />
        }
        else {<div className={styles.resultsSection}>
          <SkillsList type={skillListTypes.popular} />
          <SkillsList type={skillListTypes.new} />
          <SkillsList type={skillListTypes.recommended} />
        </div>}
      </main>
    </div>
  );
};
