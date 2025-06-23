import React from 'react';
import { clsx } from 'clsx';

import { ButtonUIProps } from './type';
import styles from './button.module.css';

export const ButtonUI: React.FC<ButtonUIProps> = ({
  onClick,
  type = 'Primary',
  children,
  htmlType,
  disabled = false,
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={htmlType}
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      styles.button,
      { [styles.buttonprimary]: type === 'Primary' },
      { [styles.buttonsecondary]: type === 'Secondary' },
      { [styles.buttontertiary]: type === 'Tertiary' }
    )}
  >
    {children}
  </button>
);
