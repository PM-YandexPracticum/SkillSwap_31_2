import  React  from 'react';
import { ButtonUIProps } from './type';
import './index';
import styles from './button.module.css';
import { clsx } from 'clsx';

export const ButtonUI: React.FC<ButtonUIProps> = ({
  onClick,
  type = 'Primary',
  children,
  hmtlType = 'button',
  disabled = false
}) => (
  <button
    type={hmtlType}
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
