import bcrypt from 'bcryptjs';

import { saltRounds } from './constants';

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
