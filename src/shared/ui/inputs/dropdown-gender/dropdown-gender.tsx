import { memo, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

import styles from '../inputs.module.scss';
import chevronDown from '../../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../../assets/icons/chevron-up.svg';

import { TDropdownGender } from './type';

export const DropdownGender: React.FC<TDropdownGender> = memo(
  ({ lable, isValid, errorText }) => {
    const genders = ['Мужской', 'Женский'];

    const [selectedOption, setSelectedOption] = useState<string>('Не указан');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (option: string) => {
      setSelectedOption(option);
      setIsOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
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
        <label className={styles.label} htmlFor={`${lable}Dropdown`}>
          {lable}
          <div className={styles.dropdown}>
            <input
              type="text"
              value={selectedOption}
              readOnly
              className={styles.dropdownInput}
              onClick={() => setIsOpen((prev) => !prev)}
              id={`${lable}Dropdown`}
            />
            <img
              src={chevronDown}
              alt="кнопка раскрытия списка полов"
              className={styles.dropdownIcon}
            />
          </div>
        </label>
        {isOpen && (
          <div className={styles.dropdownMenu} ref={dropdownRef}>
            <label htmlFor="genderInput">
              <input
                type="text"
                value={selectedOption}
                readOnly
                className={styles.dropdownInput}
                onClick={() => setIsOpen((prev) => !prev)}
                id="genderInput"
              />
              <img
                src={chevronUp}
                alt="кнопка раскрытия списка полов"
                className={styles.visibleIcon}
              />
            </label>

            {genders.map((option) => (
              <input
                key={uuidv4()}
                type="text"
                value={option}
                readOnly
                className={styles.dropdownInput}
                onClick={() => handleOptionClick(option)}
                id={`${option}Gender`}
              />
            ))}
          </div>
        )}
        <small className={clsx([styles.small, !isValid && styles.errorText])}>
          {!isValid && errorText}
        </small>
      </div>
    );
  }
);
