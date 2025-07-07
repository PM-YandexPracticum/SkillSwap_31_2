import React from 'react';

import { ButtonUI } from '../button';
import { LikeButtonUI } from '../like-button';
import { SkillTagUI } from '../skillTag';

import styles from './SkillCard.module.css';

import { SkillWithTheme } from '@entities/skills';
import { TSubcategoryWithCategoryName } from '@entities/Categories/types';

interface SkillCardProps {
  name: string | undefined;
  cityAgeText: string | undefined;
  avatar_url: string | undefined;
  skills: SkillWithTheme[];
  wishes: TSubcategoryWithCategoryName[];
}

export const SkillCard: React.FC<SkillCardProps> = ({
  name,
  cityAgeText,
  avatar_url,
  skills,
  wishes,
}) => {
  const visibleSkills = skills.slice(0, 2);
  const extraSkillsCount = skills.length > 2 ? skills.length - 2 : undefined;

  const visibleWishes = wishes.slice(0, 2);
  const extraWishesCount = wishes.length > 2 ? wishes.length - 2 : undefined;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <img src={avatar_url} alt={name} className={styles.avatar} />
          <div>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.meta}>{cityAgeText}</p>
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
            <SkillTagUI key={skill.id} name={skill.name} theme={skill.theme} />
          ))}
          {extraSkillsCount && (
            <SkillTagUI name={`+${extraSkillsCount}`} theme="themeDefault" />
          )}
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Хочет научиться:</p>
        <div className={styles.tags}>
          {visibleWishes.map((subcategory) => (
            <SkillTagUI
              key={subcategory.id}
              name={subcategory.name}
              theme={subcategory.theme}
            />
          ))}
          {extraWishesCount && (
            <SkillTagUI name={`+${extraWishesCount}`} theme="themeDefault" />
          )}
        </div>
      </div>

      <ButtonUI type="Primary" htmlType="button" classes={styles.button}>
        Подробнее
      </ButtonUI>
    </div>
  );
};
