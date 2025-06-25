import React from 'react';
import { Link } from 'react-router-dom';

import styles from './logotype.module.css';
import { TLogotypeUiProps } from './types';

export const LogotypeUi: React.FC<TLogotypeUiProps> = ({
  text,
  image,
  link,
}) => (
  <Link to={link || '/'} className={styles.logotype}>
    <img
      className={styles.logotypeImage}
      src={image || '/logo.svg'}
      alt={text || 'logo'}
    />
    {text && <span className={styles.logotypeTitle}>{text}</span>}
  </Link>
);
