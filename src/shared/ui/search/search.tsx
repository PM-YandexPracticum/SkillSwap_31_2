import { FC } from 'react';

import { SearchUIProps } from './type';
import styles from './search.module.css';

export const SearchUI: FC<SearchUIProps> = ({
  value,
  placeholder = 'Искать навык',
  onChange,
  onClear,
}) => {
  return (
    <div className={styles.searchContainer}>
      <span className={styles.searchIcon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
        >
          <path
            fill="#253017"
            d="M9.535 19.0698C4.279 19.0698 0 14.7907 0 9.5349 0 4.2791 4.279 0 9.535 0c5.2557 0 9.5348 4.279 9.5348 9.535 0 5.2557-4.2791 9.5348-9.5349 9.5348Zm0-17.6745c-4.4931 0-8.1396 3.6559-8.1396 8.1396s3.6465 8.1396 8.1395 8.1396 8.1396-3.6559 8.1396-8.1396-3.6466-8.1395-8.1396-8.1395ZM19.3024 20a.69.69 0 0 1-.493-.2046l-1.8605-1.8605c-.2698-.2698-.2698-.7163 0-.9861.2698-.2697.7163-.2697.9861 0l1.8604 1.8605c.2698.2698.2698.7163 0 .9861a.69.69 0 0 1-.493.2046Z"
          />
        </svg>
      </span>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={onClear}
          aria-label="Очистить строку"
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
      )}
    </div>
  );
};
