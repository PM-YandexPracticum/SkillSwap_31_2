import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

import { verifyPassword } from '../shared/lib/helpers';

const supabaseUrl = process.env.REST_API_URL!;
const supabaseKey = process.env.REST_API_ANON!;

const supabase = createClient(supabaseUrl, supabaseKey);

type SkillRef = { id: string };
type WishesRef = { subcategory_id: string };

type UserData = {
  gender: string | null;
  city: string | null;
  skills_ids: string[];
  wishes_ids: string[];
  id: string;
  name: string;
  age: number;
  about: string;
  avatar_url: string;
  email: string;
  password: string;
  created_at: string;
  modified_at: string;
  is_liked: boolean;
  birthday: Date;
};

export async function getUserFavorites(
  current_user_id: string
): Promise<string[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', current_user_id);

  if (error) throw error;
  return data.map((item) => item.favorite_id);
}

function calculateAge(birthday: string): number {
  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Уточнение: если день рождения ещё не наступил в этом году
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
}

export async function getUsers(
  email: string | null = null,
  current_user_id: string | null = null
): Promise<UserData[]> {
  const query = supabase.from('users').select(`
      id,
      name,
      birthday,
      about,
      avatar_url,
      email,
      created_at,
      modified_at,
      gender:gender_id(name),
      city:city_id(name),
      skills_ids:skills(id),
      wishes_ids:user_wishes(subcategory_id),
      password
    `);

  if (email) {
    query.eq('email', email);
  }
  const { data, error } = email ? await query.eq('email', email) : await query;

  if (error) throw error;

  // Получаем список id лайкнутых пользователей текущим юзером (если current_user_id есть)
  const likedIds = current_user_id
    ? await getUserFavorites(current_user_id)
    : [];

  return (data ?? []).map((user) => ({
    ...user,
    gender: (user.gender as { name?: string })?.name ?? null,
    city: (user.city as { name?: string })?.name ?? null,
    skills_ids: (user.skills_ids as SkillRef[]).map((s) => s.id),
    wishes_ids: (user.wishes_ids as WishesRef[]).map((s) => s.subcategory_id),
    is_liked: current_user_id ? likedIds.includes(user.id) : false,
    age: calculateAge(user.birthday),
    birthday: new Date(user.birthday),
  }));
}

type LoginData = {
  email: string;
  password: string;
};

export async function getUserByEmailPassword({
  email,
  password,
}: LoginData): Promise<UserData | string> {
  const users = await getUsers(email);
  const user = users[0];

  if (!user) return 'access·denied';
  if (await verifyPassword(password, user.password)) return user;

  // Нужно обдумать формат ошибки при неправильной паре email/password
  return 'aceess·denied';
}

type SkillData = {
  category: string | null;
  subcategory: string | null;
  id: string;
  name: string;
  description: string;
  images: string[];
  owner_id: string;
  created_at: string;
  modified_at: string;
};

export async function getSkills(): Promise<SkillData[]> {
  const { data, error } = await supabase.from('skills').select(
    `id,
    name,
    description,
    images,
    owner_id,
    created_at,
    modified_at,
    category:category_id(name),
    subcategory:subcategory_id(name)`
  );

  if (error) throw error;

  // Преобразрование связанных полей в нужный формат
  const result = data.map((skill) => ({
    ...skill,
    category: (skill.category as { name?: string })?.name ?? null,
    subcategory: (skill.subcategory as { name?: string })?.name ?? null,
  }));
  return result;
}

type CategoryData = {
  id: string;
  name: string;
};

export async function getCategories(): Promise<CategoryData[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data;
}

type SubcategoryData = {
  id: string;
  name: string;
  category_id: string;
};

export async function getSubcategories(
  categoryId: string | null = null
): Promise<SubcategoryData[]> {
  const query = supabase.from('subcategories').select('*');

  const { data, error } = categoryId
    ? await query.eq('category_id', categoryId)
    : await query;

  if (error) throw error;
  return data;
}

export async function patchUserFavorites(
  current_user_id: string,
  favorite_ids: string[]
): Promise<void> {
  const currentFavoriteIds = await getUserFavorites(current_user_id);
  const toAdd = favorite_ids.filter((id) => !currentFavoriteIds.includes(id));
  const toRemove = currentFavoriteIds.filter(
    (id) => !favorite_ids.includes(id)
  );

  if (toRemove.length > 0) {
    const { error: deleteError } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', current_user_id)
      .in('favorite_id', toRemove);

    if (deleteError) throw deleteError;
  }

  if (toAdd.length > 0) {
    const toInsert = toAdd.map((favorite_id) => ({
      user_id: current_user_id,
      favorite_id,
    }));

    const { error: insertError } = await supabase
      .from('favorites')
      .insert(toInsert);

    if (insertError) throw insertError;
  }
}
