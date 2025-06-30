import { memo, useState, useRef, useEffect, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

import styles from '../inputs.module.scss';
import chevronDown from '../../../../assets/icons/chevron-down.svg';
import cross from '../../../../assets/icons/cross.svg';

import { TCityInputInterface } from './type';

export const DropdownCity: React.FC<TCityInputInterface> = memo(
  ({ options, isValid, lable, errorText }) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Текущее значение в инпуте - либо выбранный город, либо поисковый запрос
    const displayValue = searchValue || selectedCity;

    // Фильтрация городов
    const filteredCities = options.filter((city) =>
      city.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Обработка изменения текста в инпуте
    const handleInputChange = (e: ChangeEvent) => {
      const { value } = e.target as HTMLInputElement;
      setSearchValue(value);
      setIsOpen(true);

      // Если начали печатать поверх выбранного города, очищаем выбор
      if (selectedCity && value !== selectedCity) {
        setSelectedCity('');
      }
    };

    // Выбор города из списка
    const handleCitySelect = (cityName: string) => {
      setSelectedCity(cityName);
      setSearchValue('');
      setIsOpen(false);
      inputRef.current?.blur(); // Убираем фокус с инпута
    };

    // Очистка всех значений
    const handleClear = () => {
      setSelectedCity('');
      setSearchValue('');
      inputRef.current?.focus(); // Возвращаем фокус на инпут
    };

    useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }

      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchValue('');
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          inputRef.current?.blur();
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
              value={displayValue}
              readOnly
              id={`${lable}Dropdown`}
              className={clsx([styles.dropdownInput, styles.cityInput])}
              onClick={() => setIsOpen(true)}
              placeholder="Не указан"
            />
            <img
              src={chevronDown}
              alt="иконка раскрытия списка городов"
              className={styles.visibleIcon}
            />
          </div>
        </label>
        {isOpen && (
          <div className={styles.dropdownMenu}>
            <label htmlFor="cityInput">
              <input
                type="text"
                id="cityInput"
                ref={inputRef}
                className={clsx([
                  styles.dropdownInput,
                  styles.cityInput,
                  !isValid && styles.errorBorder,
                ])}
                placeholder="Не указан"
                value={displayValue}
                onChange={handleInputChange}
                autoComplete="off"
              />

              <button
                className={clsx([styles.visibleIcon, styles.dropdownCross])}
                type="button"
                onClick={handleClear}
              >
                <img src={cross} alt="кнопка раскрытия списка" />
              </button>
            </label>
            <div className={styles.list}>
              {filteredCities.length > 0 ? (
                filteredCities.map((option) => (
                  <input
                    key={option.id}
                    type="text"
                    value={option.name}
                    readOnly
                    className={styles.item}
                    onClick={() => handleCitySelect(option.name)}
                    id={option.id.toString()}
                  />
                ))
              ) : (
                <p className={styles.item} key={uuidv4()}>
                  Город не найден
                </p>
              )}
            </div>
          </div>
        )}
        <small className={clsx([styles.small, !isValid && styles.errorText])}>
          {!isValid && errorText}
        </small>
      </div>
    );
  }
);
