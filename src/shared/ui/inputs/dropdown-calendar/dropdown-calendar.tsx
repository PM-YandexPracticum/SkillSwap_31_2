import { memo, useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';

import calendar from '../../../../assets/icons/calendar.svg';

import { TDropdownCalendar, ValuePiece, Value } from './type';
import styles from './dropdown-calendar.module.scss';

export const DropdownCalendar: React.FC<TDropdownCalendar> = memo(
    ({ isValid, lable, errorText }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedDate, setSelectedDate] = useState<ValuePiece>(null);
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

        // Форматирование даты в DD.MM.YYYY
        const formatDate = (date: Date | null) => {
            if (!date) return '';
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        };

        // Генерируем массив годов (от текущего года - 100 до текущего года)
        const getYearOptions = () => {
            const thisYear = new Date().getFullYear();
            const years = [];
            for (let year = thisYear; year >= thisYear - 100; year = year - 1) {
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

        return (
            <div className={styles.calendarDropdown} ref={dropdownRef}>
                <label className={styles.label}>{lable}</label>

                <div
                    className={`${styles.inputContainer} ${!isValid ? 'error' : ''}`}
                    onClick={toggleDropdown}
                >
                    <input
                        type="text"
                        value={formatDate(selectedDate)}
                        placeholder={placeholder}
                        readOnly
                        className={styles.dateInput}
                    />
                    <img src={calendar} alt="" className={styles.calendarIcon} />
                </div>

                {isOpen && (
                    <div className={styles.calendarPopup}>
                        <div className={styles.calendarHeader}>
                            <select
                                value={currentMonth}
                                onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                                className={styles.monthSelect}
                            >
                                {months.map((month, index) => (
                                    <option key={index} value={index}>
                                        {month}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={currentYear}
                                onChange={(e) => setCurrentYear(parseInt(e.target.value))}
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
                            formatShortWeekday={(locale, date) => {
                                const weekDays = {
                                    'ru-RU': ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], // Для русской локали
                                    // Можно добавить другие локали по аналогии
                                };
                                if (locale === 'ru-RU') {
                                    return weekDays[locale][date.getDay()];
                                }
                                return weekDays['ru-RU'][date.getDay()]; // По умолчанию - русская локаль
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

                {!isValid && errorText && (
                    <small className={styles.errorText}>{errorText}</small>
                )}
            </div>
        );
    }
);
