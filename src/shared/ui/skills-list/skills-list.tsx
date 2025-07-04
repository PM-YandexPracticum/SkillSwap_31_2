import { FC } from 'react';

import styles from './skills-list.module.css';
import { SkillsListUIProps } from './type';

import { SkillCard } from '@widgets/SkillCard';
import { SkillsListHeaderUI } from '@ui/skill-list-header';

export const SkillsListUI: FC<SkillsListUIProps> = ({
  usersWithSkills,
  title,
}) => (
  <section className={styles.resultsSection}>
    <SkillsListHeaderUI title={title} />
    <ul className={styles.cardsRow}>
      {usersWithSkills.map((user) => (
        <SkillCard
          key={user.id}
          name={user.name ?? undefined}
          city={user.city ?? undefined}
          age={user.age ?? undefined}
          avatar_url={user.avatar_url ?? undefined}
          skills={user.skills}
          wishes={user.wishes}
        />
      ))}
    </ul>
  </section>
);
