import { FC } from 'react';

import styles from './filter-buttons-panel.module.scss';

import tagClose from '@assets/icons/tag-close.svg';
import { ButtonUI } from '@ui/button';
import { useDispatch, useSelector } from '@services/store';
import { getFilterTags } from '@services/selectors';
import { removeFilterTag } from '@features/filter/filterSlice';

export const FilterButtonsPanelUI: FC = () => {
  const dispatch = useDispatch();
  const filterTags = useSelector(getFilterTags);

  const handleRemoveTag = (tag: string) => {
    dispatch(removeFilterTag(tag));
  };

  return (
    <div className={styles.filterTags}>
      {filterTags.map((tag) => (
        <ButtonUI
          key={tag}
          type="Primary"
          classes={styles.filterTagBtn}
          onClick={() => handleRemoveTag(tag)}
        >
          {tag}
          <span className={styles.tagCloseIcon}>
            <img src={tagClose} alt={`Удалить ${tag}`} width={24} height={24} />
          </span>
        </ButtonUI>
      ))}
    </div>
  );
};
