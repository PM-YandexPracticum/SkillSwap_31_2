import { memo } from 'react';

import tagClose from '../../../assets/icons/tag-close.svg';
import { RadioFilter } from '../radio-filter/radio-filter';
import { CheckboxFilter } from '../checkbox-filter/checkbox-filter';
import { TRadioList } from '../radio-filter/type';
import { TCheckboxOptions } from '../checkbox-filter/types';

import styles from './aside.module.scss';

import { ButtonUI } from '@ui/button';

export const Aside = memo(() => {
  const mainFilter: TRadioList = {
    title: '',
    name: 'filter',
    options: [
      { text: 'Всё', value: 'all', id: 'all', defaultChecked: true },
      { text: 'Хочу научиться', value: 'learn', id: 'learn' },
      { text: 'Могу научить', value: 'teach', id: 'teach' },
    ],
  };

  const SkillsList: TCheckboxOptions[] = [
    {
      id: 'business',
      label: 'Бизнес и карьера',
      children: [
        { id: 'business-marketing', label: 'Маркетинг' },
        { id: 'business-sales', label: 'Продажи' },
        { id: 'business-management', label: 'Менеджмент' },
        { id: 'business-finance', label: 'Финансы' },
      ],
    },
    {
      id: 'creative',
      label: 'Творчество и искусство',
      children: [
        { id: 'drawing', label: 'Рисование и иллюстрация' },
        { id: 'photography', label: 'Фотография' },
        { id: 'videoEditing', label: 'Видеомонтаж' },
        { id: 'music', label: 'Музыка и звук' },
        { id: 'acting', label: 'Актёрское мастерство' },
        { id: 'creativeWriting', label: 'Креативное письмо' },
        { id: 'artTherapy', label: 'Арт-терапия' },
        { id: 'decorDIY', label: 'Декор и DIY' },
      ],
    },
    {
      id: 'languages',
      label: 'Иностранные языки',
      children: [
        { id: 'languages-english', label: 'Английский' },
        { id: 'languages-spanish', label: 'Испанский' },
        { id: 'languages-french', label: 'Французский' },
        { id: 'languages-german', label: 'Немецкий' },
      ],
    },
    { id: 'education', label: 'Образование и развитие' },
    { id: 'health', label: 'Здоровье и лайфстайл' },
    { id: 'home', label: 'Дом и уют' },
  ];

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
    { id: '1', label: 'Москва' },
    { id: '2', label: 'Санкт-Петербург' },
    { id: '3', label: 'Новосибирск' },
    { id: '4', label: 'Екатеринбург' },
    { id: '5', label: 'Казань' },
    { id: '6', label: 'Омск' },
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
        <CheckboxFilter options={SkillsList} title="Навыки" />
        <RadioFilter options={genderButtons} />
        <CheckboxFilter options={CityList} title="Города" />
      </div>
    </aside>
  );
});
