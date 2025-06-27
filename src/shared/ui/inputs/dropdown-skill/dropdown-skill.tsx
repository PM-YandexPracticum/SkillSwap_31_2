import { memo, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from '../inputs.module.scss';
import chevronDown from '../../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../../assets/icons/chevron-up.svg';

import { TSkill, TSkillInterface } from './type';

export const DropdownSkill: React.FC<TSkillInterface> = memo(
  ({ options, isValid, lable, errorText }) => {
    const [selectedSkill, setSelectedSkill] = useState<TSkill[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const placeholder = 'Выберите категорию';

    // Получаем текст для отображения
    const getDisplayText = () => {
      if (selectedSkill.length === 0) {
        return placeholder;
      }
      return `Выбрано: ${selectedSkill.length}`;
    };

    // Переключение состояния опции (выбрана/не выбрана)
    const handleOptionToggle = (option: TSkill) => {
      setSelectedSkill((prev) => {
        const isAlreadySelected = prev.some((item) => item.id === option.id);
        if (isAlreadySelected) {
          return prev.filter((item) => item.id !== option.id);
        }
        return [...prev, option];
      });
    };

    // Проверка, выбрана ли опция
    const isOptionSelected = (option: TSkill) => {
      return selectedSkill.some((item) => item.id === option.id);
    };

    // Переключение открытия/закрытия дропдауна
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
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

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen]);

    return (
      <div className={styles.container} ref={dropdownRef}>
        <label className={styles.label} htmlFor={`${lable}Dropdown`}>
          {lable}
          <div className={styles.dropdown}>
            <input
              type="text"
              value={getDisplayText()}
              readOnly
              id={`${lable}Dropdown`}
              className={styles.dropdownInput}
              onClick={toggleDropdown}
            />
            <img src={chevronDown} alt="" className={styles.dropdownIcon} />
          </div>
        </label>
        {isOpen && (
          <div className={styles.dropdownMenu}>
            <label htmlFor="skillInput">
              <input
                type="text"
                value={getDisplayText()}
                readOnly
                className={styles.dropdownInput}
                onClick={toggleDropdown}
                id="skillInput"
              />
              <img
                src={chevronUp}
                alt="кнопка раскрытия списка"
                className={styles.visibleIcon}
              />
            </label>
            {options.map((option) => (
              <label
                key={option.id}
                className={clsx([styles.skill, styles.item])}
                htmlFor={`${option.id}`}
              >
                <input
                  type="checkbox"
                  checked={isOptionSelected(option)}
                  onChange={() => handleOptionToggle(option)}
                  className={styles.checkbox}
                  id={`${option.id}`}
                />
                <span className={styles.checkmark} />
                <span>{option.name}</span>
              </label>
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
