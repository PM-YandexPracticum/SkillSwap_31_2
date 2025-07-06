import React, { memo } from 'react';

import { CategoryListItemProps } from './types';

import { useSelector } from '@services/store.ts';
import { getSubCategories } from '@services/selectors.tsx';
import { CategoryListItemUI } from '@ui/category-list-item';
import { getCategoryThemeIcon } from '@lib/helpers.ts';

export const CategoryListItem: React.FC<CategoryListItemProps> = memo(
  ({ category }) => {
    const subcategories = useSelector((state) =>
      getSubCategories(state, category.id)
    );
    const iconUrl = getCategoryThemeIcon(category.theme || 'themeDefault');
    return (
      <CategoryListItemUI
        category={category}
        subcategories={subcategories}
        icon={iconUrl}
      />
    );
  }
);
