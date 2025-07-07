import { TCategory, TSubcategory } from '@entities/Categories/types';

export type CategoryListItemUIProps = {
  category: TCategory;
  icon: string;
  subcategories: TSubcategory[];
  theme: string;
};
