import { ThemeValue } from '@lib/constants';

export type TCategoryItem = {
  id: string;
  name: string;
};

export type TCategory = TCategoryItem & {
  theme?: string;
};

export type TCategoryWithSubcategories = TCategory & {
  subcategories?: TSubcategory[];
};

export type TSubcategory = TCategoryItem & {
  category_id: string;
};

export type TSubcategoryWithCategoryName = TCategoryItem & {
  theme: ThemeValue | 'themeDefault';
};
