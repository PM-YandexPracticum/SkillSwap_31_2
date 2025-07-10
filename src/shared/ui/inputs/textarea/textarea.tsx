import React, { memo } from 'react';
import clsx from 'clsx';

import styles from '../inputs.module.scss';

import { TTextareaInterface } from './type';

export const Textarea: React.FC<TTextareaInterface> = memo(
  ({
    label,
    isValid = true,
    placeholder,
    onChange,
    errorText,
    helpText,
    value,
  }) => {
    return (
      <div className={styles.container}>
        <label className={styles.lable} htmlFor={`${label}Input`}>
          {label}
        </label>
        <textarea
          id={`${label}Input`}
          rows={4}
          className={clsx([styles.input, !isValid && styles.errorBorder])}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <small className={clsx([styles.small, !isValid && styles.errorText])}>
          {(!isValid && errorText) || helpText}
        </small>
      </div>
    );
  }
);
