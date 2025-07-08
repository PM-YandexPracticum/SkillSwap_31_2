import { memo, useEffect, useState } from 'react';

import styles from './aside.module.scss';

import tagClose from '@assets/icons/tag-close.svg';
import { RadioFilter } from '@ui/radio-filter/radio-filter';
import { CheckboxFilter } from '@ui/checkbox-filter/checkbox-filter';
import { TRadioList } from '@ui/radio-filter/type';
import { ButtonUI } from '@ui/button';
import { mainFilter } from '@lib/constants';
import { useDispatch, useSelector } from '@services/store';
import {
  getAllCategories,
  getFilterSubcategories,
  getFilterCities,
  getAllCities,
  getAllGenders,
} from '@services/selectors';
import { getCategoriesWithSubcategoriesThunk } from '@app/features/categories/categoriesSlice';
import {
  resetFilter,
  setGender,
  setMain,
  toggleSubcategory,
  toggleCity,
} from '@features/filter/filterSlice';

export const Aside = memo(() => {
  const dispatch = useDispatch();
  const allCategories = useSelector(getAllCategories);
  const allCities = useSelector(getAllCities);
  const allGenders = useSelector(getAllGenders);
  const subcategoriesFilter = useSelector(getFilterSubcategories);
  const citiesFilter = useSelector(getFilterCities);
  const [resetKey, setResetKey] = useState(0);

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
      ...allGenders.map((gender) => ({
        text: gender.name,
        value: gender.name,
        id: gender.id,
      })),
    ],
  };

  const handleMainChange = (value: string) => {
    dispatch(setMain(value));
  };

  const handleGenderChange = (value: string) => {
    dispatch(setGender(value));
  };

  const handleSubcategoryChange = (value: string) => {
    dispatch(toggleSubcategory(value));
  };

  const handleCityChange = (value: string) => {
    dispatch(toggleCity(value));
  };

  const handleReset = () => {
    dispatch(resetFilter());
    setResetKey((prev) => prev + 1); // Увеличиваем ключ для принудительного ре-рендера
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.filterBar}>
        <h2 className={styles.title}>Фильтры</h2>
        {/* Здесь нужен счётчик. Нет глобального состояния */}
        <ButtonUI
          type="Tertiary"
          classes={styles.filterReset}
          onClick={handleReset}
        >
          {/* Для сброса тоже нужно глобальное состояние */}
          Сбросить
          <span className={styles.resetIcon}>
            <img src={tagClose} alt="закрыть" width={24} height={24} />
          </span>
        </ButtonUI>
      </div>

      <div className={styles.filters}>
        <RadioFilter
          key={`main-${resetKey}`}
          options={mainFilter}
          onChange={handleMainChange}
        />
        <CheckboxFilter
          key={`skills-${resetKey}`}
          options={allCategories}
          title="Навыки"
          onChange={handleSubcategoryChange}
          list={subcategoriesFilter}
        />
        <RadioFilter
          key={`gender-${resetKey}`}
          options={genderButtons}
          onChange={handleGenderChange}
        />
        <CheckboxFilter
          key={`cities-${resetKey}`}
          options={allCities}
          title="Города"
          onChange={handleCityChange}
          list={citiesFilter}
        />
      </div>
    </aside>
  );
});
