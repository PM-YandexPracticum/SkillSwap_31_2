export interface TSkillInterface {
  options: TSkill[];
  label: string;
  isValid: boolean;
  errorText?: string;
}

export type TSkill = {
  id: number;
  name: string;
};
