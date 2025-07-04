import React, { memo } from 'react';
import clsx from 'clsx';

import styles from '../inputs.module.scss';

import { TInputInterface } from './type';

export const Input: React.FC<TInputInterface> = memo(
  ({ label, isValid, placeholder, onChange, errorText }) => {
    return (
      <div className={styles.container}>
        <label className={styles.lable} htmlFor={`${label}Input`}>
          {label}
        </label>
        <input
          id={`${label}Input`}
          type="text"
          className={clsx([styles.input, !isValid && styles.errorBorder])}
          placeholder={placeholder}
          onChange={onChange}
        />
        <small className={clsx([styles.small, !isValid && styles.errorText])}>
          {!isValid && errorText}
        </small>
      </div>
    );
  }
);
