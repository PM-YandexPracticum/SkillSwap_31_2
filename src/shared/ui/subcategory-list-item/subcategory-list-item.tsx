import React from 'react';
import { Link } from 'react-router-dom';

import { SubCategoryListItemUIProps } from './types';
import styles from './subcategory-list-item.module.css';

export const SubCategoryListItemUI: React.FC<SubCategoryListItemUIProps> = ({
  subcategory,
}) => (
  <li className={styles.listItem}>
    <Link to={subcategory.id.toString()}>{subcategory.name}</Link>
  </li>
);
