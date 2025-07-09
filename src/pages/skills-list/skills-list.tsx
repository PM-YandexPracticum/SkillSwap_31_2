import { FC } from 'react';

import { useSelector } from '@services/store';
import { SkillsListUI } from '@ui/index';
import {
  getUsers,
  getSkills,
  getSubCategories,
  getSkillsIsLoading,
  getIsFiltred,
  getFilterText,
  getFilterCities,
  getFilterGender,
  getFilterMain,
  getFilterSubcategories,
} from '@services/selectors';
import { TUserWithSkills } from '@app/entities/user';
import {
  getSkillsWithUserData,
  getFavoriteSkillsWithUsers,
  getFiltredSkills,
} from '@lib/helpers';

interface SkillsListProps {
  type: {
    title: string;
    size?: number;
  };
  isFavorites: boolean;
}

export const SkillsList: FC<SkillsListProps> = ({
  type,
  isFavorites = false,
}) => {
  const users = useSelector(getUsers);
  const skills = useSelector(getSkills);
  const subcategories = useSelector(getSubCategories);
  const isLoading = useSelector(getSkillsIsLoading);
  const isFiltred = useSelector(getIsFiltred);
  const searchText = useSelector(getFilterText);
  const searchCities = useSelector(getFilterCities);
  const searchGender = useSelector(getFilterGender);
  const searchMain = useSelector(getFilterMain);
  const searchSubcategories = useSelector(getFilterSubcategories);

  // Добавляем скилам данные пользователей
  let skillsWithUserData: TUserWithSkills[] = getSkillsWithUserData(
    users,
    skills,
    subcategories
  );
  if (isFavorites) {
    skillsWithUserData = getFavoriteSkillsWithUsers(skillsWithUserData);
  }

  if (isFiltred) {
    skillsWithUserData = getFiltredSkills(
      skillsWithUserData,
      searchText,
      searchCities,
      searchGender,
      searchMain,
      searchSubcategories
    );
  }

  if (type.size) {
    skillsWithUserData = skillsWithUserData.slice(0, type.size);
  }

  const title = isFiltred
    ? `${type.title}: ${skillsWithUserData.length}`
    : type.title;
  return (
    <SkillsListUI
      title={title}
      usersWithSkills={skillsWithUserData}
      isLoading={isLoading}
    />
  );
};
