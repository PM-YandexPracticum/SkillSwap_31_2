import { memo, useEffect } from 'react';

import tagClose from '../../../assets/icons/tag-close.svg';
import { RadioFilter } from '../radio-filter/radio-filter';
import { CheckboxFilter } from '../checkbox-filter/checkbox-filter';
import { TRadioList } from '../radio-filter/type';

import styles from './aside.module.scss';

import { ButtonUI } from '@ui/button';
import { mainFilter } from '@app/shared/lib/constants';
import { RootState, useDispatch, useSelector } from '@app/services/store';
import { getAllCategories } from '@app/services/selectors';
import { getCategoriesWithSubcategoriesThunk } from '@app/features/cotegories/categoriesSlice';
import { TCheckboxOptions } from '../checkbox-filter/types';
import { resetFilter, setGender, setMain, toggleCategory, toggleCity } from '@app/features/filter/filterSlice';

export const Aside = memo(() => {
  const dispatch = useDispatch();
  const skillsList = useSelector(getAllCategories);
  const skillsFilter = useSelector((state: RootState) => state.filter.skills);
  const citiesFilter = useSelector((state: RootState) => state.filter.cities);

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

  const handleMainChange = (value: string) => {
    dispatch(setMain(value));
  }

  const handleGenderChange = (value: string) => {
    dispatch(setGender(value));
  }

  const handleCategoryChange = (value: string) => {
    dispatch(toggleCategory(value));
  }

  const handleCityChange = (value: string) => {
    dispatch(toggleCity(value));
  }

  const handleReset = () => {
    dispatch(resetFilter());
  }

  return (
    <aside className={styles.aside}>
      <div className={styles.filterBar}>
        <h2 className={styles.title}>Фильтры</h2>
        {/* Здесь нужен счётчик. Нет глобального состояния */}
        <ButtonUI type="Tertiary" classes={styles.filterReset} onClick={handleReset}>
          {/* Для сброса тоже нужно глобальное состояние */}
          Сбросить
          <span className={styles.resetIcon}>
            <img src={tagClose} alt="закрыть" width={24} height={24} />
          </span>
        </ButtonUI>
      </div>

      <div className={styles.filters}>
        <RadioFilter options={mainFilter} onChange={handleMainChange} />
        <CheckboxFilter options={skillsList} title="Навыки" onChange={handleCategoryChange} list={skillsFilter} />
        <RadioFilter options={genderButtons} onChange={handleGenderChange}/>
        <CheckboxFilter options={CityList} title="Города" onChange={handleCityChange} list={citiesFilter} />
      </div>
    </aside>
  );
});
