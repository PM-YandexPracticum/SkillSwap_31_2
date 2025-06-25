import React, { memo } from 'react';
import clsx from 'clsx';

import styles from '../inputs.module.scss';

import { TInputInterface } from './type';

export const Input: React.FC<TInputInterface> = memo(
  ({ lable, isValid, placeholder, onChange, errorText }) => {
    return (
      <div className={styles.container}>
        <label className={styles.lable} htmlFor={`${lable}Input`}>
          {lable}
        </label>
        <input
          id={`${lable}Input`}
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
