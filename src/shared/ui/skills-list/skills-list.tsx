import { FC } from 'react';

import styles from './skills-list.module.css';
import { SkillsListUIProps } from './type';

import { UserCard } from '@ui/UserCard';

export const SkillsListUI: FC<SkillsListUIProps> = ({ usersWithSkills }) => (
  <section className={styles.skills_list}>
    <ul className={styles.items}>
      {usersWithSkills.map((user) => (
        <UserCard
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
