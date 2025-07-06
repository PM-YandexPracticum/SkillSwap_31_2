import { FC, memo } from 'react';
import { clsx } from 'clsx';

import { ModalOverlayUI } from '../modal-overlay';

import { TModalUIProps } from './type';
import styles from './modal.module.css';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ onClose, children, isSubMenu }) => (
    <>
      <div
        className={clsx(styles.container, {
          [styles.submenu]: isSubMenu,
        })}
      >
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI isSubMenu={isSubMenu} onClick={onClose} />
    </>
  )
);
