import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

import { verifyPassword } from '../shared/lib/helpers';

const supabaseUrl = process.env.REST_API_URL!;
const supabaseKey = process.env.REST_API_ANON!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function get_users() {
  const { data, error } = await supabase
    .from('users')
    .select(`
      id,
      name,
      age,
      about,
      avatar_url,
      email,
      gender:gender_id(name),
      city:city_id(name),
      skills_ids:user_skills(skill_id),
      wishes_ids:user_wishes(skill_id)
    `);
  
  if (error) throw error;
  
  // Преобразрование связанных полей в нужный формат
  const result = data.map(user => ({
    ...user,
    gender: user.gender?.['name'] ?? null,
    city: user.city?.['name'] ?? null,
    skills_ids: user.skills_ids.map((s: any) => s.skill_id),
    wishes_ids: user.wishes_ids.map((s: any) => s.skill_id)
  }));

  return result;
}

export async function get_user_by_email_password(email: string, password: string) {
  const { data, error } = await supabase
    .from('users')
    .select(`
      id,
      name,
      age,
      about,
      avatar_url,
      email,
      created_at,
      modified_at,
      gender:gender_id(name),
      city:city_id(name),
      skills_ids:user_skills(skill_id),
      wishes_ids:user_wishes(skill_id),
      password
    `)
    .eq('email', email);
  
  if (error) throw error;
  
  
  // Преобразрование связанных полей в нужный формат
  const result = data.map(user => ({
    ...user,
    gender: user.gender?.['name'] ?? null,
    city: user.city?.['name'] ?? null,
    skills_ids: user.skills_ids.map((s: any) => s.skill_id),
    wishes_ids: user.wishes_ids.map((s: any) => s.skill_id)
  }));
  
  const user = result[0];
  if (await verifyPassword(password, user.password)) return user;
  
  // Нужно обдумать формат ошибки при неправильной паре email/password
  return "aceess denied";
}


export async function get_skills() {
  const { data, error } = await supabase
    .from('skills')
    .select(`
      id,
      name,
      description,
      images,
      created_at,
      modified_at,
      category:category_id(name),
      subcategory:subcategory_id(name)
    `)

  if (error) throw error;
  
  // Преобразрование связанных полей в нужный формат
  const result = data.map(skill => ({
    ...skill,
    category: skill.category['name'] ?? null,
    subcategory: skill.subcategory['name'] ?? null
  }));
  return result;
};

export async function get_categories() {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data;
}

export async function get_subcategories() {
  const { data, error } = await supabase.from('subcategories').select('*');
  if (error) throw error;
  return data;
}

export async function get_subcategories_by_category(categoryId: string) {
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId);
  if (error) throw error;
  return data;
}
