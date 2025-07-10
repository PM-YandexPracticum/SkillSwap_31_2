import React, { memo, useRef } from 'react';

import styles from './input-avatar.module.css';
import { TInputAvatarInterface } from './type';

import avatar from '@assets/icons/avatar.svg';
import add from '@assets/icons/add.svg';

export const InputAvatar: React.FC<TInputAvatarInterface> = memo(
  ({ onChange, file }) => {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <div className={styles.container}>
        <a
          className={styles.uploadButton}
          href="##"
          onClick={() => {
            ref.current?.click();
          }}
        >
          <img
            className={styles.avatar}
            src={file || avatar}
            alt="Иконка для кнопки загрузаить аватар"
          />
          <img
            className={styles.add}
            src={add}
            alt="Иконка для кнопки загрузить аватар"
          />
        </a>
        <input
          ref={ref}
          className={styles.hidden}
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={onChange}
        />
      </div>
    );
  }
);
