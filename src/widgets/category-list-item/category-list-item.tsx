import React, { memo, useMemo } from 'react';

import { CategoryListItemProps } from './types';

import { useSelector } from '@services/store';
import { getSubCategories } from '@services/selectors';
import { CategoryListItemUI } from '@ui/category-list-item';
import { getCategoryThemeIcon, getTheme } from '@lib/helpers';

export const CategoryListItem: React.FC<CategoryListItemProps> = memo(
  ({ category }) => {
    const subcategories = useSelector((state) =>
      getSubCategories(state, category.id)
    );

    const { theme, iconUrl } = useMemo(() => {
      const currentTheme = getTheme(category.name);
      return {
        theme: currentTheme,
        iconUrl: getCategoryThemeIcon(currentTheme),
      };
    }, [category.name]);

    return (
      <CategoryListItemUI
        category={category}
        subcategories={subcategories}
        icon={iconUrl}
        theme={theme}
      />
    );
  }
);
