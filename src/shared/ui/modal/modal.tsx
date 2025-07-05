import { FC, memo } from 'react';

import { ModalOverlayUI } from '../modal-overlay';

import { TModalUIProps } from './type';
import styles from './modal.module.css';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ onClose, children, isSubMenu }) => (
    <>
      <div className={styles.container}>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI isSubMenu={isSubMenu} onClick={onClose} />
    </>
  )
);
