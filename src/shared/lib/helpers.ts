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
