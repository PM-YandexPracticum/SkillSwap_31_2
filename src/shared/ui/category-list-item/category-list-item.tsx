import React from 'react';
import { clsx } from 'clsx';

import { CategoryListItemUIProps } from './types';
import styles from './category-list-item.module.css';

import { SubCategoryListItemUI } from '@ui/subcategory-list-item';

export const CategoryListItemUI: React.FC<CategoryListItemUIProps> = ({
  category,
  subcategories,
  icon,
  theme,
}) => (
  <div className={styles.categoryWrapper}>
    <span className={clsx(styles.themeIcon, styles[theme || 'themeDefault'])}>
      <img src={icon} alt={category.name} />
    </span>
    <h2 className={styles.categoryTitle}>{category.name}</h2>
    <ul className={styles.listHolder}>
      {subcategories.map((subcategory) => (
        <SubCategoryListItemUI key={subcategory.id} subcategory={subcategory} />
      ))}
    </ul>
  </div>
);
