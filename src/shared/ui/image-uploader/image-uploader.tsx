import React, { useRef } from 'react';

import { ImageUploaderProps } from './types';
import styles from './image-uploader.module.css';

import icon from '@assets/icons/gallery.svg';

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label = 'Выбрать изображения',
  placeholder,
  values = [],
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.container}>
      <a
        className={styles.uploadButton}
        href="##"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <div className={styles.description}>
          {values.length === 0 && placeholder && (
            <p className={styles.placeholder}>{placeholder}</p>
          )}
          {values.length > 0 &&
            values.map((src) => (
              <img key={src} className={styles.imageItem} src={src} alt="" />
            ))}
        </div>
        <div className={styles.title}>
          <img src={icon} alt="иконка для елемента загрузки картинок" />
          {label}
        </div>
      </a>
      <input
        type="file"
        multiple
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            onChange(
              Array.from(e.target.files).map((file) => `/images/${file.name}`)
            );
          }
        }}
        className={styles.hidden}
        ref={inputRef}
      />
    </div>
  );
};
