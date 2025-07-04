import { TSkill } from '@entities/skills';

export type TUser = {
  gender: string | null;
  city: string | null;
  skills_ids: string[];
  wishes_ids: string[];
  id: string;
  name: string;
  age: number | null;
  about: string;
  avatar_url: string;
  email: string;
  password: string;
  created_at: string;
  modified_at: string;
  birthday: string | null;
};

export type TUserWithSkills = {
  gender: string | null;
  city: string | null;
  skills: TSkill[];
  wishes: TSkill[];
  id: string;
  name: string;
  age: number | null;
  about: string;
  avatar_url: string;
  email: string;
  password: string;
  created_at: string;
  modified_at: string;
  birthday: string | null;
};

export type TLoginData = {
  email: string;
  password: string;
};
