import React, { useState, useEffect, useRef } from 'react';
import styles from './widget-categories-modal.module.scss';

interface Category {
  id: number;
  name: string;
  parent_id: number;
  icon?: string;
  color?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const WidgetCategoriesModal: React.FC<Props> = ({ open, onClose, onMouseEnter, onMouseLeave }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    fetch('/db/categories.json')
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setTimeout(() => {
          if (!hovered) onClose();
        }, 100);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose, hovered]);

  if (!open) return null;

  // Группируем категории и подкатегории
  const mainCategories = categories.filter((cat) => cat.parent_id === 0);
  const getSubcategories = (parentId: number) =>
    categories.filter((cat) => cat.parent_id === parentId);

  // Определяем нужные категории по названиям
  const leftNames = [
    'Бизнес и карьера',
    'Иностранные языки',
    'Дом и уют',
  ];
  const rightNames = [
    'Творчество и искусство',
    'Образование и развитие',
    'Здоровье и лайфстайл',
  ];
  const leftCategories = mainCategories.filter(cat => leftNames.includes(cat.name));
  const rightCategories = mainCategories.filter(cat => rightNames.includes(cat.name));

  return (
    <div
      className={styles.widget}
      ref={modalRef}
      style={{ top: 94, left: 36, position: 'absolute' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.widgetColumns}>
        <div className={styles.widgetColumn}>
          {leftCategories.map((mainCat) => (
            <div key={mainCat.id}>
              <div
                className={styles.widgetTitle}
              >
                {mainCat.icon && (
                  <span className={styles.iconBg} style={{ background: mainCat.color || undefined }}>
                    <img src={mainCat.icon} alt={mainCat.name} width={40} height={40} />
                  </span>
                )}
                {mainCat.name}
              </div>
              <ul>
                {getSubcategories(mainCat.id).map((subCat) => (
                  <li key={subCat.id}>
                    <button type="button" className={styles.widgetSubcategoryBtn}>
                      {subCat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.widgetColumn}>
          {rightCategories.map((mainCat) => (
            <div key={mainCat.id}>
              <div
                className={styles.widgetTitle}
              >
                {mainCat.icon && (
                  <span className={styles.iconBg} style={{ background: mainCat.color || undefined }}>
                    <img src={mainCat.icon} alt={mainCat.name} width={40} height={40} />
                  </span>
                )}
                {mainCat.name}
              </div>
              <ul>
                {getSubcategories(mainCat.id).map((subCat) => (
                  <li key={subCat.id}>
                    <button type="button" className={styles.widgetSubcategoryBtn}>
                      {subCat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 