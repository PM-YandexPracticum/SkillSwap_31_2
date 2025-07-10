import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonUI } from '../button';
import { LikeButtonUI } from '../like-button';
import { SkillTagUI } from '../skillTag';

import styles from './SkillCard.module.css';

import { useDispatch, useSelector } from '@services/store';
import { toggleLikeThuhk } from '@features/skills/skillsSlice';
import { SkillWithTheme } from '@entities/skills';
import { TSubcategoryWithCategoryName } from '@entities/Categories/types';
import { getCurrentUser } from '@services/selectors';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(getCurrentUser);
  const currentSkill = skills[0];
  const visibleSkills = skills.slice(0, 2);
  const extraSkillsCount = skills.length > 2 ? skills.length - 2 : undefined;

  const visibleWishes = wishes.slice(0, 2);
  const extraWishesCount = wishes.length > 2 ? wishes.length - 2 : undefined;

  const handleToggle = () => {
    if (currentUser) {
      dispatch(
        toggleLikeThuhk({
          skill_id: currentSkill.id,
          currentUserId: currentUser.id,
          is_liked: currentSkill.is_liked,
        })
      );
    } else {
      navigate('/login');
    }
  };

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
            <LikeButtonUI
              isLiked={currentSkill ? currentSkill.is_liked : false}
              onClick={handleToggle}
              isDisabled={!currentSkill}
            />
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
