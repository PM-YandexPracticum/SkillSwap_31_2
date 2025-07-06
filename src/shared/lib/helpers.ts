import bcrypt from 'bcryptjs';

import { saltRounds } from './constants';

import { TUser, TUserWithSkills } from '@entities/user';
import { TSkill } from '@entities/skills';

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

// Преобразуем пользователей (добавляем данные скилов)
export function getUsersWithSkills(
  users: TUser[],
  skills: TSkill[]
): TUserWithSkills[] {
  return users.map((user) => {
    const userSkills = skills.filter((skill) =>
      user.skills_ids.includes(skill.id)
    );
    const userWishes = skills.filter((skill) =>
      user.wishes_ids.includes(skill.id)
    );

    return {
      ...user,
      skills: userSkills,
      wishes: userWishes,
    };
  });
}

// Фильтруем только тех, у кого есть хотя бы один is_liked skill
export function getFavoriteUsersWithSkills(
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
