import React from 'react';

import styles from './register.module.css';
import { RegisterUIProps } from './types';

import { StepBarUI } from '@ui/step-bar';
import { FirstStepForm } from '@features/auth/widgets/first-step-form';

export const RegisterUI: React.FC<RegisterUIProps> = ({
  title,
  step,
  stepTotal,
}) => {
  return (
    <div className={styles.registerWrapper}>
      <div className={styles.title}>
        <h2>{title}</h2>
        <StepBarUI step={step} count={stepTotal} />
      </div>
      <div className={styles.content}>
        <FirstStepForm />
      </div>
    </div>
  );
};
