import { FC } from 'react';

import { AuthHeaderUIProps } from './types';
import styles from './auth-header.module.css';

import { Logotype } from '@app/widgets';
import { ButtonUI } from '@ui/button';
import closeIcon from '@assets/icons/cross.svg';

export const AuthHeaderUI: FC<AuthHeaderUIProps> = ({ onClose }) => {
  return (
    <header className={styles.header}>
      <Logotype />
      <ButtonUI onClick={onClose} type="Tertiary" classes={styles.buttonClose}>
        Закрыть
        <span className={styles.closeIcon}>
          <img src={closeIcon} alt="Вернутся назад" />
        </span>
      </ButtonUI>
    </header>
  );
};
