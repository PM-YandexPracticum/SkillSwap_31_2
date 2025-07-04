import { FC } from 'react';

import { TradeButtonProps } from './type';
import styles from './tradeButton.module.css';

export const TradeButtonUI: FC<TradeButtonProps> = ({
  name,
  onClick,
  onClose,
  children = 'предлагает вам обмен',
}) => {
  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={onClick} className={styles.button}>
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
        >
          <path
            stroke="#253017"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6.09 14.999a6.9 6.9 0 0 1-.59-2.794C5.5 8.5 8.41 5.499 12 5.499s6.5 3.002 6.5 6.706a6.9009 6.9009 0 0 1-.59 2.794m-5.91-13v1m10 9h-1m-18 0H2m17.07-7.071-.707.707m-12.726.001-.707-.707m9.587 14.377c1.01-.327 1.416-1.252 1.53-2.182.034-.278-.195-.509-.475-.509H8.477a.4826.4826 0 0 0-.4666.3323.4826.4826 0 0 0-.0214.2017c.112.928.394 1.606 1.464 2.156m5.064.001-5.064-.001m5.064.001c-.121 1.945-.683 2.715-2.51 2.693-1.954.036-2.404-.917-2.554-2.694"
          />
        </svg>
        {name} {children}
        <span className={styles.hoverText}>Перейти</span>
      </button>
      <button
        type="button"
        className={styles.buttonClose}
        onClick={onClose}
        aria-label="Закрыть"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="none"
        >
          <path
            fill="#253017"
            d="m10.7438 2.2875-8.4853 8.4853c-.29.2899-.7708.2899-1.0607 0-.2899-.2899-.2899-.7707 0-1.0606l8.4853-8.4853c.29-.29.7707-.29 1.0607 0 .2899.2899.2899.7707 0 1.0606Z"
          />
          <path
            fill="#253017"
            d="M10.7438 10.7728c-.29.2899-.7708.2899-1.0607 0L1.1978 2.2875c-.2899-.2899-.2899-.7707 0-1.0606.29-.29.7708-.29 1.0607 0l8.4853 8.4853c.2899.2899.2899.7707 0 1.0606Z"
          />
        </svg>
      </button>
    </div>
  );
};
