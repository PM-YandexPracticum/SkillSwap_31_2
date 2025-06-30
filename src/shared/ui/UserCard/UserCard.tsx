import React from 'react';

import { ButtonUI } from '../button';
import { LikeButtonUI } from '../like-button';
import { SkillTagUI } from '../skillTag';

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
          <div className={styles.likebutton}>
            <LikeButtonUI initialLiked={false} />
          </div>
        </div>
      </div>
      <div>
        <p className={styles.sectionTitle}>Может научить:</p>
        <div className={styles.tags}>
          {visibleSkills.map((skill) => (
            <SkillTagUI
              key={skill.name}
              text={skill.name}
              color={skill.color}
            />
          ))}
          {extraSkillsCount > 0 && (
            <SkillTagUI text={`+${extraSkillsCount}`} color="#E8ECF7" />
          )}
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Хочет научиться:</p>
        <div className={styles.tags}>
          {visibleWishes.map((wish) => (
            <SkillTagUI key={wish.name} text={wish.name} color={wish.color} />
          ))}
          {extraWishesCount > 0 && (
            <SkillTagUI text={`+${extraWishesCount}`} color="#E8ECF7" />
          )}
        </div>
      </div>

      <ButtonUI type="Primary" htmlType="button" classes={styles.button}>
        Подробнее
      </ButtonUI>
    </div>
  );
};
