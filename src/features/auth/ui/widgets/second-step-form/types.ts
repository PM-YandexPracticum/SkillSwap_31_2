import { SyntheticEvent } from 'react';

import { TCity } from '@ui/inputs/dropdown-city/type';
import { TSkillOption } from '@ui/inputs/dropdown-skill/type';

export type SecondStepFormUIProps = {
  setAvatar: (value: string) => void;
  avatar: string;
  isNameValid: boolean;
  name: string;
  setName: (name: string) => void;
  date: string;
  onDateChange: (date: string) => void;
  isDateValid: boolean;
  gender: string;
  setGender: (gender: string) => void;
  isGenderValid: boolean;
  cities: TCity[];
  city: string;
  setCity: (city: string) => void;
  isCityValid: boolean;
  catOptions: TSkillOption[];
  cats: string[];
  onCatChange: (wishes: string[]) => void;
  isCatValid: boolean;
  wishesOptions: TSkillOption[];
  wishes: string[];
  onWishChange: (wishes: string[]) => void;
  isWishValid: boolean;
  onSubmit: (e: SyntheticEvent) => void;
  onBack: (e: SyntheticEvent) => void;
  isFormValid: boolean;
};
