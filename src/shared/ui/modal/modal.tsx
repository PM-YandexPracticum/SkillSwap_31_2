import { FC, memo } from 'react';

import { ButtonUI } from '../button';
import { ModalOverlayUI } from '../modal-overlay';

import { TModalUIProps } from './type';
import styles from './modal.module.css';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, isHeader = false, children }) => (
    <>
      <div className={styles.container}>
        {isHeader && (
          <div className={styles.header}>
            <h3 className={`${styles.title}`}>{title}</h3>
            <button className={styles.button} type="button">
              <ButtonUI type="Tertiary" onClick={onClose} htmlType="button">
                Закрыть
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <path
                    fill="#253017"
                    d="m16.7438 8.2875-8.4853 8.4853c-.29.2899-.7708.2899-1.0607 0-.2899-.2899-.2899-.7707 0-1.0606l8.4853-8.4853c.2899-.29.7707-.29 1.0607 0 .2899.2899.2899.7707 0 1.0606Z"
                  />
                  <path
                    fill="#253017"
                    d="M16.7438 16.7728c-.29.2899-.7708.2899-1.0607 0L7.1978 8.2875c-.2899-.2899-.2899-.7707 0-1.0606.29-.29.7708-.29 1.0607 0l8.4853 8.4853c.2899.2899.2899.7707 0 1.0606Z"
                  />
                </svg>
              </ButtonUI>
            </button>
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
