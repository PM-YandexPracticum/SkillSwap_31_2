import React from 'react';

import styles from './register.module.css';
import { RegisterUIProps } from './types';

export const RegisterUI: React.FC<RegisterUIProps> = ({ title, step }) => {
  return (
    <div className={styles.registerWrapper}>
      <h2 className={styles.title}>
        {title}
        {step}
      </h2>
    </div>
  );
};
