import { FC } from 'react';
import { clsx } from 'clsx';

import { SkillTagUIProps } from './type';
import styles from './skillTag.module.css';

export const SkillTagUI: FC<SkillTagUIProps> = ({ name, theme }) => (
  <div className={clsx(styles.skillTag, styles[theme])}>{name}</div>
);
