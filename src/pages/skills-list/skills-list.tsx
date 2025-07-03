import { FC } from 'react';

import { useSelector } from '@services/store';
import { SkillsListUI } from '@ui/index';
import { getUsers, getSkills } from '@services/selectors';
import { TUserWithSkills } from '@app/entities/user';
import { getUsersWithSkills, getFavoriteUsersWithSkills } from '@lib/helpers';

interface SkillsListProps {
  type: {
    title: string;
    size?: number;
    isFavorites?: boolean;
    isFiltred?: boolean;
  };
}

export const SkillsList: FC<SkillsListProps> = ({ type }) => {
  const users = useSelector(getUsers);
  const skills = useSelector(getSkills);

  if (!users || !skills) return null;

  // Преобразуем пользователей
  let usersWithSkills: TUserWithSkills[] = getUsersWithSkills(users, skills);

  // Фильтруем только тех, у кого есть хотя бы один is_liked skill
  if (type.isFavorites) {
    usersWithSkills = getFavoriteUsersWithSkills(usersWithSkills);
  }

  if (type.size) {
    usersWithSkills = usersWithSkills.slice(0, type.size);
  }

  // добавляем к title количество записей, если фильтр применен
  const title = type.isFiltred
    ? `${type.title}${usersWithSkills.length}`
    : type.title;

  return <SkillsListUI usersWithSkills={usersWithSkills} title={title} />;
};
