import { TSkill } from '@app/entities/skills';
import { TUser, TUserWithSkills } from '@app/entities/user';

export type MiniProfileProps = {
  user: TUser;
  skill: TSkill;
  userWithSkills: TUserWithSkills[];
};
