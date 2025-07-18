import { memo, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from '../inputs.module.scss';

import { TSkillInterface, TSkillOption } from './type';

import chevronDown from '@assets/icons/chevron-down.svg';
import chevronUp from '@assets/icons/chevron-up.svg';

export const DropdownSkill: React.FC<TSkillInterface> = memo(
  ({ options, isValid, label, errorText, onChange, placeholder, values }) => {
    const preValues = values.length
      ? values.map((item) => {
          const option = options.find((op) => op.id === item);
          return option || null;
        })
      : [];
    const [selectedSkill, setSelectedSkill] = useState<TSkillOption[]>(
      preValues.length ? preValues.filter((item) => item !== null) : []
    );
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Получаем текст для отображения
    const getDisplayText = () => {
      if (selectedSkill.length === 0) {
        return placeholder;
      }
      return `Выбрано: ${selectedSkill.length}`;
    };

    // Переключение состояния опции (выбрана/не выбрана)
    const handleOptionToggle = (option: TSkillOption) => {
      setSelectedSkill((prev) => {
        const isAlreadySelected = prev.some((item) => item.id === option.id);
        if (isAlreadySelected) {
          return prev.filter((item) => item.id !== option.id);
        }
        return [...prev, option];
      });
    };

    useEffect(() => {
      if (onChange) {
        onChange(selectedSkill.map((item) => item.id));
      }
    }, [onChange, selectedSkill]);

    // Проверка, выбрана ли опция
    const isOptionSelected = (option: TSkillOption) => {
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
        <label className={styles.label} htmlFor={`${label}Dropdown`}>
          {label}
          <div className={styles.dropdown}>
            <input
              type="text"
              value={getDisplayText()}
              readOnly
              id={`${label}Dropdown`}
              className={styles.dropdownInput}
              onClick={toggleDropdown}
            />
            <img src={chevronDown} alt="" className={styles.dropdownIcon} />
          </div>
        </label>
        {isOpen && (
          <div className={styles.dropdownMenu}>
            <label htmlFor="skillInput" className={styles.dropdownLabel}>
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
