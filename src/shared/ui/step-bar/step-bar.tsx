import React from 'react';
import { clsx } from 'clsx';

import styles from './step-bar.module.css';
import { StepBarUIProps } from './types';

export const StepBarUI: React.FC<StepBarUIProps> = ({ step, count }) => (
  <div className={styles.wrapper}>
    {Array(count)
      .fill(null)
      .map((_, index) => (
        <div
          /* eslint-disable-next-line react/no-array-index-key */
          key={index}
          className={clsx(styles.stepItem, {
            [styles.active]: index < step,
          })}
        />
      ))}
  </div>
);
