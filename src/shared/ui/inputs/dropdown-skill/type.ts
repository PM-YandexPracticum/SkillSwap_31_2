export interface TSkillInterface {
  options: TSkill[];
  lable: string;
  isValid: boolean;
  errorText?: string;
}

export type TSkill = {
  id: number;
  name: string;
};
