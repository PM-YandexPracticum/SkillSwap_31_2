import React, { memo } from 'react';

import styles from './auth-buttons.module.css';
import { AuthButtonsUIProps } from './types';

import { ButtonUI } from '@ui/button';

export const AuthButtonsUI: React.FC<AuthButtonsUIProps> = memo(
  ({ onLoginClick, onRegisterClick }) => {
    return (
      <div className={styles.authButtons}>
        <ButtonUI
          onClick={onLoginClick}
          type="Secondary"
          classes={`${styles.login}`}
        >
          Войти
        </ButtonUI>
        <ButtonUI
          onClick={onRegisterClick}
          type="Primary"
          classes={`${styles.register}`}
        >
          Зарегистрироваться
        </ButtonUI>
      </div>
    );
  }
);
