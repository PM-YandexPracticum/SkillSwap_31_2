import { FC } from 'react';
import arrow from '../../../assets/icons/chevron-up.svg';
import styles from './page-button.module.css';
import { TPageButtonProps } from './type';
import clsx from 'clsx';

export const PageButton: FC<TPageButtonProps> = ({direction, onClick, disabled, extraClass}) => {
    const arrowClass = direction === 'right' ? styles.arrowRight : styles.arrowLeft;
    return (
        <button className={clsx(styles.pageButton, disabled && styles.disabled, extraClass)} onClick={onClick}>
            <img src={arrow} alt="arrow" className={arrowClass} />
        </button>
    )
}