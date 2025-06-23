import { memo, useEffect, useRef, useState } from "react";
import { TDropdownProps } from "./type";
import { v4 as uuidv4 } from 'uuid';
import clsx from "clsx";

import styles from '../inputs.module.scss';

import chevronDown from '../../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../../assets/icons/chevron-up.svg';

export const Dropdown: React.FC<TDropdownProps> = memo(
    ({ options, lable, isValid, errorText }) => {
        const [selectedOption, setSelectedOption] = useState<string>(options[0]);
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const dropdownRef = useRef<HTMLDivElement>(null);

        const iconSource = isOpen ? chevronUp : chevronDown;

        const handleOptionClick = (option: string) => {
            setSelectedOption(option);
            setIsOpen(false);
        }

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            const handleEscapeKey = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    setIsOpen(false);
                }
            };


            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
                document.addEventListener('keydown', handleEscapeKey);
            }


            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                document.removeEventListener('keydown', handleEscapeKey);
            };
        }, [isOpen]);

        return (
            <div className={styles.container}>
                <label className={styles.label} htmlFor={`${lable}Dropdown`}>{lable}</label>
                <div className={styles.dropdown} onClick={() => setIsOpen((prev) => !prev)} id={`${lable}Dropdown`} >
                    <p className={clsx([styles.selectedOption, (selectedOption === options[0]) && styles.disabled])} >{selectedOption}</p>
                </div>
                <button className={styles.visibleIcon} type="button" onClick={() => setIsOpen((prev) => !prev)}><img src={iconSource} alt="кнопка раскрытия списка полов" /></button>
                {isOpen && (
                    <div className={styles.dropdownMenu} ref={dropdownRef}>
                        {options.map((option) => (
                            <p className={styles.item} key={uuidv4()} onClick={() => handleOptionClick(option)}>{option}</p>
                        ))}
                    </div>
                )}
                <small className={clsx([styles.small, !isValid && styles.errorText])}>{!isValid && errorText}</small>
            </div>
        )
    }
);