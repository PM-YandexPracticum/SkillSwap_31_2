import React, { memo } from 'react';

import styles from './categories-list.module.css';
import { CategoriesListUIProps } from './types';

import { CategoryListItem } from '@widgets/category-list-item/category-list-item';

export const CategoriesListUI: React.FC<CategoriesListUIProps> = memo(
  ({ categories }) => {
    return (
      <div className={styles.containerWrapper}>
        {categories.map((category) => (
          <CategoryListItem category={category} key={category.id} />
        ))}
      </div>
    );
  }
);
