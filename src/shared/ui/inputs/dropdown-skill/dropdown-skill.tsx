import { memo, useState, useRef, useEffect } from "react";
import { TSkill, TSkillInterface } from "./type";
import { v4 as uuidv4 } from 'uuid';
import clsx from "clsx";

import styles from '../inputs.module.scss';

import chevronDown from '../../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../../assets/icons/chevron-up.svg';

export const DropdownSkill: React.FC<TSkillInterface> = memo(
    ({ options, isValid, lable, errorText }) => {
        const [selectedSkill, setSelectedSkill] = useState<TSkill[]>([]);
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement>(null);

        const placeholder = 'Выберите категорию';
        const iconSource = isOpen ? chevronUp : chevronDown;

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
                const isAlreadySelected = prev.some(item => item.id === option.id);
                if (isAlreadySelected) {
                    return prev.filter(item => item.id !== option.id);
                } else {
                    return [...prev, option];
                }
            });
        };

        // Проверка, выбрана ли опция
        const isOptionSelected = (option: TSkill) => {
            return selectedSkill.some(item => item.id === option.id);
        };

        // Переключение открытия/закрытия дропдауна
        const toggleDropdown = () => {
            setIsOpen(!isOpen);
        };

        useEffect(() => {
            const handleClickOutside = (event: any) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };

            const handleEscape = (event: any) => {
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
                <label className={styles.label} htmlFor={`${lable}Dropdown`}>{lable}</label>
                <div className={styles.dropdown} onClick={toggleDropdown} id={`${lable}Dropdown`} >
                    <p className={styles.itemSelected}>{getDisplayText()}</p>
                    <img src={chevronDown} alt="" className={styles.dropdownIcon} />
                </div>
                {isOpen && (
                    <div className={styles.dropdownMenu} >
                        <p className={styles.itemSelected} onClick={toggleDropdown}>{getDisplayText()}</p>
                        {options.map((option) => (
                            <label key={option.id} className={clsx([styles.skill, styles.item])}>
                                <input
                                    type="checkbox"
                                    checked={isOptionSelected(option)}
                                    onChange={() => handleOptionToggle(option)}
                                    className={styles.checkbox}
                                    
                                />
                                <span className={styles.checkmark}></span>
                                <span>{option.name}</span>
                            </label>
                        ))}
                        <button className={clsx([styles.visibleIcon, styles.dropdownCross])} type="button"><img src={chevronUp} alt="кнопка раскрытия списка" /></button>
                    </div>
                )}
                <small className={clsx([styles.small, !isValid && styles.errorText])}>{!isValid && errorText}</small>
            </div>
        );
    }
)