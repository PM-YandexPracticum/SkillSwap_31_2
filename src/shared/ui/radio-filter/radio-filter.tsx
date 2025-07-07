import React, { memo } from 'react';

import styles from './radio-filter.module.scss';
import { TRadioFilter } from './type';

export const RadioFilter: React.FC<TRadioFilter> = memo(
  ({ options, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };
    return (
      <div className={styles.radioGroup}>
        {options.title && <h3 className={styles.title}>{options.title}</h3>}
        {options.options.map((option) => (
          <label key={option.id} htmlFor={option.id} className={styles.label}>
            <input
              type="radio"
              id={option.id}
              value={option.value}
              name={options.name}
              defaultChecked={option.defaultChecked}
              className={styles.radio}
              onChange={handleChange}
            />
            <span className={styles.checkmark} />
            {option.text}
          </label>
        ))}
      </div>
    );
  }
);
