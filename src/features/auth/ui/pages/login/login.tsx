import React from 'react';

import styles from './login.module.css';
import { LoginUIProps } from './types';

import { StepInfo } from '@features/auth/widgets';
import { LoginForm } from '@features/auth/widgets/login-form';

export const LoginUI: React.FC<LoginUIProps> = ({ title, step }) => {
  return (
    <div className={styles.registerWrapper}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>
      <div className={styles.content}>
        <LoginForm />
        <StepInfo step={step} />
      </div>
    </div>
  );
};
