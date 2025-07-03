import React, { memo, useState } from 'react';
import clsx from 'clsx';

import styles from '../inputs.module.scss';
import eyeIcon from '../../../../assets/icons/eye.svg';
import eyeSlashIcon from '../../../../assets/icons/eye-slash.svg';

import { TPasswordInputInterface } from './type';

export const PasswordInput: React.FC<TPasswordInputInterface> = memo(
  ({ label, isValid, placeholder, onChange, errorText }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const iconSource = showPassword ? eyeIcon : eyeSlashIcon;

    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={styles.container}>
        <label className={styles.lable} htmlFor={`${label}Input`}>
          {label}
        </label>
        <input
          id={`${label}Input`}
          type={showPassword ? 'text' : 'password'}
          className={clsx([styles.input, !isValid && styles.errorBorder])}
          placeholder={placeholder}
          onChange={onChange}
        />
        <button
          className={clsx([styles.visibleIcon, styles.eyeIcon])}
          type="button"
          onClick={toggleShowPassword}
        >
          <img src={iconSource} alt="кнопка показа пароля" />
        </button>
        <small className={clsx([styles.small, !isValid && styles.errorText])}>
          {!isValid && errorText}
        </small>
      </div>
    );
  }
);
