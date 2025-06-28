import React, { memo, useState } from 'react';

import chevronDown from '../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../assets/icons/chevron-up.svg';

import styles from './checkbox-filter.module.scss';
import { TCheckboxFilter, TCheckboxOptions } from './types';

export const CheckboxFilter: React.FC<TCheckboxFilter> = memo(
  ({ options, title }) => {
    const [checkedItems, setCheckedItems] = useState(new Set());
    const [expandedItems, setExpandedItems] = useState(new Set());
    const [showAll, setShowAll] = useState(false);

    const displayedItems = showAll ? options : options.slice(0, 5);

    // Рекурсивная функция для получения всех дочерних ID
    const getAllChildrenIds = (skill: TCheckboxOptions) => {
      if (!skill.children) return [skill.id];

      const ids: string[] = [];
      skill.children.forEach((child: TCheckboxOptions) => {
        ids.push(...getAllChildrenIds(child));
      });
      return ids;
    };

    // Переключение развернутого состояния
    const toggleExpanded = (id: string) => {
      setExpandedItems((prev) => {
        const newExpanded = new Set(prev);
        if (newExpanded.has(id)) {
          newExpanded.delete(id);
        } else {
          newExpanded.add(id);
        }
        return newExpanded;
      });
    };

    // Обработка клика по чекбоксу категории
    const handleToggle = (skill: TCheckboxOptions) => {
      const newChecked = new Set(checkedItems);

      if (skill.children) {
        // Для родительских категорий
        const allChildrenIds = getAllChildrenIds(skill);
        const allChecked = allChildrenIds.every((id: string) =>
          checkedItems.has(id)
        );

        if (allChecked) {
          // Снимаем выбор со всех дочерних элементов
          allChildrenIds.forEach((id: string) => newChecked.delete(id));
        } else {
          // Выбираем все дочерние элементы
          allChildrenIds.forEach((id: string) => newChecked.add(id));
        }

        // Автоматически разворачиваем при выборе
        if (!expandedItems.has(skill.id)) {
          setExpandedItems((prev) => new Set(prev).add(skill.id));
        }
      }
      // Для удаления или добавления навыка
      if (newChecked.has(skill.id)) {
        newChecked.delete(skill.id);
      } else {
        newChecked.add(skill.id);
      }

      setCheckedItems(newChecked);
    };

    // Проверка состояния чекбокса для категории
    const getCheckboxState = (skill: TCheckboxOptions) => {
      if (!skill.children) {
        return checkedItems.has(skill.id) ? 'checked' : 'unchecked';
      }

      const allChildrenIds = getAllChildrenIds(skill);
      const checkedChildrenIds = allChildrenIds.filter((id: string) =>
        checkedItems.has(id)
      );

      if (checkedChildrenIds.length === 0) return 'unchecked';
      if (checkedChildrenIds.length === allChildrenIds.length) return 'checked';
      return 'indeterminate';
    };

    // Рекурсивная функция для рендеринга навыков
    const renderSkill = (skill: TCheckboxOptions, depth = 0) => {
      const checkboxState = getCheckboxState(skill);
      const isExpanded = expandedItems.has(skill.id);
      const hasChildren = skill.children && skill.children.length > 0;

      const isChecked = checkboxState === 'checked';
      // Определяем состояние "неопределено" для чекбокса
      // Если есть дочерние элементы и не все из них выбраны, то состояние будет
      const isIndeterminate = checkboxState === 'indeterminate';

      return (
        <li
          key={skill.id}
          style={{
            marginBottom: hasChildren && isExpanded ? '8px' : '12px',
          }}
        >
          <label
            className={styles.skillLable}
            style={{ paddingLeft: `${depth * 28}px` }}
            htmlFor={`checkbox-${skill.id}`}
          >
            <input
              type="checkbox"
              id={`checkbox-${skill.id}`}
              checked={isChecked}
              onChange={() => handleToggle(skill)}
              ref={(input) => {
                if (input) {
                  const currentInput = input;
                  currentInput.indeterminate = isIndeterminate;
                }
              }}
              className={styles.checkbox}
            />
            <span className={styles.checkmark} />
            {skill.label}

            {hasChildren && (
              <button
                className={styles.expandeButton}
                onClick={(e) => {
                  e.preventDefault();
                  toggleExpanded(skill.id);
                }}
                type="button"
                tabIndex={-1}
                id={`expand-button-${skill.id}`}
              >
                <img
                  src={isExpanded ? chevronUp : chevronDown}
                  alt="иконка раскрытия или скрытия списка"
                />
              </button>
            )}
          </label>

          {isExpanded && hasChildren && (
            <ul>
              {skill.children !== undefined &&
                skill.children.map((child: TCheckboxOptions) =>
                  renderSkill(child, depth + 1)
                )}
            </ul>
          )}
        </li>
      );
    };

    return (
      <div>
        <h3 className="filterTitle">{title}</h3>

        <ul className={styles.skillsList}>
          {displayedItems.map((skill: TCheckboxOptions) => renderSkill(skill))}
        </ul>
        {!showAll && options.length > 5 && (
          <div className={styles.showAllContainer}>
            <button
              type="button"
              className={styles.showAllButton}
              onClick={() => setShowAll(true)}
            >
              Показать все
            </button>
            <img src={chevronDown} alt="" />
          </div>
        )}
        {showAll && (
          <div className={styles.showAllContainer}>
            <button
              type="button"
              className={styles.showAllButton}
              onClick={() => setShowAll(false)}
            >
              Скрыть все
            </button>
            <img src={chevronUp} alt="" />
          </div>
        )}
      </div>
    );
  }
);
