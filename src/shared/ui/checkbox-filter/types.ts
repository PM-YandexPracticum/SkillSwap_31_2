import { CategoryData, CategoryWithSubcategories } from "@app/api/api";

export interface TCheckboxFilter {
  options: CategoryWithSubcategories[];
  title: string;
}

export type TCheckboxOptions = {
  id: string;
  name: string;
};
