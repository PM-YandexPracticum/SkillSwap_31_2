export interface TSkillInterface {
  options: TSkillOption[];
  label: string;
  isValid: boolean;
  errorText?: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}

export type TSkillOption = {
  id: string;
  name: string;
};
