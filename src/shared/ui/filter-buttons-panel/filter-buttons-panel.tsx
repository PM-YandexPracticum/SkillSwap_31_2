import { FC } from 'react';

import styles from './filter-buttons-panel.module.scss';

import tagClose from '@assets/icons/tag-close.svg';

export const FilterButtonsPanelUI: FC = () => {
  return (
    <div className={styles.filterTags}>
      <button type="button" className={styles.filterTagBtn}>
        <span className={styles.tagCloseIcon}>
          <img src={tagClose} alt="закрыть" width={24} height={24} />
        </span>
      </button>
    </div>
  );
};
