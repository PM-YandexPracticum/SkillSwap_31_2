import React, { SyntheticEvent } from 'react';

import { TCity } from '@ui/inputs/dropdown-city/type';
import { TSkillOption } from '@ui/inputs/dropdown-skill/type';

export type ThirdStepFormUIProps = {
  onSubmit: (e: SyntheticEvent) => void;
  onBack: (e: SyntheticEvent) => void;
  isFormValid: boolean;
  skillName: string;
  setSkillName: (name: string) => void;
  catOptions: TSkillOption[];
  cat: string;
  onCatChange: (cat: string[]) => void;
  subcatOptions: TSkillOption[];
  subcat: string;
  onSubcatChange: (subcat: string[]) => void;
  description: string;
  setDescription: (description: string) => void;
  images: string[];
  setImages: (images: string[]) => void;
};
