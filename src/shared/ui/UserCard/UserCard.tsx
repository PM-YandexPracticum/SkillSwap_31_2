import React, { useState, useCallback } from "react";
import clsx from "clsx";
import styles from "./UserCard.module.css";
import HeartIcon from "../../../assets/icons/heart.svg?react";

interface UserCardProps {
  avatarUrl: string;
  name: string;
  city: string;
  age: number;
  skillsToTeach: string[];
  skillsToLearn: string[];
}

export const UserCard: React.FC<UserCardProps> = ({
  avatarUrl,
  name,
  city,
  age,
  skillsToTeach,
  skillsToLearn,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev);
  }, []);

  const displayedLearnSkills = skillsToLearn.slice(0, 2);
  const remainingCount = skillsToLearn.length - displayedLearnSkills.length;

  return (
    <div className={styles.card}>
      <button
        className={styles.favorite}
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      >
        <HeartIcon
          className={clsx(styles.heart, {
            [styles.heartActive]: isFavorite,
          })}
        />
      </button>

      <div className={styles.header}>
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className={clsx(styles.avatar, styles.avatarLarge)}
        />
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.meta}>
            {city}, {age} лет
          </p>
        </div>
      </div>

      <div className={styles.block}>
        <p className={styles.label}>Может научить:</p>
        <div className={styles.tags}>
          {skillsToTeach.map((skill) => (
            <span key={skill} className={clsx(styles.tag, styles.tagTeach)}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <p className={styles.label}>Хочет научиться:</p>
        <div className={styles.tags}>
          {displayedLearnSkills.map((skill) => (
            <span key={skill} className={clsx(styles.tag, styles.tagLearn)}>
              {skill}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className={clsx(styles.tag, styles.tagMore)}>
              +{remainingCount}
            </span>
          )}
        </div>
      </div>

      <button className={styles.details} aria-label={`Подробнее о пользователе ${name}`}>
        Подробнее
      </button>
    </div>
  );
};
