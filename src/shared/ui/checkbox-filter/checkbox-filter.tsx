import React, { memo, useState } from 'react';

import styles from './checkbox-filter.module.scss';
import { TCheckboxFilter } from './types';

import chevronDown from '@assets/icons/chevron-down.svg';
import chevronUp from '@assets/icons/chevron-up.svg';
import { ButtonUI } from '@ui/button';
import { TCategoryWithSubcategories } from '@entities/Categories/types';

export const CheckboxFilter: React.FC<TCheckboxFilter> = memo(
  ({ options, title, onChange, list }) => {
    const selectedList = list;
    const [expandedItems, setExpandedItems] = useState(new Set());
    const [showAll, setShowAll] = useState(false);

    const displayedItems = showAll ? options : options.slice(0, 5);

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

    const handleToggle = (skill: TCategoryWithSubcategories) => {
      const allChildrenNames = skill.subcategories
        ? skill.subcategories.map((child) => child.name)
        : [];

      if (skill.subcategories) {
        // Если это категория с подкатегориями
        // Категория считается выбранной, если все её подкатегории выбраны
        const checkedChildrenNames = allChildrenNames.filter((name) =>
          selectedList.includes(name)
        );
        const isSelected =
          checkedChildrenNames.length === allChildrenNames.length;

        if (isSelected) {
          // Если категория выбрана, удаляем только подкатегории
          allChildrenNames.forEach((name) => {
            if (selectedList.includes(name)) {
              onChange(name); // Удаляем только выбранные подкатегории
            }
          });
        } else {
          // Если категория не выбрана, добавляем только невыбранные подкатегории
          allChildrenNames.forEach((name) => {
            if (!selectedList.includes(name)) {
              onChange(name); // Добавляем только невыбранные подкатегории
            }
          });
        }
      } else {
        // Если это подкатегория, просто переключаем её состояние
        onChange(skill.name);
      }
    };

    const getCheckboxState = (skill: TCategoryWithSubcategories) => {
      if (!skill.subcategories) {
        return selectedList.includes(skill.name) ? 'checked' : 'unchecked';
      }

      const allChildrenNames = skill.subcategories.map((child) => child.name);
      const checkedChildrenNames = allChildrenNames.filter((name) =>
        selectedList.includes(name)
      );

      if (checkedChildrenNames.length === 0) return 'unchecked';
      if (checkedChildrenNames.length === allChildrenNames.length)
        return 'checked';
      return 'indeterminate';
    };
    // Рекурсивная функция для рендеринга навыков
    const renderSkill = (skill: TCategoryWithSubcategories, depth = 0) => {
      const checkboxState = getCheckboxState(skill);
      const isExpanded = expandedItems.has(skill.id);
      const hasChildren = skill.subcategories && skill.subcategories.length > 0;

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
            {skill.name}

            {hasChildren && (
              <ButtonUI
                type="Custom"
                classes={styles.expandeButton}
                onClick={(e) => {
                  e.preventDefault();
                  toggleExpanded(skill.id);
                }}
              >
                <img
                  src={isExpanded ? chevronUp : chevronDown}
                  alt="иконка раскрытия или скрытия списка"
                />
              </ButtonUI>
            )}
          </label>

          {isExpanded && hasChildren && (
            <ul>
              {skill.subcategories !== undefined &&
                skill.subcategories.map((child) =>
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
          {displayedItems.map((skill: TCategoryWithSubcategories) =>
            renderSkill(skill)
          )}
        </ul>
        {!showAll && options.length > 5 && (
          <ButtonUI
            type="Custom"
            classes={styles.showAllButton}
            onClick={() => setShowAll(true)}
          >
            Показать все
            <img src={chevronDown} alt="" />
          </ButtonUI>
        )}
        {showAll && (
          <ButtonUI
            type="Custom"
            classes={styles.showAllButton}
            onClick={() => setShowAll(false)}
          >
            Скрыть все
            <img src={chevronUp} alt="" />
          </ButtonUI>
        )}
      </div>
    );
  }
);
