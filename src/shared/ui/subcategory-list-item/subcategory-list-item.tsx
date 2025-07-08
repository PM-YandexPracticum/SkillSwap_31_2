import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ButtonUI } from '../button';

import { SubCategoryListItemUIProps } from './types';
import styles from './subcategory-list-item.module.css';

import { useDispatch } from '@services/store';
import { resetFilter, toggleSubcategory } from '@features/filter/filterSlice';

export const SubCategoryListItemUI: React.FC<SubCategoryListItemUIProps> = ({
  subcategory,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryChange = () => {
    dispatch(resetFilter());
    dispatch(toggleSubcategory(subcategory.name));
    navigate(-1);
  };

  return (
    <li className={styles.listItem}>
      <ButtonUI type="Tertiary" onClick={handleCategoryChange}>
        {subcategory.name}
      </ButtonUI>
    </li>
  );
};
