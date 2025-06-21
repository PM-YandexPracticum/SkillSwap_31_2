import React, { memo } from 'react';
import clsx from 'clsx';

import styles from './button.module.scss';

import { TButtonProps } from '@ui/button/type';

/** Primary UI component for user interaction */
export const Button: React.FC<TButtonProps> = memo(
  ({ label, mode = 'primary', onClick, ...props }) => {
    let modeClass = styles.buttonPrimary;
    if (mode === 'secondary') {
      modeClass = styles.buttonSecondary;
    } else if (mode === 'tertiary') {
      modeClass = styles.buttonTertiary;
    }
    return (
      <button
        type="button"
        className={clsx([styles.button, modeClass])}
        onClick={onClick}
        {...props}
      >
        {label}
      </button>
    );
  }
);
