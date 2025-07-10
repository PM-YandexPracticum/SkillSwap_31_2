import React, { memo } from 'react';

import styles from './step-info.module.css';
import { StepInfoUIProps } from './types';

export const StepInfoUI: React.FC<StepInfoUIProps> = memo(
  ({ image, title, description }) => {
    return (
      <div className={styles.holder}>
        <img className={styles.image} src={image} alt={title} />
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
);
