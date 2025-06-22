import { FC } from 'react';
import { SkillTagUIProps } from './type';
import './index';
import styles from './skillTag.module.css';

export const SkillTagUI: FC<SkillTagUIProps> = ({ text, color }) => (
  <div className={styles.skillTag} style={{ backgroundColor: color }}>
    {text}
  </div>
);
