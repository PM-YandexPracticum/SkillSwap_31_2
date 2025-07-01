import { FC } from 'react';

import { useSelector } from '@services/store';
import { SkillsListUI } from '@ui/index';
import { getUsers, getSkills } from '@services/selectors';
import { TUserWithSkills } from '@app/entities/user';

export const SkillsList: FC = () => {
  const users = useSelector(getUsers);
  const skills = useSelector(getSkills);

  if (!users || !skills) return null;

  // Преобразуем пользователей
  const usersWithSkills: TUserWithSkills[] = users.map((user) => {
    const userSkills = skills.filter((skill) =>
      user.skills_ids.includes(skill.id)
    );
    const userWishes = skills.filter((skill) =>
      user.wishes_ids.includes(skill.id)
    );

    return {
      ...user,
      skills: userSkills,
      wishes: userWishes,
    };
  });

  // Фильтруем только тех, у кого есть хотя бы один is_liked skill
  const filteredUsers = usersWithSkills.filter((user) =>
    user.skills.some((skill) => skill.is_liked)
  );

  if (!filteredUsers) return null;

  return <SkillsListUI usersWithSkills={filteredUsers} />;
};
