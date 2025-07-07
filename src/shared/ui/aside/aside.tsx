import { memo, useEffect } from 'react';

import tagClose from '../../../assets/icons/tag-close.svg';
import { RadioFilter } from '../radio-filter/radio-filter';
import { CheckboxFilter } from '../checkbox-filter/checkbox-filter';
import { TRadioList } from '../radio-filter/type';

import styles from './aside.module.scss';

import { ButtonUI } from '@ui/button';
import { mainFilter } from '@app/shared/lib/constants';
import { useDispatch, useSelector } from '@app/services/store';
import { getCategories } from '@app/services/selectors';
import { getCategoriesWithSubcategoriesThunk } from '@app/features/categories/categoriesSlice';
import { TCheckboxOptions } from '../checkbox-filter/types';

export const Aside = memo(() => {
  const dispatch = useDispatch();
  const skillsList = useSelector(getCategories);

  useEffect(() => {
    dispatch(getCategoriesWithSubcategoriesThunk());
  }, [dispatch]);

  const genderButtons: TRadioList = {
    title: 'Пол автора',
    name: 'gender',
    options: [
      {
        text: 'Не имеет знаечения',
        value: 'not_specified',
        id: 'not_specified',
        defaultChecked: true,
      },
      { text: 'Мужской', value: 'male', id: 'male' },
      { text: 'Женский', value: 'female', id: 'female' },
    ],
  };

  const CityList: TCheckboxOptions[] = [
    { id: '1', name: 'Москва' },
    { id: '2', name: 'Санкт-Петербург' },
    { id: '3', name: 'Новосибирск' },
    { id: '4', name: 'Екатеринбург' },
    { id: '5', name: 'Казань' },
    { id: '6', name: 'Омск' },
  ];

  return (
    <aside className={styles.aside}>
      <div className={styles.filterBar}>
        <h2 className={styles.title}>Фильтры</h2>
        {/* Здесь нужен счётчик. Нет глобального состояния */}
        <ButtonUI type="Tertiary" classes={styles.filterReset}>
          {/* Для сброса тоже нужно глобальное состояние */}
          Сбросить
          <span className={styles.resetIcon}>
            <img src={tagClose} alt="закрыть" width={24} height={24} />
          </span>
        </ButtonUI>
      </div>

      <div className={styles.filters}>
        <RadioFilter options={mainFilter} />
        <CheckboxFilter options={skillsList} title="Навыки" />
        <RadioFilter options={genderButtons} />
        <CheckboxFilter options={CityList} title="Города" />
      </div>
    </aside>
  );
});
