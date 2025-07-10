import { memo, useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import { v4 as uuidv4 } from 'uuid';

import calendar from '../../../../assets/icons/calendar.svg';

import { TDropdownCalendar, ValuePiece, Value } from './type';
import styles from './dropdown-calendar.module.scss';

import './dropdown-calendar.css';
import { formatDate, formatToDate } from '@lib/helpers.ts';

export const DropdownCalendar: React.FC<TDropdownCalendar> = memo(
  ({ isValid, label, errorText, onChange, date }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<ValuePiece>(
      date.length ? formatToDate(date) : null
    );
    const [currentMonth, setCurrentMonth] = useState<number>(
      new Date().getMonth()
    );
    const [currentYear, setCurrentYear] = useState<number>(
      new Date().getFullYear()
    );
    const [tempSelectedDate, setTempSelectedDate] = useState<ValuePiece>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const placeholder = 'ДД.ММ.ГГГГ';
    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];

    // Генерируем массив годов (от текущего года - 100 до текущего года)
    const getYearOptions = () => {
      const thisYear = new Date().getFullYear();
      const years = [];
      for (let year = thisYear; year >= thisYear - 100; year -= 1) {
        years.push(year);
      }
      return years;
    };

    const handleConfirm = () => {
      if (tempSelectedDate) {
        setSelectedDate(tempSelectedDate);
      }
      setIsOpen(false);
    };

    const handleCancel = () => {
      setTempSelectedDate(selectedDate);
      setIsOpen(false);
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      if (!isOpen && selectedDate) {
        setCurrentMonth(selectedDate.getMonth());
        setCurrentYear(selectedDate.getFullYear());
        setTempSelectedDate(selectedDate);
      } else if (!isOpen) {
        setTempSelectedDate(null);
      }
    };

    const handleDateChange = (value: Value) => {
      // Обработка выбранных дат, например, устанавливаем первую дату из диапазона
      setTempSelectedDate(value as ValuePiece);
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

    useEffect(() => {
      if (onChange) {
        onChange(formatDate(selectedDate));
      }
    }, [onChange, selectedDate]);

    return (
      <div className={styles.calendarDropdown} ref={dropdownRef}>
        <label className={styles.label} htmlFor={`${label}Dropdown`}>
          {label}
          <div
            className={`${styles.inputContainer} ${!isValid ? 'error' : ''}`}
          >
            <input
              type="text"
              value={formatDate(selectedDate)}
              placeholder={placeholder}
              readOnly
              className={styles.dateInput}
              onClick={toggleDropdown}
              id={`${label}Dropdown`}
            />
            <img src={calendar} alt="" className={styles.calendarIcon} />
          </div>
        </label>

        {isOpen && (
          <div className={styles.calendarPopup}>
            <div className={styles.calendarHeader}>
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value, 10))}
                className={styles.monthSelect}
              >
                {months.map((month, index) => (
                  <option key={uuidv4()} value={index}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(parseInt(e.target.value, 10))}
                className={styles.yearSelect}
              >
                {getYearOptions().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <Calendar
              onChange={handleDateChange}
              value={tempSelectedDate}
              activeStartDate={new Date(currentYear, currentMonth)}
              locale="ru-RU"
              next2Label={null}
              prev2Label={null}
              nextLabel={null}
              prevLabel={null}
              showNeighboringMonth={false}
              formatShortWeekday={(locale, dateObj) => {
                const weekDays = {
                  'ru-RU': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], // Для русской локали
                  // Можно добавить другие локали по аналогии
                };
                if (locale === 'ru-RU') {
                  return weekDays[locale][dateObj.getDay()];
                }
                return weekDays['ru-RU'][dateObj.getDay()]; // По умолчанию - русская локаль
              }}
            />

            <div className={styles.calendarActions}>
              <button
                className={styles.cancelBtn}
                onClick={handleCancel}
                type="button"
              >
                Отменить
              </button>
              <button
                className={styles.confirmBtn}
                onClick={handleConfirm}
                type="button"
              >
                Выбрать
              </button>
            </div>
          </div>
        )}

        <small className={styles.errorText}>{!isValid && errorText}</small>
      </div>
    );
  }
);
