import { FC } from 'react';

import { useSelector } from '@services/store';
import { SkillsListUI } from '@ui/index';
import {
  getUsers,
  getSkills,
  getSearchQuery,
  getIsSearchCommitted,
} from '@services/selectors';
import { TUserWithSkills } from '@app/entities/user';
import { getUsersWithSkills, getFavoriteUsersWithSkills } from '@lib/helpers';

interface SkillsListProps {
  type: {
    title: string;
    size?: number;
    isFavorites?: boolean;
  };
}

export const SkillsList: FC<SkillsListProps> = ({ type }) => {
  const users = useSelector(getUsers);
  const skills = useSelector(getSkills);
  const searchQuery = useSelector(getSearchQuery);
  const isSearchCommitted = useSelector(getIsSearchCommitted);

  const isAppropriateList = type.title === 'Подходящие предложения';

  const filteredSkills =
    isAppropriateList && isSearchCommitted
      ? skills.filter((skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : skills;

  if (!users || !skills) return null;

  let usersWithSkills: TUserWithSkills[] = getUsersWithSkills(
    users,
    filteredSkills
  );

  if (type.isFavorites) {
    usersWithSkills = getFavoriteUsersWithSkills(usersWithSkills);
  }

  return <SkillsListUI title={type.title} usersWithSkills={usersWithSkills} />;
};
