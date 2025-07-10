import React from 'react';

import styles from './register.module.css';
import { RegisterUIProps } from './types';

import { StepBarUI } from '@ui/step-bar';
import {
  FirstStepForm,
  SecondStepForm,
  StepInfo,
} from '@features/auth/widgets';
import { ThirdStepForm } from '@features/auth/widgets/third-step-form';

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
        {step === 1 && <FirstStepForm />}
        {step === 2 && <SecondStepForm />}
        {step === 3 && <ThirdStepForm />}
        <StepInfo step={step} />
      </div>
    </div>
  );
};
