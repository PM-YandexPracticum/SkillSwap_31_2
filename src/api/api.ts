import { createClient } from '@supabase/supabase-js';

import { verifyPassword, hashPassword } from '@lib/helpers';
import { TUser, TLoginData } from '@entities/user';
import { TSkill } from '@entities/skills';

const supabaseUrl = import.meta.env.VITE_REST_API_URL!;
const supabaseKey = import.meta.env.VITE_REST_API_ANON!;

const supabase = createClient(supabaseUrl, supabaseKey);

type SkillRef = { id: string };
type WishesRef = { subcategory_id: string };

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

export async function getUsers(email: string | null = null): Promise<TUser[]> {
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
  const { data, error } = await query;

  if (error) throw error;

  return (data ?? []).map((user) => ({
    ...user,
    gender: (user.gender as { name?: string })?.name ?? null,
    city: (user.city as { name?: string })?.name ?? null,
    skills_ids: (user.skills_ids as SkillRef[]).map((s) => s.id),
    wishes_ids: (user.wishes_ids as WishesRef[]).map((s) => s.subcategory_id),
    age: user.birthday ? calculateAge(user.birthday) : null,
    birthday: user.birthday ?? null,
  }));
}

export async function getUserByEmailPassword({
  email,
  password,
}: TLoginData): Promise<TUser> {
  const users = await getUsers(email);

  if (!users.length) {
    throw new Error('User not found');
  }

  const user = users[0];

  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    throw new Error('Access denied');
  }

  return user;
}

export async function addUser(
  email: string,
  password: string
): Promise<string> {
  const hashedPassword = await hashPassword(password);

  const { data, error } = await supabase
    .from('users')
    .insert({
      email,
      password: hashedPassword,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function patchUser({
  user_id,
  gender_id = null,
  city_id = null,
  name = null,
  about = null,
  avatar_url = null,
  email = null,
  password = null,
  birthday = null,
}: {
  user_id: string;
  gender_id?: string | null;
  city_id?: string | null;
  name?: string | null;
  about?: string | null;
  avatar_url?: string | null;
  email?: string | null;
  password?: string | null;
  birthday?: Date | string | null;
}): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changedParameters: Record<string, any> = {};

  if (gender_id !== null) changedParameters.gender_id = gender_id;
  if (city_id !== null) changedParameters.city_id = city_id;
  if (name !== null) changedParameters.name = name;
  if (about !== null) changedParameters.about = about;
  if (avatar_url !== null) changedParameters.avatar_url = avatar_url;
  if (email !== null) changedParameters.email = email;
  if (password !== null)
    changedParameters.password = await hashPassword(password);
  if (birthday !== null) changedParameters.birthday = new Date(birthday);
  if (Object.keys(changedParameters).length > 0)
    changedParameters.modified_at = new Date();

  const { error } = await supabase
    .from('users')
    .update(changedParameters)
    .eq('id', user_id);

  if (error) throw error;
}

export async function getUserFavoritesSkills(
  currentUserId: string | null = null
): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_favorites_skills')
    .select('*')
    .eq('user_id', currentUserId);
  if (error) throw error;
  return data.map((item) => item.skill_id);
}

export async function getSkills(
  currentUserId: string | null = null
): Promise<TSkill[]> {
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

  // Получаем список id лайкнутых пользователей текущим юзером (если currentUserId есть)
  const likedIds = currentUserId
    ? await getUserFavoritesSkills(currentUserId)
    : [];

  // Преобразрование связанных полей в нужный формат
  const result = data.map((skill) => ({
    ...skill,
    category: (skill.category as { name?: string })?.name ?? null,
    subcategory: (skill.subcategory as { name?: string })?.name ?? null,
    is_liked: currentUserId ? likedIds.includes(skill.id) : false,
  }));
  return result;
}

export async function addSkill(
  category_id: string,
  subcategory_id: string,
  name: string,
  description: string,
  currentUserId: string,
  images: string[] = []
): Promise<void> {
  const { error: insertError } = await supabase.from('skills').insert({
    category_id,
    subcategory_id,
    name,
    description,
    owner_id: currentUserId,
    images,
  });

  if (insertError) throw insertError;
}

export async function patchSkill({
  skill_id,
  category_id = null,
  subcategory_id = null,
  name = null,
  description = null,
  images = [],
}: {
  skill_id: string;
  category_id?: string | null;
  subcategory_id?: string | null;
  name?: string | null;
  description?: string | null;
  images?: string[];
}): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changedParameters: Record<string, any> = {};

  if (category_id !== null) changedParameters.category_id = category_id;
  if (subcategory_id !== null)
    changedParameters.subcategory_id = subcategory_id;
  if (name !== null) changedParameters.name = name;
  if (description !== null) changedParameters.description = description;
  if (images.length > 0) changedParameters.images = images;

  const { error } = await supabase
    .from('skills')
    .update(changedParameters)
    .eq('id', skill_id);

  if (error) throw error;
}

export async function removeSkill(skill_id: string): Promise<void> {
  const { error } = await supabase.from('skills').delete().eq('id', skill_id);

  if (error) throw error;
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

export async function addUserFavoriteSkill(
  currentUserId: string,
  skill_id: string
): Promise<void> {
  const { error: insertError } = await supabase
    .from('user_favorites_skills')
    .insert({
      user_id: currentUserId,
      skill_id,
    });

  if (insertError) throw insertError;
}

export async function removeUserFavoriteSkill(
  currentUserId: string,
  skill_id: string
): Promise<void> {
  const { error: deleteError } = await supabase
    .from('user_favorites_skills')
    .delete()
    .eq('user_id', currentUserId)
    .eq('skill_id', skill_id);

  if (deleteError) throw deleteError;
}

type WhoAskRef = {
  id: string;
  name: string;
};

type SuggestionData = {
  id: string;
  accepted: boolean;
  who_ask: WhoAskRef[];
  skill: string | null;
};

export async function getSuggestions(
  currentUserId: string
): Promise<SuggestionData[]> {
  const { data, error } = await supabase.from('suggestions').select(`
      id,
      accepted,
      who_ask:who_ask_id (
        id,
        name
      ),
      skill:skill_id (
        id,
        owner_id
      )
    `);

  if (error) throw error;

  return (data ?? [])
    .filter(
      (s) => (s.skill as { owner_id?: string })?.owner_id === currentUserId
    )
    .map((suggestion) => ({
      id: suggestion.id,
      accepted: suggestion.accepted,
      who_ask: suggestion.who_ask,
      skill: (suggestion.skill as { id?: string })?.id ?? null,
    }));
}

export async function addNotification(
  currentUserId: string,
  user_id: string,
  suggestion_id: string
): Promise<void> {
  const toInsert = {
    sender_id: currentUserId,
    user_id,
    suggestion_id,
  };
  const { error: insertError } = await supabase
    .from('notifications')
    .insert(toInsert);

  if (insertError) throw insertError;
}

export async function addSuggestion(
  currentUserId: string,
  skill_id: string
): Promise<void> {
  const { data, error } = await supabase
    .from('suggestions')
    .insert({ who_ask_id: currentUserId, skill_id }).select(`
      id,
      who_ask_id,
      skill_id (
        id,
        owner_id
      )
    `);

  if (error) throw error;

  const suggestion = data?.[0];
  const ownerId = (suggestion?.skill_id as { owner_id?: string })?.owner_id;

  if (!suggestion || !ownerId) {
    throw new Error('Не удалось получить owner_id для уведомления');
  }
  await addNotification(currentUserId, ownerId, suggestion.id);
}

export async function acceptSuggestion(
  currentUserId: string,
  suggestion_id: string
): Promise<void> {
  const { data, error } = await supabase
    .from('suggestions')
    .update({ accepted: true })
    .eq('id', suggestion_id)
    .select('who_ask_id');
  if (error) throw error;

  const suggestion = data?.[0];

  if (!suggestion || !suggestion.who_ask_id) {
    throw new Error('Не удалось получить who_ask_id');
  }
  await addNotification(currentUserId, suggestion.who_ask_id, suggestion_id);
}

type NotificationData = {
  id: string;
  is_read: boolean;
  sender_id: string;
  suggestion_id: string;
};

export async function getNotifications(
  currentUserId: string
): Promise<NotificationData[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select(
      `
      id,
      created_at,
      is_read,
      user_id,
      sender_id,
      suggestion_id
    `
    )
    .eq('user_id', currentUserId);

  if (error) throw error;

  return (data ?? []).map((notification) => ({
    id: notification.id,
    is_read: notification.is_read,
    sender_id: notification.sender_id,
    suggestion_id: notification.suggestion_id,
  }));
}

export async function readNotifications(
  currentUserId: string,
  notification_id: string | null = null
): Promise<void> {
  const query = supabase.from('notifications').update({ is_read: true });

  const { error } = notification_id
    ? await query.eq('id', notification_id)
    : await query.eq('user_id', currentUserId);

  if (error) throw error;
}

export async function removeNotifications(
  currentUserId: string
): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('is_read', true)
    .eq('user_id', currentUserId);

  if (error) throw error;
}