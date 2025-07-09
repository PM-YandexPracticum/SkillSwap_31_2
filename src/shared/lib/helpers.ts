import bcrypt from 'bcryptjs';

import { TUser, TUserWithSkills } from '@entities/user';
import { TSkill } from '@entities/skills';
import { TSubcategory } from '@entities/Categories/types';
import { saltRounds, tagThemes, TagTheme, ThemeValue } from '@lib/constants';

// Хэширование пароля перед сохранением
export async function hashPassword(plainPassword: string): Promise<string> {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}

// Проверка пароля при входе
export async function verifyPassword(
  plainPassword: string,
  hash: string
): Promise<boolean> {
  const result = await bcrypt.compare(plainPassword, hash);
  return result;
}

// Преобразуем скилы (добавляем данные пользователей)
export function getSkillsWithUserData(
  users: TUser[],
  skills: TSkill[],
  subcategories: TSubcategory[]
): TUserWithSkills[] {
  return users.map((user) => {
    const userSkills = skills.filter((skill) =>
      user.skills_ids.includes(skill.id)
    );
    const userWishes = subcategories.filter((subcategory) =>
      user.wishes_ids.includes(subcategory.id)
    );

    return {
      ...user,
      skills: userSkills,
      wishes: userWishes,
    };
  });
}

// Фильтруем только тех, у кого есть хотя бы один is_liked skill
export function getFavoriteSkillsithUsers(
  usersWithSkills: TUserWithSkills[]
): TUserWithSkills[] {
  return usersWithSkills.filter((user) =>
    user.skills.some((skill) => skill.is_liked)
  );
}

export function getCategoryThemeIcon(themeName: string) {
  let url;
  switch (themeName) {
    case 'themeCareer': {
      url = '/icons/categories/default.svg';
      break;
    }
    case 'themeLanguages': {
      url = '/icons/categories/languages.svg';
      break;
    }
    case 'themeHome': {
      url = '/icons/categories/home.svg';
      break;
    }
    case 'themeArt': {
      url = '/icons/categories/art.svg';
      break;
    }
    case 'themeEducation': {
      url = '/icons/categories/education.svg';
      break;
    }
    case 'themeHealth': {
      url = '/icons/categories/health.svg';
      break;
    }
    default: {
      url = '/icons/categories/default.svg';
    }
  }
  return url;
}

export const getTheme = (
  categoryName: string | null = null
): ThemeValue | 'themeDefault' => {
  if (!categoryName) return 'themeDefault';
  return categoryName in tagThemes
    ? tagThemes[categoryName as TagTheme]
    : 'themeDefault';
};

// Функция для склонения слова "год"
export const getAgeWord = (age: number): string => {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'лет';
  if (lastDigit === 1) return 'год';
  if (lastDigit >= 2 && lastDigit <= 4) return 'года';
  return 'лет';
};

export const getFiltredSkills = (
  skills: TUserWithSkills[],
  searchText: string,
  searchCities: string[],
  searchGender: string,
  searchMain: string,
  searchSubcategories: string[]
): TUserWithSkills[] => {
  const searchTextLower = searchText.toLowerCase();

  return skills.filter((skill) => {
    // Фильтрация по полу
    if (searchGender !== '' && skill.gender !== searchGender) {
      return false;
    }

    // Фильтрация по городам
    if (
      searchCities.length > 0 &&
      (!skill.city || !searchCities.includes(skill.city))
    ) {
      return false;
    }
    // Фильтрация по тексту (ищем названиях навыков)
    if (searchText) {
      // Проверяем, есть ли хотя бы один навык с подходящим названием
      const hasMatchingSkill = skill.skills.some(
        (skillName) =>
          skillName.name?.toLowerCase().includes(searchTextLower) ?? false
      );

      if (!hasMatchingSkill) {
        return false;
      }
    }
    return true;
  });
};
