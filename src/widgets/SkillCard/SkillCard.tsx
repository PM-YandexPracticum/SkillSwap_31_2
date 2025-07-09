import React, { useMemo } from 'react';

import { RootState, useSelector } from '@services/store';
import { getCategories } from '@services/selectors';
import { SkillCard as SkillCardUI } from '@ui/SkillCard';
import { TSkill, SkillWithTheme } from '@entities/skills';
import {
  TSubcategory,
  TSubcategoryWithCategoryName,
} from '@entities/Categories/types';
import { getTheme, getAgeWord } from '@lib/helpers';

interface SkillCardProps {
  name: string | undefined;
  city: string | undefined;
  age: number | undefined;
  avatar_url: string | undefined;
  skills: TSkill[];
  wishes: TSubcategory[];
  skillId: string | null | undefined;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  name,
  city,
  age,
  avatar_url,
  skills,
  wishes,
  skillId
}) => {
  const categories = useSelector(getCategories);

  // Формируем строку с городом и возрастом
  const cityAgeText = useMemo(() => {
    const cityPart = city || '';
    const agePart = age ? `${age} ${getAgeWord(age)}` : '';

    return [cityPart, agePart].filter(Boolean).join(', ');
  }, [city, age]);

  // Создаем карту категорий для быстрого поиска по ID
  const categoriesMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((category) => {
      map.set(category.id, category.name);
    });
    return map;
  }, [categories]);

  const skillTags = useMemo<SkillWithTheme[]>(
    () =>
      skills.map((skill) => ({
        ...skill,
        theme: getTheme(skill.category),
      })),
    [skills]
  );

  const wishTags = useMemo<TSubcategoryWithCategoryName[]>(
    () =>
      wishes.map((subcategory) => {
        // Получаем название категории по category_id
        const categoryName = categoriesMap.get(subcategory.category_id) || '';
        return {
          ...subcategory,
          theme: getTheme(categoryName),
        };
      }),
    [wishes, categoriesMap]
  );

  return (
    <SkillCardUI
      name={name}
      cityAgeText={cityAgeText}
      avatar_url={avatar_url}
      skills={skillTags}
      wishes={wishTags}
      skillId={skillId}
      
    />
  );
};
