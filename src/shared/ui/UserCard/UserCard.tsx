import React from 'react';
import clsx from 'clsx';

import HeartIcon from '../../../assets/icons/heart.svg?react';

import styles from './UserCard.module.css';

interface Tag {
  name: string;
  color: string;
}

interface UserCardProps {
  name: string;
  city: string;
  age: number;
  avatar_url: string;
  skills: Tag[];
  wishes: Tag[];
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  city,
  age,
  avatar_url,
  skills,
  wishes,
}) => {
  const visibleSkills = skills.slice(0, 2);
  const extraSkillsCount = skills.length > 2 ? skills.length - 2 : 0;

  const visibleWishes = wishes.slice(0, 2);
  const extraWishesCount = wishes.length > 2 ? wishes.length - 2 : 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <img src={avatar_url} alt={name} className={styles.avatar} />
          <div>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.meta}>
              {city}, {age} года
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавить в избранное"
          className={styles.likeButton}
        >
          <HeartIcon width={20} height={20} />
        </button>
      </div>

      <div>
        <p className={styles.sectionTitle}>Может научить:</p>
        <div className={styles.tags}>
          {visibleSkills.map((skill) => (
            <span
              key={skill.name}
              className={styles.tag}
              style={{ backgroundColor: skill.color }}
            >
              {skill.name}
            </span>
          ))}
          {extraSkillsCount > 0 && (
            <span className={clsx(styles.tag, styles.moreTag)}>
              +{extraSkillsCount}
            </span>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Хочет научиться:</p>
        <div className={styles.tags}>
          {visibleWishes.map((wish) => (
            <span
              key={wish.name}
              className={styles.tag}
              style={{ backgroundColor: wish.color }}
            >
              {wish.name}
            </span>
          ))}
          {extraWishesCount > 0 && (
            <span className={clsx(styles.tag, styles.moreTag)}>
              +{extraWishesCount}
            </span>
          )}
        </div>
      </div>

      <button type="button" className={styles.button}>
        Подробнее
      </button>
    </div>
  );
};
