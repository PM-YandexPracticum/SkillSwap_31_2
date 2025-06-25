import React from 'react';

import HeartIcon from '../../../assets/icons/heart.svg?react';
import {
  getColorByNameOrCategory,
  getSkillsFromCategoryIds,
} from '../../lib/userCardUtils';

import styles from './UserCard.module.css';

interface Skill {
  name: string;
  categoryId: number;
}

interface UserCardProps {
  avatarUrl: string;
  name: string;
  city: string;
  age: number;
  skillsToTeach: Skill[];
  wishesIds: number[];
}

export const UserCard: React.FC<UserCardProps> = ({
  avatarUrl,
  name,
  city,
  age,
  skillsToTeach,
  wishesIds,
}) => {
  const skillsToWish = getSkillsFromCategoryIds(wishesIds);

  const displayedTeachSkills = skillsToTeach.slice(0, 2);
  const remainingTeachCount =
    skillsToTeach.length - displayedTeachSkills.length;

  const displayedWishSkills = skillsToWish.slice(0, 2);
  const remainingWishCount = skillsToWish.length - displayedWishSkills.length;

  return (
    <div className={styles.card}>
      <button
        className={styles.favorite}
        aria-label="Добавить в избранное"
        type="button"
      >
        <HeartIcon className={styles.heart} />
      </button>

      <div className={styles.header}>
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className={styles.avatar}
        />
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.meta}>
            {city}, {age} лет
          </p>
        </div>
      </div>

      <div>
        <p className={styles.label}>Может научить:</p>
        <div className={styles.tags}>
          {displayedTeachSkills.map((skill) => (
            <span
              key={`${skill.name}-${skill.categoryId}`}
              className={styles.tag}
              style={{
                backgroundColor: getColorByNameOrCategory(skill.name),
              }}
            >
              {skill.name}
            </span>
          ))}
          {remainingTeachCount > 0 && (
            <span
              className={styles.tag}
              style={{
                backgroundColor: getColorByNameOrCategory('more_tags'),
              }}
            >
              +{remainingTeachCount}
            </span>
          )}
        </div>
      </div>

      <div>
        <p className={styles.label}>Хочет научиться:</p>
        <div className={styles.tags}>
          {displayedWishSkills.map((skill) => (
            <span
              key={`${skill.name}-${skill.categoryId}`}
              className={styles.tag}
              style={{
                backgroundColor: getColorByNameOrCategory(skill.name),
              }}
            >
              {skill.name}
            </span>
          ))}
          {remainingWishCount > 0 && (
            <span
              className={styles.tag}
              style={{
                backgroundColor: getColorByNameOrCategory('more_tags'),
              }}
            >
              +{remainingWishCount}
            </span>
          )}
        </div>
      </div>

      <button
        className={styles.details}
        aria-label={`Подробнее о пользователе ${name}`}
        type="button"
      >
        Подробнее
      </button>
    </div>
  );
};
