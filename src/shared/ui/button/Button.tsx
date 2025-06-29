import React from 'react';
import { clsx } from 'clsx';

import { ButtonUIProps } from './type';
import styles from './button.module.css';

export const ButtonUI: React.FC<ButtonUIProps> = ({
  onClick,
  type = 'Primary',
  children,
  htmlType,
  classes,
  disabled = false,
  ...extraProps
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={htmlType}
    onClick={onClick}
    disabled={disabled}
    className={clsx(
      { [styles.button]: type !== 'Custom' },
      { [styles.buttonprimary]: type === 'Primary' },
      { [styles.buttonsecondary]: type === 'Secondary' },
      { [styles.buttontertiary]: type === 'Tertiary' },
      classes
    )}
    {...extraProps}
  >
    {children}
  </button>
);
