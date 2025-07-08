import { TCategoryWithSubcategories } from '@entities/Categories/types';

export interface TCheckboxFilter {
  options: TCategoryWithSubcategories[];
  title: string;
  onChange: (value: string) => void;
  list: string[];
}

export type TCheckboxOptions = {
  id: string;
  name: string;
};
