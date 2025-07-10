import { FC, useState, useEffect } from 'react';

import { LikeButtonUIProps } from './type';
import styles from './like-button.module.css';

export const LikeButtonUI: FC<LikeButtonUIProps> = ({
  isLiked,
  onClick,
  isDisabled,
}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);

  useEffect(() => {
    setIsLikedState(isLiked);
  }, [isLiked]);

  const handleClick = () => {
    const newLikedState = !isLikedState;
    setIsLikedState(newLikedState);
    onClick();
  };

  return (
    <button
      disabled={isDisabled}
      type="button"
      onClick={handleClick}
      className={`${styles.likeButton} ${isLikedState ? styles.liked : ''}`}
      aria-pressed={isLikedState}
      aria-label={isLikedState ? 'Like' : 'Unlike'}
    >
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill={isLikedState ? '#253017' : 'transparent'}
        stroke="#253017"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.heartIcon}
      >
        <path d="M5.95 1C3.21619 1 1 3.1521 1 5.80682C1 10.6136 6.85 14.9835 10 16C13.15 14.9835 19 10.6136 19 5.80682C19 3.1521 16.7838 1 14.05 1C12.3759 1 10.8958 1.80707 10 3.04238C9.10419 1.80707 7.62414 1 5.95 1Z" />
      </svg>
    </button>
  );
};
