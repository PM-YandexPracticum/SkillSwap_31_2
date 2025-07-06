import React from 'react';
import { clsx } from 'clsx';

import styles from './modal-overlay.module.css';

import { ModalOverlayUIProps } from '@ui/modal-overlay/types';

export const ModalOverlayUI: React.FC<ModalOverlayUIProps> = ({
  onClick,
  isSubMenu = false,
}) => (
  <div
    className={clsx(styles.overlay, {
      [styles.subMenuOverlay]: isSubMenu,
    })}
    onClick={onClick}
    role="presentation"
    aria-hidden="true"
  />
);
