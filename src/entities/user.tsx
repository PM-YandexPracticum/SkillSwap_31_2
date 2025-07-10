import { TSkill } from '@entities/skills';
import { TSubcategory } from '@entities/Categories/types';

export type TLoginData = {
  email: string;
  password: string;
};

type TuserCommon = TLoginData & {
  gender: string | null;
  city: string | null;
  id: string;
  name: string;
  age: number | null;
  about: string;
  avatar_url: string;
  created_at: string;
  modified_at: string;
  birthday: string | null;
};

export type TUser = TuserCommon & {
  skills_ids: string[];
  wishes_ids: string[];
};

export type TUserWithSkills = TuserCommon & {
  skills: TSkill[];
  wishes: TSubcategory[];
};
