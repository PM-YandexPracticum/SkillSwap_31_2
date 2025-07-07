import { FC } from 'react';

import { useSelector } from '@services/store';
import { SkillsListUI } from '@ui/index';
import {
  getUsers,
  getSkills,
  getSearchQuery,
  getSubCategories,
} from '@services/selectors';
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
  const subcategories = useSelector(getSubCategories);
  const searchQuery = useSelector(getSearchQuery);

  const filteredSkills = type.isFiltred
    ? skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : skills;

  if (!users || !skills) return null;

  let usersWithSkills: TUserWithSkills[] = getUsersWithSkills(
    users,
    filteredSkills,
    subcategories
  );

  if (type.isFavorites) {
    usersWithSkills = getFavoriteUsersWithSkills(usersWithSkills);
  }

  if (type.size) {
    usersWithSkills = usersWithSkills.slice(0, type.size);
  }

  const title = type.isFiltred
    ? `${type.title}${usersWithSkills.length}`
    : type.title;
  return <SkillsListUI title={title} usersWithSkills={usersWithSkills} />;
};
