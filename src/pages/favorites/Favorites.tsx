import { FC } from 'react';

import styles from './favorites.module.scss';

import { SkillsList } from '@pages/skills-list';
import { skillListTypes } from '@lib/constants';

export const Favorites: FC = () => {
  return <SkillsList type={skillListTypes.favorites} />;
};
